import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { labelEmployeeVi, labelEmployeeEn } from './data';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { map, switchMap } from 'rxjs';
import { ExportFileService } from 'src/app/core/services/helper/export-file.service';
import { IEmployeeResponse } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss'],
})
export class DetailEmployeeComponent implements OnInit {
  constructor(
    private location: Location,
    public commonService: CommonService,
    private languageService: LanguageService,
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private exportFileService: ExportFileService
  ) {}
  public infoEmployee: any = [];
  public dataByLang = {
    vi: labelEmployeeVi,
    en: labelEmployeeEn,
  };
  public employeeExcel: IEmployeeResponse | null = null;
  public workingProcess: any[] = [];
  public socialNetwork: any[] = [];
  handleBack(): void {
    this.location.back();
  }
  checkAvt(url: string): boolean {
    if (url) return true;
    return false;
  }

  exportFile() {
    if (this.employeeExcel) {
      this.exportFileService.exportAsExcelFile(
        [this.employeeExcel],
        this.employeeExcel?.full_name
      );
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.setloading(true);
    });
    this.activateRoute.params
      .pipe(
        switchMap((params) =>
          this.employeeService.getEmployeeById(params['id'])
        ),
        switchMap((employee: any) => {
          console.log(employee.response);

          this.employeeExcel = employee.response;
          this.workingProcess = employee.response.user_working_histories || [];
          this.socialNetwork =
            employee.response.social_network?.map((item: string) => {
              return JSON.parse(item);
            }) || [];
          return this.languageService.language$.pipe(
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
          );
        })
      )
      .subscribe(
        (data) => {
          this.infoEmployee = data;
          this.loadingService.setloading(false);
        },
        () => {
          this.loadingService.setloading(false);
        }
      );

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
