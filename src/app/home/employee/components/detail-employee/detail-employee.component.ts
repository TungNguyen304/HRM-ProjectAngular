import { Location } from '@angular/common';
import {  Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { labelEmployeeVi, labelEmployeeEn } from './data';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { map, switchMap } from 'rxjs';

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
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {}
  public infoEmployee: any = [];
  public dataByLang = {
    'vi': labelEmployeeVi,
    'en': labelEmployeeEn
    }
  handleBack(): void {
    this.location.back();
  }
  checkAvt(url: string): boolean {
    if (url) return true;
    return false;
  }
  ngOnInit() {
    setTimeout(() => {
      this.loadingService.setloading(true);
    })
    this.activateRoute.params
      .pipe(
        switchMap((params) =>
          this.employeeService.getEmployeeById(params['id'])
        ),
        switchMap((employee: any) =>
          this.languageService.language$.pipe(
            map((language) => {
              switch (language) {
                case 'vi':
                  return this.commonService.convertDataForTableRowStyle(
                    this.dataByLang[language as keyof typeof this.dataByLang],
                    employee.response
                  );
                default:
                  return this.commonService.convertDataForTableRowStyle(
                    this.dataByLang[language as keyof typeof this.dataByLang],
                    employee.response
                  );
              }
            })
          )
        )
      )
      .subscribe((data) => {
        this.infoEmployee = data;
        setTimeout(() => {
          this.loadingService.setloading(false);
        })
      });

    // this.activateRoute.params.subscribe((params: any) => {
    //   this.employeeService.getEmployeeById(params.id).subscribe((data: any) => {
    //     this.languageService.language$.subscribe((language: ILanguage) => {
    //       if (language === 'vi') {
    //         this.infoEmployee = this.commonService.convertDataForTableRowStyle(
    //           labelEmployeeVi,
    //           data.response
    //         );
    //       } else {
    //         this.infoEmployee = this.commonService.convertDataForTableRowStyle(
    //           labelEmployeeEn,
    //           data.response
    //         );
    //       }
    //       this.loadingService.setloading(false);
    //     });
    //   });
    // });
  }
}
