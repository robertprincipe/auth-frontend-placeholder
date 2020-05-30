import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorDirective } from './input-error.directive';
import { FieldErrorComponent } from './field-error/field-error.component';



@NgModule({
  declarations: [InputErrorDirective, FieldErrorComponent],
  imports: [
    CommonModule
  ],
  exports: [InputErrorDirective, FieldErrorComponent]
})
export class WidgetsModule { }
