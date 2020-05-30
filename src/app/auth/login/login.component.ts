import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthForm } from '../classes/auth-form.class';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthForm implements OnInit {

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1500
        })
      }, error => {
        this.Toast.fire({
          icon: 'error',
          title: error.errors[0]
        })
      })
    }
  }

}
