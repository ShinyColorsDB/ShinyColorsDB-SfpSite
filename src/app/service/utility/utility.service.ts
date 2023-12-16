import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  activeIds = new EventEmitter<number[]>();

  mobileTitle = new EventEmitter<string>();

  currentModal = new EventEmitter<number>();

  emitActiveIds(ids: number[]) {
    this.activeIds.emit(ids);
  }

  emitMobileTitle(title: string, stripe: boolean = false) {
    let display: string = title;
    if (stripe) {
      display = title.match(/(【.*】)/)![1];
    }
    this.mobileTitle.emit(display);
  }

  emitModal(current: number) {
    this.currentModal.emit(current);
  }
}
