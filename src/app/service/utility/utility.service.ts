import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  activeIds = new EventEmitter<number[]>();

  mobileTitle = new EventEmitter<string>();

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
}
