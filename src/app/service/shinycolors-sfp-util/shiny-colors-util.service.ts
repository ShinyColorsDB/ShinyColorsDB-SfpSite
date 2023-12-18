import { EventEmitter, Injectable } from '@angular/core';
import { Unit } from '../../shared/interfaces/unit';

@Injectable({
  providedIn: 'root'
})
export class ShinyColorsSfpUtilService {

  constructor() { }

  activeIds = new EventEmitter<number[]>();

  mobileTitle = new EventEmitter<string>();

  currentModal = new EventEmitter<number>();

  units: Unit[] = [];

  updateUnits(units: Unit[]) {
    this.units = units;
  }

  emitActiveIdolUnit(id: number) {
    this.units.forEach((e, index) => {
      e.idols.forEach(i => {
        if (i.idolId === id) {
          this.activeIds.emit([id, index + 1]);
        }
      });
    });
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
