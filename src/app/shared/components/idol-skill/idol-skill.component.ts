import { Component, Input, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';

import { IdolSkill } from '../../interfaces/common';


@Component({
  selector: 'app-idol-skill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './idol-skill.component.html',
  styleUrl: './idol-skill.component.css'
})
export class IdolSkillComponent {

  @Input()
  thisSkill!: IdolSkill;

  closeResult = '';

  constructor(
    private scSfpUrlService: ShinyColorsSfpUrlService,
    private modalService: NgbModal
  ) { }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getMacroSkillIcon(): string {
    return this.scSfpUrlService.getMacroIdolSKillIconUrl(this.thisSkill.idolSkillActionEffectList[0].actionEffectList[0].iconId);
  }

  getSkillDescription(): string {
    return this.thisSkill.mlIdolSkillText_Name;
  }
}
