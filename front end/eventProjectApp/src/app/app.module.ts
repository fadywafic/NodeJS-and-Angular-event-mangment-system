import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { JWTInterceptor } from './jwt.interceptor';
import { AuthenticationModule } from './authentication/authentication.module';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthenticationModule,
  ],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
