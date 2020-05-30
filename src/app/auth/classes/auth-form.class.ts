import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export abstract class AuthForm implements OnInit {
  public formGroup: FormGroup;
  public formErrorMessages;

  constructor(protected fb: FormBuilder) { }

  abstract ngOnInit(): void;

  protected get isValidForm(): boolean {
    if (this.formGroup.valid) return true;

    Object.values(this.formGroup.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity();
    })

    return false;
  }

  abstract onSubmit(): void;

}
