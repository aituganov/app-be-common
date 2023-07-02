import { Observable } from 'rxjs';
import { EventResponse } from '..';

export const axiosObservableToPromise = (o: Observable<any>): Promise<any> => {
  return new Promise((resolve, reject) => {
    o.subscribe({
      next(rs) {
        resolve({
          data: rs.data,
          headers: rs.config
        });
      },
      error(err) {
        reject({
          status: err.response.status,
          data: err.response.data
        });
      }
    });
  });
};

export function eventObservableToPromise<T>(o: Observable<EventResponse<T>>): Promise<EventResponse<T>> {
  return new Promise((resolve, reject) => {
    o.subscribe({
      next(data: EventResponse<T>) {
        resolve(data);
      },
      error(err) {
        reject(err);
      }
    });
  });
};