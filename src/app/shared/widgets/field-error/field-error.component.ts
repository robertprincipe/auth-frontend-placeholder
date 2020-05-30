import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  template: `
    <div *ngFor="let error of errors">
      <div *ngIf="hasError(error.type)">{{ error.message }}</div>
    </div>
  `,
  styles: [
  ]
})
export class FieldErrorComponent implements OnInit {
  @Input() control: FormControl;
  @Input() errors: any;
  constructor() { }

  ngOnInit(): void {
  }

  hasError(validator: string): boolean {
    return this.control.hasError(validator) && (this.control.dirty || this.control.touched);
  }

}
