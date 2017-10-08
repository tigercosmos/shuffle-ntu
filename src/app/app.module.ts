import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import {
  HomeComponent,
  CarouselComponent,
  NavbarComponent,
  ConceptComponent,
  MilestoneComponent,
  StoryComponent,
  SignupComponent,
  FooterComponent,
  AdmissionComponent,
  NewstoryComponent,
  ProcessComponent
} from './home/index';

import {
  AdminComponent,
  LoginComponent,
  ListComponent,
  DrawingComponent,
  AdminService
} from './admin/index';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    NavbarComponent,
    ConceptComponent,
    MilestoneComponent,
    StoryComponent,
    SignupComponent,
    FooterComponent,
    AdmissionComponent,
    NewstoryComponent,
    ProcessComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    ListComponent,
    DrawingComponent,
  ],
  imports: [
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot({
      extraFontName: 'anticon',
      extraFontUrl: './assets/fonts/iconfont'
    })
  ],
  providers: [
    {
      provide: NZ_NOTIFICATION_CONFIG,
      useValue: {
        nzTop: '70%',
      }
    },
    NewstoryComponent,
    AdminService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
