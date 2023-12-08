import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { catchError, of } from 'rxjs';

import { ShinyColorsSfpAPIService } from '../../../service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';
import { UtilityService } from '../../../service/utility/utility.service';

import { IconComponent } from '../../components/icon/icon.component';
import { CardItemComponent } from '../../components/card-item/card-item.component';

import { Idol } from '../../interfaces/idol';


@Component({
  selector: 'app-i-info',
  standalone: true,
  imports: [CommonModule, IconComponent, CardItemComponent],
  templateUrl: './i-info.component.html',
  styleUrl: './i-info.component.css',
  host: {
    class: "col-xxl-10 col-lg-9 col-md-7 col-sm-12 overflow-auto vh-100 overflow-auto"
  }
})
export class IInfoComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  idolInfo!: Idol;
  idolId!: number;

  togglePS = true;

  tempData: {
    "mstProduceIdolId": number,
    "mlProduceIdolText_Name": string
  }[] = [
      {
        "mstProduceIdolId": 101001,
        "mlProduceIdolText_Name": "天海春香"
      },
      {
        "mstProduceIdolId": 101002,
        "mlProduceIdolText_Name": "如月千早"
      }
    ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private scSfpApiService: ShinyColorsSfpAPIService,
    private utilsService: UtilityService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.idolId = Number(params['idolid']);

      this.scSfpApiService.getIdolInfo(this.idolId)
        .pipe(catchError(err => {
          this.router.navigate(['/notfound'])
          return of(null);
        }))
        .subscribe((data) => {
          if (!data) { return; }

          this.togglePS = true;
          this.idolInfo = data;

          this.title.setTitle(this.idolInfo.idolName);
          //this.utilsService.generateIdolMeta(this.idolInfo).forEach(e => {
          //  this.meta.updateTag(e);
          //});

          this.utilsService.emitActiveIds([this.idolId, this.idolInfo.unitId]);
          //this.utilsService.emitMobileTitle(this.idolInfo.idolName);

          //this.idolInfo.cardLists.forEach((card) => {
          //  this.classifyType(card);
          //});
        });
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  ngOnDestroy() { }

  ngAfterViewInit() {

  }
}
