import { Component, Input } from '@angular/core';
import { NgbAccordionConfig, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { UtilityService } from '../../../service/utility/utility.service';

import { CharlistComponent } from '../charlist/charlist.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    CharlistComponent,
    NgbAccordionModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input()
  showSideBar = false;

  @Input()
  isBigScreen = false;

  @Input()
  charaListId!: string;

  title!: string;

  constructor(
    config: NgbAccordionConfig,
    private utilsService: UtilityService
  ) {
    config.closeOthers = true;
    config.destroyOnHide = false;
  }

  ngOnInit(): void {
    this.utilsService.mobileTitle.subscribe((title: string) => {
      this.title = title;
    });
  }

  onSideBarClick() {
    this.showSideBar = !this.showSideBar;
  }

  onCharlistClick(event: boolean) {
    this.showSideBar = !event;
  }
}
