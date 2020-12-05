import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * NgxSpinnerModule es una libreria para crear loadings en angular con typescript
 */
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PersonRegComponent } from './pages/signup/steps/person-reg/person-reg.component';
import { Err404Component } from './pages/error/err404/err404.component';
import { Err500Component } from './pages/error/err500/err500.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    PersonRegComponent,
    Err404Component,
    Err500Component,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    {

      provide: HTTP_INTERCEPTORS,

      useClass: HttpErrorInterceptor,

      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
