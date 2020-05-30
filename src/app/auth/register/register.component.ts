import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { controlMustMatch, checkEmail } from '../../shared/utils/custom-validator';
import { AuthForm } from '../classes/auth-form.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AuthForm implements OnInit {

  constructor(protected fb: FormBuilder, private authService: AuthService) {
    super(fb);
    this.formErrorMessages = {
      fullname: [
        {type: 'required', message: 'name is required'},
        {type: 'minlength', message: 'name must be 3 charaters'},
      ],
      nickname: [
        {type: 'required', message: 'nickname is required'},
        {type: 'minlength', message: 'nickname must be 3 charaters'},
      ],
      email: [
        {type: 'required', message: 'email is required'},
        {type: 'pattern', message: 'email format invalid'},
        {type: 'notAvailable', message: 'email not available'}
      ],
      password: [
        {type: 'required', message: 'password is required'},
        {type: 'minlength', message: 'password must be 9 characters'},
      ],
      confirmPassword: [
        {type: 'required', message: 'repeat password'},
        {type: 'mustMatch', message: 'no match with password'},
      ],
      terms: [
        {type: 'required', message: 'terms must be accepted'},
      ],
    };
  }

  ngOnInit(): void {
    const validatorFn = controlMustMatch('confirmPassword');
    const validatorFn2 = controlMustMatch('password');
    this.formGroup = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)], checkEmail(this.authService)],
      password: ['', [Validators.required, Validators.minLength(9), validatorFn]],
      confirmPassword: ['', [Validators.required, validatorFn2]],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.isValidForm) {
      this.authService.register(this.formGroup.value).subscribe(resp => {
        console.log(resp)
      }, error => {
        console.log(error)
      })
    }
  }

}
