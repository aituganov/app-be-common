import { randomBytes } from 'crypto';
import { constants, promises } from 'fs';

const fileIsExist = async (path: string): Promise<boolean> =>  {
  try {
    await promises.access(path, constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
}

const uuid = (): string => {
  return randomBytes(16).toString('hex');
}

const generateFileName = (extension: string, prefix?: string): string => {
  const first = prefix || uuid();
  return `${first}_${new Date().getTime()}.${extension}`;
}

export class FileService {
  protected filesRootDir: string;
  protected savedFilesPrefix = '/files/'

  constructor(filesRootDir: string) {
    this.filesRootDir = filesRootDir.slice(-1) === '/' ? filesRootDir : `${filesRootDir}/`;
  }

  async delete(files: string[]): Promise<void> {
    for (const file of files) {
        const preparedFile = file.replace(/\/files\//, this.filesRootDir);
        if (await fileIsExist(preparedFile)) {
          try {
            await promises.unlink(preparedFile);
          } catch (err) {
            console.error(`Error on file ${preparedFile} delete: `, err)
          }
        }
    }
  }

  async saveImage(base64: string, prefixName?: string): Promise<string> {
    return base64.startsWith(this.savedFilesPrefix) ? base64 : this.save(base64, 'images/', prefixName);
  }

  protected async save(base64: string, innerDir: string, prefixName?: string): Promise<string> {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    let uploadPath = `${this.filesRootDir}${innerDir}`;
    if (prefixName) {
        uploadPath += `${prefixName}/`;
    }
    //Find extension of file
    const ext = base64.substring(base64.indexOf('/')+1, base64.indexOf(';base64'));
    const fileType = base64.substring('data:'.length, base64.indexOf('/'));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = base64.replace(regex, '');
    const filename = generateFileName(ext, prefixName);

    if (!(await fileIsExist(uploadPath))) {
      await promises.mkdir(uploadPath);
    }

    await promises.writeFile(uploadPath + filename, base64Data, 'base64');
    return `${this.savedFilesPrefix}${innerDir}${prefixName ? (prefixName + '/') : ''}${filename}`;
  }
}