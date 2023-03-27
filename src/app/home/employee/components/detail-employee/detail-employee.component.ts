import { Location } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { ILanguage } from 'src/app/shared/interfaces/language';

import { labelEmployeeVi, labelEmployeeEn } from './data';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss'],
})
export class DetailEmployeeComponent {
  constructor(
    private location: Location,
    private commonService: CommonService,
    private languageService: LanguageService
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
    const responeFromAPI = {
      fullName: 'Nguyễn Văn Tùng',
      employeeCode: '25211216536',
    };
    this.languageService.language$.subscribe((data: ILanguage) => {
      if (data === 'vi') {
        this.infoEmployee = this.commonService.convertDataForTableRowStyle(
          labelEmployeeVi,
          responeFromAPI
        );
      } else {
        this.infoEmployee = this.commonService.convertDataForTableRowStyle(
          labelEmployeeEn,
          responeFromAPI
        );
      }
    });
  }
}
