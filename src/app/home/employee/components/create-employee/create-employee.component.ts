import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { toast } from 'src/app/shared/toastMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, switchMap } from 'rxjs';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { socialNetworks, socials } from './contact-information/data';
import { workingFormStruct } from './working-process/data';
import { ESex } from 'src/app/shared/interfaces';

type typeAction = 'update' | 'add';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent {
  public assetList = [];
  public formData: FormData = new FormData();
  public employeeInfo: any;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private commonService: CommonService,
    private unitTreeService: UnitTreeService,
    private employeeService: EmployeeService,
    private loadingService: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
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

  handleConvertDateToIOString(date: any): string {
    if (!date) return '';
    if (typeof date === 'string') {
      const [day, month, year] = date.split("/");
      return new Date([year, month, day].join('/')).toISOString();
    }
    return date.toISOString();
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
      const data:any = {
        employee_code: this.getControl('basicInfo', 'code')?.value,
        full_name: this.getControl('basicInfo', 'name')?.value,
        gender: this.getControl('basicInfo', 'sex')?.value.value.toUpperCase(),
        birth_date: this.handleConvertDateToIOString(
          this.getControl('basicInfo', 'birthDay')?.value
        ),
        hire_date: this.handleConvertDateToIOString(
          this.getControl('basicInfo', 'hireDate')?.value
        ),
        receive_date: this.handleConvertDateToIOString(
          this.getControl('basicInfo', 'joinDate')?.value
        ),
        home_land: this.getControl('basicInfo', 'currentResidence')?.value,
        temporary_address: this.getControl('basicInfo', 'address')?.value,
        email: this.getControl('contactInfo', 'email')?.value,
        mobile: this.getControl('contactInfo', 'phone')?.value,
        social_network: this.getSocialNetwork(),
        working_history: this.getWorkingHistory(),
        description: this.getControl('otherInfo', 'description')?.value,
        organization_unit_id: this.getControl('otherInfo', 'unit')?.value.key,
        job_position_id: this.getControl('otherInfo', 'position')?.value
          .job_position_id,
        employee_status_id: this.getControl('otherInfo', 'status')?.value
          .employee_status_id,
      };
      if(this.typeAction==="update") {
        if(this.getControl('basicInfo', 'avt')?.value) {
          data.image_url = this.getControl('basicInfo', 'avt')?.value;
        }
      } else {
        data.image_url = this.getControl('basicInfo', 'avt')?.value;
      }
      this.handleTransformDataEmployee(data);
      this.handleTypeApi(this.formData).pipe(
        finalize(() => {
          this.loadingService.setloading(false);
        })
      ).subscribe(
        (data: any) => {
          this.location.back();
          this.toastService.toastSuccess(
            toast.createEmployeeSuccess.summary,
            toast.createEmployeeSuccess.detail
          );
          
        },
        (err) => {
          console.log(err);
          this.toastService.toastWarn(
            toast.createEmployeeFail.summary,
            toast.createEmployeeFail.detail
          );
        }
      );
    } else {
      this.toastService.toastWarn(
        toast.createEmployeeFail.summary,
        toast.createEmployeeFail.detail
      );
    }
  }

  getWorkingHistory(): any[] {
    if (
      (this.employeeForm.get('workingProcess') as FormArray).controls.length > 0
    ) {
      return (
        this.employeeForm.get('workingProcess') as FormArray
      ).controls.map((item) => {
        return {
          organization_unit_id: item.get('unit')?.value.key,
          job_position_id: item.get('position')?.value.job_position_id,
          from: this.handleConvertDateToIOString(
            item.get('workingTime')?.value[0]
          ),
          to: this.handleConvertDateToIOString(
            item.get('workingTime')?.value[1]
          ),
          working_type: item.get('workingForm')?.value.value,
        };
      });
    }
    return [];
  }

  getSocialNetwork(): any[] {
    if (
      (this.getControl('contactInfo', 'socials') as FormArray).controls.length >
      0
    ) {
      return (
        this.getControl('contactInfo', 'socials') as FormArray
      ).controls.map((item) => {
        return {
          name: item.get('name')?.value.value,
          value: item.get('value')?.value,
        };
      });
    }
    return [];
  }

  handleTransformDataEmployee(data: any): void {
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
          this.formData.append(item, employeeItem, employeeItem.name);
        } else this.formData.append(item, employeeItem);
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

  handleTransformDataWorkingHistory(data: any): any[] {
    const newData = data.user_working_histories.map((item: any) => {
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
          key: item.wk_organization.organization_unit_id,
          label: item.wk_organization.organization_unit_name,
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

  patchValueForForm(data: any) {
    const newData = {
      basicInfo: {
        code: data.employee_code,
        name: data.full_name,
        sex: {
          value: data.gender === 'MALE' ? ESex.MALE : ESex.FEMALE,
        },
        birthDay: this.commonService.convertDateVi(data.birth_date),
        hireDate: this.commonService.convertDateVi(data.hire_date),
        joinDate: this.commonService.convertDateVi(data.receive_date),
        currentResidence: data.home_land,
        address: data.temporary_address,
      },
      contactInfo: {
        email: data.email,
        phone: data.mobile,
        socials: this.handleTransformDataSocialNetwork(data),
      },
      otherInfo: {
        description: data.description,
        unit: {
          key: data.organization.organization_unit_id,
          label: data.organization.organization_unit_name,
        },
        position: data.job_position,
        status: data.employee_status,
      },
      workingProcess: this.handleTransformDataWorkingHistory(data),
    };
    this.employeeForm.patchValue(newData);
  }

  handleTransformDataSocialNetwork(data: any): any[] {
    return data.social_network.map((item: any) => {
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
        birthDay: ['', [Validators.required]],
        currentResidence: ['', [Validators.maxLength(255), emojiValidator]],
        address: ['', [Validators.maxLength(255), emojiValidator]],
        joinDate: [''],
        hireDate: '',
        avt: [''],
      }),
      contactInfo: this.fb.group({
        email: [
          '',
          [Validators.required, Validators.maxLength(50), emojiValidator],
        ],
        phone: ['', [Validators.required, Validators.maxLength(11)]],
        skypeId: [
          '',
          [Validators.required, Validators.maxLength(255), emojiValidator],
        ],
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
          this.loadingService.setloading(false);
          this.employeeInfo = data.response;
          this.patchValueForForm(this.employeeInfo);
        });
    }

    this.unitTreeService.getUnitTreeByUnitId();
  }
}
