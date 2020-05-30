import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private toastMixin = Swal.mixin({
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
  constructor() { }

  toast(message: string, type: SweetAlertIcon = 'success') {
    this.toastMixin.fire({
      icon: type,
      title: message
    })
  }

  fire(title: string, message: string, callback: Function, type: SweetAlertIcon = 'warning') {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        callback();
      }
    })
  }
}
