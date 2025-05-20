import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuccessMessageService {
  private messageSource = new BehaviorSubject<string | null>(null);
  successMessage$ = this.messageSource.asObservable();

  setMessage(message: string) {
    this.messageSource.next(message);
  }

  clearMessage() {
    this.messageSource.next(null);
  }

  constructor() { }
}
