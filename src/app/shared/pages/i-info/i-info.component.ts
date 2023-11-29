import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { catchError, of } from 'rxjs';

import { ShinyColorsSfpAPIService } from '../../../service/shinycolors-sfp-api/shinycolors-sfp-api.service';
import { ShinyColorsSfpUrlService } from '../../../service/shinycolors-sfp-url/shiny-colors-sfp-url.service';

import { IconComponent } from '../../components/icon/icon.component';

import { Idol } from '../../interfaces/idol';


@Component({
  selector: 'app-i-info',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './i-info.component.html',
  styleUrl: './i-info.component.css',
  host: {
    class: "col-xl-10 col-lg-9 col-md-7 col-sm-12 overflow-auto h-100"
  }
})
export class IInfoComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {


  idolInfo!: Idol;
  idolId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private scSfpApiService: ShinyColorsSfpAPIService,
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
          console.log(data);

          this.idolInfo = data;

          this.title.setTitle(this.idolInfo.idolName);
          //this.utilsService.generateIdolMeta(this.idolInfo).forEach(e => {
          //  this.meta.updateTag(e);
          //});

          //this.utilsService.emitActiveIds([this.idolId, this.idolInfo.unitId]);
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
