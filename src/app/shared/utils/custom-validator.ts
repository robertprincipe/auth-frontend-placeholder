import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map } from 'rxjs/operators';

export function controlMustMatch(fieldToCompare: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent)
      return;
      const first = control;
      const second = control.parent.get(fieldToCompare)
      if (first.pristine || second.pristine)
        return;
      if (first.value && first.value === second.value) {
        second.setErrors(null);
        return;
      }

      return {mustMatch: true};
  }
}

export function checkEmail(authService: AuthService) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return authService.checkEmail(value).pipe(
      map((resp: any) => {
      if (!resp.resp) {
        return { notAvailable: true };
      } else {
        return null;
      }
    }));
  }
}
