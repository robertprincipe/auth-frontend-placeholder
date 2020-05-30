import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthForm } from '../classes/auth-form.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthForm implements OnInit {

  constructor(protected fb: FormBuilder, private authService: AuthService) {
    super(fb);
    this.formErrorMessages = {
      email: [
        {type: 'required', message: 'email is required'},
        {type: 'pattern', message: 'invalid format'}
      ],
      password: [
        {type: 'required', message: 'password is required'},
      ]
    };
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  onSubmit() {
    if (this.isValidForm) {
      this.authService.login(this.formGroup.value).subscribe(resp => {
        console.log(resp)
      }, err => {
        console.log(err)
      })
    }
  }

}
