import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTriggeredSubject = new BehaviorSubject<boolean>(false);
  searchTriggered$ = this.searchTriggeredSubject.asObservable();

  private closedSubject = new BehaviorSubject<boolean>(false);
  closedTriggered$ = this.closedSubject.asObservable();

  private searchQuery = new BehaviorSubject<any>('');
  searchQuery$ = this.searchQuery.asObservable();

  constructor() {}

  updateSearch(query: any) {
    this.searchQuery.next(query);
  }

  triggerSearch() {
    this.searchTriggeredSubject.next(true);
  }

  closeresults() {
    this.closedSubject.next(true); // Updated to correctly set closed state
  }

  resetSearch() {
    this.searchTriggeredSubject.next(false);
  }
}
