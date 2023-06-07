import { randomBytes } from 'crypto';
import { constants, createWriteStream, promises, unlink } from 'fs';

export class FileService {
  protected filesRootDir: string;
  protected savedFilesPrefix = '/files/'

  constructor(filesRootDir: string) {
    this.filesRootDir = filesRootDir.slice(-1) === '/' ? filesRootDir : `${filesRootDir}/`;
  }

  generateUuid(): string {
    return randomBytes(16).toString('hex');
  }

  async delete(files: string[]): Promise<void> {
    for (const file of files) {
        const preparedFile = file.replace(/\/files\//, this.filesRootDir);
        if (await this.isExist(preparedFile)) {
          try {
            await promises.unlink(preparedFile);
          } catch (err) {
            console.error(`Error on file ${preparedFile} delete: `, err)
          }
        }
    }
  }

  async isExist(path: string): Promise<boolean> {
    try {
      await promises.access(path, constants.R_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  async saveImage(base64: string, prefixName?: string): Promise<string> {
    return base64.startsWith(this.savedFilesPrefix) ? base64 : this.saveFromBase64(base64, 'images/', prefixName);
  }

  async saveImageFromStream(stream: any, ext: string, prefixName?: string): Promise<string> {
    const innerDir = 'images/';
    const rootDir = await this.prepareDirectoryStructure(innerDir, prefixName);
    const fileName = this.generateFileName(ext, prefixName);
    const fullPath = `${rootDir}${fileName}`;
    const writer = createWriteStream(fullPath);
    stream.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        writer.close();
        resolve(fullPath);
      });
      writer.on('error', err => {
        unlink(fileName, () => {});
        reject(err);
      });
  });
  }

  protected generateFileName = (extension: string, prefix?: string): string => {
    const first = prefix || this.generateUuid();
    return `${first}_${new Date().getTime()}.${extension}`;
  }

  protected generateFileFullPath(fileName: string, innerDir: string, prefixName: string): string {
    return `${this.savedFilesPrefix}${innerDir}${prefixName ? (prefixName + '/') : ''}${fileName}`;
  }

  protected async prepareDirectoryStructure(innerDir: string, prefixName?: string): Promise<string> {
    // path of the folder where your project is saved. (In my case i got it from config file, root path of project)
    let uploadPath = `${this.filesRootDir}${innerDir}`;
    if (prefixName) {
        uploadPath += `${prefixName}/`;
    }
    // prepare folders structure
    if (!(await this.isExist(uploadPath))) {
      await promises.mkdir(uploadPath, { recursive: true });
    }
    return uploadPath;
  }

  protected async saveFromBase64(base64: string, innerDir: string, prefixName?: string): Promise<string> {
    const uploadPath = this.prepareDirectoryStructure(innerDir, prefixName);

    //Find extension of file
    const ext = base64.substring(base64.indexOf('/')+1, base64.indexOf(';base64'));
    const fileType = base64.substring('data:'.length, base64.indexOf('/'));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = base64.replace(regex, '');
    const filename = this.generateFileName(ext, prefixName);

    await promises.writeFile(uploadPath + filename, base64Data, 'base64');
    return this.generateFileFullPath(filename, innerDir, prefixName);
  }
}