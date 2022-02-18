import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { LoginRequest } from 'src/app/dto/LoginRequest';
import {Router} from '@angular/router';


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
        this.authService.login(loginRequest).subscribe({
          next: data => {
            this.error = false;
            console.log(data);
            this.router.navigate(['/users']);
          },
          error: error => {
            this.error = true;
            console.log('Invalid');
          }
        });
    } else {
      console.log('Invalid form');
    }
  }

  showPassword() {
    console.log(this.show);
    this.show = !this.show;
  }

}
