import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { HTTP_GENERAL_HEADERS } from 'src/app/classes/headers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  headers = new HTTP_GENERAL_HEADERS();
  constructor(public http: HttpClient) { }

  UploadImage(url: string, data) {
    return this.http.post(environment.url + url, data, this.headers.httpFilesOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

}
