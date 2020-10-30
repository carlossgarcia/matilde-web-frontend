import { HttpHeaders } from '@angular/common/http';

const token = localStorage.getItem('token');

export const httpOptions = {

    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    })
};

export const httpFilesOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
    })
};
