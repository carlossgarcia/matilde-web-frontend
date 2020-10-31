import {

    HttpEvent,

    HttpInterceptor,

    HttpHandler,

    HttpRequest,

    HttpResponse,

    HttpErrorResponse

} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { HTTP_INTERCEPTOR_SESSION_DESTROYER } from '../classes/credentials';



export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)

            .pipe(

                retry(1),

                catchError((error: HttpErrorResponse) => {

                    let errorMessage = '';

                    if (error.error instanceof ErrorEvent) {

                        // client-side error

                        errorMessage = `Error: ${error.error.message}`;

                    } else {

                        // server-side error

                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        if (error.status === 401) {
                            errorMessage = 'Sesión expirada.';
                            HTTP_INTERCEPTOR_SESSION_DESTROYER();
                        }

                    }
                    // window.alert(errorMessage);
                    // Aqui vamos a meter un servicio
                    return throwError(errorMessage);
                })

            )

    }

}