import { Location } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import {
  emailValidator,
  emojiValidator,
} from 'src/app/core/services/helper/validator.service';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, switchMap } from 'rxjs';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { socialNetworks, socials } from './contact-information/data';
import { workingFormStruct } from './working-process/data';
import {
  ESex,
  IEmployeeRequest,
  IEmployeeResponse,
  ISocialNetwork,
  IWorkingHistory,
  typeAction,
} from 'src/app/shared/interfaces';
import { DateService } from 'src/app/core/services/helper/date.service';
import { regexEmail } from 'src/app/shared/regex';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent {
  public assetList = [];
  public formData: FormData = new FormData();
  public employeeInfo: IEmployeeResponse;
  public errorFromApi: HttpErrorResponse;
  public toast: any;
  public avt: ElementRef;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private commonService: CommonService,
    private unitTreeService: UnitTreeService,
    private employeeService: EmployeeService,
    private loadingService: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private dateService: DateService,
    private toasMsgService: ToastMsgService
  ) {}
  public employeeForm: FormGroup;
  public typeAction: typeAction = this.router.url.includes('update-employee')
    ? 'update'
    : 'add';
  handleBack(): void {
    this.location.back();
  }

  getControl(
    type: string,
    control: string
  ): AbstractControl | null | undefined {
    return this.employeeForm.get(type)?.get(control);
  }

  handleTypeApi(formData: FormData): Observable<Object> {
    if (this.typeAction === 'add') {
      return this.employeeService.addEmployee(formData);
    }
    return this.employeeService.updateEmployee(
      this.employeeInfo.employee_id,
      formData
    );
  }

  onSubmit(): void {
    this.commonService.markAsDirty(this.employeeForm);
    if (this.employeeForm.valid) {
      setTimeout(() => {
        this.loadingService.setloading(true);
      });
      const data: IEmployeeRequest = {
        employee_code: this.employeeForm.get('basicInfo.code')?.value,
        full_name: this.employeeForm.get('basicInfo.name')?.value,
        gender: this.employeeForm
          .get('basicInfo.sex')
          ?.value.value.toUpperCase(),
        birth_date: this.dateService.handleConvertDateToIOString(
          this.employeeForm.get('basicInfo.birthDay')?.value
        ),
        hire_date: this.dateService.handleConvertDateToIOString(
          this.employeeForm.get('basicInfo.hireDate')?.value
        ),
        receive_date: this.dateService.handleConvertDateToIOString(
          this.employeeForm.get('basicInfo.joinDate')?.value
        ),
        home_land: this.employeeForm.get('basicInfo.currentResidence')?.value,
        temporary_address: this.employeeForm.get('basicInfo.address')?.value,
        email: this.employeeForm.get('contactInfo.email')?.value,
        mobile: this.employeeForm.get('contactInfo.phone')?.value,
        social_network: this.getSocialNetwork(),
        working_history: this.getWorkingHistory(),
        // working_history_id:
        description: this.employeeForm.get('otherInfo.description')?.value,
        organization_unit_id:
          this.employeeForm.get('otherInfo.unit')?.value.key,
        job_position_id:
          this.employeeForm.get('otherInfo.position')?.value.job_position_id,
        employee_status_id:
          this.employeeForm.get('otherInfo.status')?.value.employee_status_id,
      };
      if (this.typeAction === 'update') {
        if (this.getControl('basicInfo', 'avt')?.value) {
          data.image_url = this.getControl('basicInfo', 'avt')?.value;
        }
      } else {
        data.image_url = this.employeeForm.get('basicInfo.avt')?.value;
      }
      this.handleTransformDataEmployee(data);
      this.handleTypeApi(this.formData)
        .pipe(
          finalize(() => {
            this.loadingService.setloading(false);
          })
        )
        .subscribe(
          (data: any) => {
            if (data.statusCode === 200) {
              this.location.back();
              this.toastService.toastSuccess(this.toast.createEmployeeSuccess);
            }
          },
          (err: HttpErrorResponse) => {
            this.errorFromApi = err;
            this.toastService.toastError(this.toast.createEmployeeFail);
          }
        );
    } else {
      this.toastService.toastWarn(this.toast.createEmployeeWarn);
      if (this.employeeForm.get('basicInfo.avt')?.errors) {
        this.avt.nativeElement.style.border = '1px dashed red';
      }
    }
  }

  getAvt(avt: ElementRef): void {
    this.avt = avt;
  }

  get workingHistory(): AbstractControl<any>[] {
    return (this.employeeForm.get('workingProcess') as FormArray).controls;
  }

  getWorkingHistory(): IWorkingHistory[] {
    if (this.workingHistory.length > 0) {
      return this.workingHistory.map((item, index) => {
        const data: any = {
          organization_unit_id: item.get('unit')?.value.key,
          job_position_id: item.get('position')?.value.job_position_id,
          from: this.dateService.handleConvertDateToIOString(
            item.get('workingTime')?.value[0]
          ),
          to: this.dateService.handleConvertDateToIOString(
            item.get('workingTime')?.value[1]
          ),
          working_type: item.get('workingForm')?.value.value,
        };
        const working_history_id =
          this.employeeInfo?.user_working_histories[index]?.working_history_id;
        if (this.typeAction === 'update' && working_history_id) {
          data.working_history_id = working_history_id;
        }
        return data;
      });
    }
    return [];
  }

  get socialNetwork(): AbstractControl<any>[] {
    return (this.employeeForm.get('contactInfo.socials') as FormArray).controls;
  }

  getSocialNetwork(): ISocialNetwork[] {
    if (this.socialNetwork.length > 0) {
      return this.socialNetwork.map((item) => {
        return {
          name: item.get('name')?.value.value,
          value: item.get('value')?.value,
        };
      });
    }
    return [];
  }

  handleTransformDataEmployee(data: IEmployeeRequest): void {
    Object.keys(data).forEach((item) => {
      const employeeItem = data[item as keyof typeof data];
      if (
        item !== 'image_url' &&
        (employeeItem instanceof Array || employeeItem instanceof Object)
      ) {
        if (Object.keys(employeeItem).length > 0) {
          this.handleTransformDataEmployeeChildObject(employeeItem, item);
        } else {
          this.formData.append(item, '');
        }
      } else {
        if (item === 'image_url') {
          this.formData.append(item, employeeItem as string | Blob);
        } else this.formData.append(item, employeeItem as string | Blob);
      }
    });
  }

  handleTransformDataEmployeeChildObject(
    employeeItem: any,
    parent: string
  ): void {
    let url = parent;
    if (employeeItem instanceof Array) {
      employeeItem.forEach((childItem, index) => {
        url = parent + `[${index}]`;
        if (childItem instanceof Array || childItem instanceof Object) {
          this.handleTransformDataEmployeeChildObject(childItem, url);
        } else {
          this.formData.append(url, childItem);
        }
      });
    } else {
      Object.keys(employeeItem).forEach((item) => {
        url = parent + `[${item}]`;
        if (
          employeeItem[item] instanceof Array ||
          employeeItem[item] instanceof Object
        ) {
          this.handleTransformDataEmployeeChildObject(employeeItem[item], url);
        } else {
          this.formData.append(url, employeeItem[item]);
        }
      });
    }
  }

  handleTransformDataWorkingHistory(data: IEmployeeResponse): any[] {
    const newData = data.user_working_histories?.map((item: any) => {
      (getControlCommon(this.employeeForm, 'workingProcess') as FormArray).push(
        this.fb.group({
          unit: ['', [Validators.required]],
          position: ['', [Validators.required]],
          workingTime: ['', [Validators.required]],
          workingForm: ['', [Validators.required]],
        })
      );
      return {
        unit: {
          key: item.wk_organization?.organization_unit_id,
          label: item.wk_organization?.organization_unit_name,
        },
        position: item.wk_job_position,
        workingTime: [new Date(item.from), new Date(item.to)],
        workingForm: {
          value: item.working_type,
          label:
            workingFormStruct[
              item.working_type as keyof typeof workingFormStruct
            ],
        },
      };
    });
    return newData;
  }

  patchValueForForm(data: IEmployeeResponse) {
    const newData = {
      basicInfo: {
        code: data.employee_code,
        name: data.full_name,
        sex: {
          value: data.gender === 'MALE' ? ESex.MALE : ESex.FEMALE,
        },
        birthDay: this.commonService.convertDateVi(data.birth_date) || '',
        hireDate: this.commonService.convertDateVi(data.hire_date) || '',
        joinDate: this.commonService.convertDateVi(data.receive_date) || '',
        currentResidence: data.home_land || '',
        address: data.temporary_address || '',
      },
      contactInfo: {
        email: data.email,
        phone: data.mobile,
        socials: this.handleTransformDataSocialNetwork(data),
      },
      otherInfo: {
        description: data.description,
        unit: {
          key: data.organization?.organization_unit_id,
          label: data.organization?.organization_unit_name,
        },
        position: data.job_position,
        status: data.employee_status,
      },
      workingProcess: this.handleTransformDataWorkingHistory(data),
    };
    console.log(data);

    console.log(data.home_land || '');

    this.employeeForm.patchValue(newData);
  }

  handleTransformDataSocialNetwork(data: IEmployeeResponse): any[] {
    return data.social_network?.map((item: any) => {
      const social = JSON.parse(item);
      (
        getControlCommon(
          this.employeeForm,
          'contactInfo',
          'socials'
        ) as FormArray
      ).push(
        this.fb.group({
          name: ['', [Validators.required]],
          value: ['', [Validators.required]],
        })
      );
      return {
        name: {
          value: social.name,
          label: socials[social.name as keyof typeof socials],
        },
        value: social.value,
      };
    });
  }

  ngOnInit() {
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
    this.employeeForm = this.fb.group({
      basicInfo: this.fb.group({
        code: [
          '',
          [Validators.required, Validators.maxLength(50), emojiValidator],
        ],
        name: [
          '',
          [Validators.required, Validators.maxLength(255), emojiValidator],
        ],
        sex: ['', [Validators.required]],
        birthDay: [''],
        currentResidence: ['', [Validators.maxLength(255), emojiValidator]],
        address: ['', [Validators.maxLength(255), emojiValidator]],
        joinDate: [''],
        hireDate: '',
        avt: ['', [Validators.required]],
      }),
      contactInfo: this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            emojiValidator,
            emailValidator,
          ],
        ],
        phone: ['', [Validators.required]],
        skypeId: ['', [Validators.maxLength(255), emojiValidator]],
        socials: this.fb.array([]),
      }),
      workingProcess: this.fb.array([]),
      otherInfo: this.fb.group({
        description: ['', [Validators.maxLength(500)]],
        unit: ['', Validators.required],
        position: ['', Validators.required],
        cv: [''],
        status: ['', [Validators.required]],
      }),
    });

    if (this.typeAction === 'update') {
      setTimeout(() => {
        this.loadingService.setloading(true);
      });
      this.activatedRoute.params
        .pipe(
          switchMap((params) => {
            return this.employeeService.getEmployeeById(params.id);
          })
        )
        .subscribe((data: any) => {
          if (data.statusCode === 200) {
            this.loadingService.setloading(false);
            this.employeeInfo = data.response;
            if (this.typeAction === 'update') {
              this.patchValueForForm(this.employeeInfo);
            }
          }
        });
    }

    this.unitTreeService.getUnitTreeByUnitId();
  }
}
