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

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent {
  public assetList = [];
  public formData: FormData = new FormData();
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private commonService: CommonService,
    private unitTreeService: UnitTreeService,
    private employeeService: EmployeeService,
    private loadingService:LoadingService,
    private toastService:ToastService
  ) {}
  public employeeForm: FormGroup;

  handleBack(): void {
    this.location.back();
  }

  getControl(
    type: string,
    control: string
  ): AbstractControl | null | undefined {
    return this.employeeForm.get(type)?.get(control);
  }

  onSubmit(): void {
    this.commonService.markAsDirty(this.employeeForm);
    if (this.employeeForm.valid) {
      this.loadingService.setloading(true);
      const data = {
        employee_code: this.getControl('basicInfo', 'code')?.value,
        image_url: this.getControl('basicInfo', 'avt')?.value,
        full_name: this.getControl('basicInfo', 'name')?.value,
        gender: this.getControl('basicInfo', 'sex')?.value.value.toUpperCase(),
        birth_date: this.getControl(
          'basicInfo',
          'birthDay'
        )?.value.toISOString(),
        hire_date:
          this.getControl('basicInfo', 'hireDate')?.value &&
          this.getControl('basicInfo', 'hireDate')?.value.toISOString(),
        receive_date:
          this.getControl('basicInfo', 'joinDate')?.value &&
          this.getControl('basicInfo', 'joinDate')?.value?.toISOString(),
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
      this.handleTransformDataEmployee(data);
      this.employeeService.addEmployee(this.formData).subscribe(
        (data: any) => {
          this.location.back();
          this.toastService.toastSuccess(toast.createEmployeeSuccess.summary, toast.createEmployeeSuccess.detail);
          this.loadingService.setloading(false);
        },
        () => {
          this.toastService.toastWarn(toast.createEmployeeFail.summary, toast.createEmployeeFail.detail);
        }
      );
    } else {
      this.toastService.toastWarn(toast.createEmployeeFail.summary, toast.createEmployeeFail.detail);
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
          from: item.get('workingTime')?.value[0]?.toISOString(),
          to: item.get('workingTime')?.value[1]?.toISOString(),
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
    if (parent === 'social_network[0]') {
      console.log(employeeItem);
      console.log(employeeItem instanceof Array);
    }
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

  ngOnInit() {
    this.unitTreeService.getUnitTreeByUnitId();
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
  }
}
