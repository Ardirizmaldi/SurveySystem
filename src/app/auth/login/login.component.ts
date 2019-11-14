import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  err = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthentificationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
 
  get f() {
    return this.loginForm.controls;
  }
  
  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading= true;
    this.authService.login(this.f.username.value, this.f.password.value)
    .subscribe(
      data => {
        this.router.navigateByUrl('/cards');
      },
      error => {
        this.loading = false;
        this.err = true;
      });
      console.log('form login submitted');
  }

}
