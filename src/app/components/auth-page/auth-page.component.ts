import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { LoginRequest } from 'src/app/dto/LoginRequest';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  loginForm: FormGroup;
  show = false;
  error = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      console.log('loginForm is valid');
      const loginRequest: LoginRequest = new LoginRequest(this.loginForm.controls['username'].value,
        this.loginForm.controls['password'].value);
        this.authService.login(loginRequest).subscribe(
          (data: HttpResponse<any>) => {
            this.error = false;
            console.log(data);
            this.setToken("" + data.headers.get('Authorization'));
            setTimeout(() => {
              this.router.navigate(['/users']);
            }, 100);
          },
          error => {
            this.error = true;
            console.log('Invalid');
          }
        );
    } else {
      console.log('Invalid form');
    }
  }

  showPassword() {
    console.log(this.show);
    this.show = !this.show;
  }

  private setToken(authResponse: string) {
    localStorage.setItem('bumagiAuthToken', authResponse);
  }

}
