import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification';
import { RegisterService } from '../authentification/register.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  err = false;
  submitted = false;
  imgI = 0;
  imgProfile: string;
  usernames: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthentificationService,
    private regService: RegisterService,
    private imageCompress: NgxImageCompressService,
  ) {
    // redirect to dashboard if already logged in
    // if (this.authService.isAuthorized) { 
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.compose([
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
    password: ['', Validators.required],
    birthdate: ['', Validators.required],
    gender: ['Male', Validators.required],
    profile_picture: [this.imgProfile]
    });
  }

  b64toBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  addPictureProfile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imageCompress.compressFile(image, orientation, 75, 50).then(
        result => {
          // this.imgProfile = result;
          const iImg: string = '' + this.imgI;
          const blob = this.b64toBlob(result);
          this.regService.uploadImageProfile(blob, 'profile_photo' + '(' + iImg + ')').subscribe(
            (resquestion) => {
              console.log(resquestion);
              this.imgProfile = resquestion.path;
            },
            (err) => {
              console.log(err);
            });
        }
      );
    });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.registerForm.controls;
  }

  onSubmit(formData) {
    this.submitted = true;
    if (this.registerForm .valid) {
      formData.profile_picture = this.imgProfile;
      this.regService.register(this.registerForm.value)
        .subscribe(
            data => {
              this.router.navigate(['/login']);
              console.log(data);
            },
            error => {
              this.err = true;
              this.loading = false;
            });
    }
  }

}
