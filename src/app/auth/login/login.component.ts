import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthForm } from '../classes/auth-form.class';
import { AuthService } from '../services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthForm implements OnInit {

  constructor(protected fb: FormBuilder, private authService: AuthService, private alertService: AlertService) {
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
        this.alertService.toast(resp.message)
      }, error => {
        this.alertService.toast(error.errors[0], 'error')
      })
    }
  }

}
