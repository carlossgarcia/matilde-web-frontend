import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { httpFilesOptions } from 'src/app/classes/headers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http: HttpClient) { }

  UploadImage(url: string, data) {
    return this.http.post(environment.url + url, data, httpFilesOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

}
