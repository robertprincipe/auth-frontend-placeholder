import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appInputError]'
})
export class InputErrorDirective implements OnInit, OnDestroy {
  subscribe: Subscription;

  constructor(private elementRef: ElementRef, private control: NgControl) { }

  ngOnInit(): void {
    this.subscribe = this.control.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.elementRef.nativeElement.classList.add('is-invalid');
      } else {
        this.elementRef.nativeElement.classList.remove('is-invalid');
      }
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
