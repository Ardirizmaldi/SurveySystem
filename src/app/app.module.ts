import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationModule } from './auth';
import { AppMaterialModule } from './shared/app-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxPaginationModule } from 'ngx-pagination';

import { CreateComponent } from './survey/create/create.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CardsComponent } from './component/cards/cards.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SubmitResponsesComponent } from './survey/submit-responses/submit-responses.component';

import { DialogIcon } from './survey/create/icon-dialog/idialog';
import { PublishComponent } from './survey/create/publish/publish.component';
import { MyDialogColor } from './survey/create/color-image-picker/picker';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';
import { ShowSurveyComponent } from './survey/show-survey/show-survey.component';
import { ResultComponent } from './survey/result/result.component';
import { ProfileComponent } from './component/navbar/profile/profile.component';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyBgvrwoPM1sBu_EVup1hGM-zeGVCqRVPkw'
};

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    NavbarComponent,
    CardsComponent,
    LoginComponent,
    RegisterComponent,
    MyDialogColor,
    DialogIcon,
    PublishComponent,
    SubmitResponsesComponent,
    ShowSurveyComponent,
    ResultComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthentificationModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    ColorPickerModule,
    ImageCropperModule,
    FontPickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxImageCompressService,
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    }],
  bootstrap: [AppComponent],
  entryComponents: [
    PublishComponent,
    DialogIcon,
    MyDialogColor,
    ProfileComponent
  ]
})
export class AppModule { }
