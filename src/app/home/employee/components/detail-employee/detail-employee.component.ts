import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { ILanguage } from 'src/app/shared/interfaces/language';

import { labelEmployeeVi, labelEmployeeEn } from './data';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/state/loading.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss'],
})
export class DetailEmployeeComponent implements OnInit {
  constructor(
    private location: Location,
    private commonService: CommonService,
    private languageService: LanguageService,
    private employeeService:EmployeeService,
    private activateRoute:ActivatedRoute,
    private loadingService:LoadingService
  ) {}
  public infoEmployee: any = [];
  handleBack(): void {
    this.location.back();
  }
  checkAvt(url: string): boolean {
    if (url) return true;
    return false;
  }
  ngOnInit() {
    this.loadingService.setloading(true);
    this.activateRoute.params.subscribe((params:any) => {
      this.employeeService.getEmployeeById(params.id).subscribe((data:any) => {
        this.languageService.language$.subscribe((language: ILanguage) => {
          if (language === 'vi') {
            this.infoEmployee = this.commonService.convertDataForTableRowStyle(
              labelEmployeeVi,
              data.response
            );
          } else {
            this.infoEmployee = this.commonService.convertDataForTableRowStyle(
              labelEmployeeEn,
              data.response
            );
          }
          this.loadingService.setloading(false);
        });
      })
    });
    
  }
}
