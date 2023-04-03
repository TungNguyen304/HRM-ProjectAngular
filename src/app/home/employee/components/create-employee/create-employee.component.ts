import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';
import { MessageService } from 'primeng/api';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { UnitService } from 'src/app/core/services/http/unit.service';
import { IUnit } from 'src/app/shared/interfaces';
import { handleFormatDataUnitTreeSelect } from 'src/app/core/services/helper/unit.service';
import { EmployeeService } from 'src/app/core/services/http/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  providers: [MessageService],
})
export class CreateEmployeeComponent {
  public assetList = [];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private commonService: CommonService,
    private messageService: MessageService,
    private unitService: UnitService,
    private employeeService: EmployeeService
  ) {}
  public unitList: IUnit[];
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
    console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {
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
        social_network: [],
        working_history: [
          {
            organization_unit_id: this.getControl('workingProcess', 'unit')
              ?.value.key,
            job_position_id: this.getControl('workingProcess', 'position')
              ?.value.job_position_id,
            from: this.getControl(
              'workingProcess',
              'workingTime'
            )?.value[0]?.toISOString(),
            to: this.getControl(
              'workingProcess',
              'workingTime'
            )?.value[1]?.toISOString(),
            working_type: this.getControl('workingProcess', 'workingForm')
              ?.value,
          },
        ],
        cv_url: this.getControl('otherInfo', 'cv')?.value,
        description: this.getControl('otherInfo', 'description')?.value,
        organization_unit_id: this.getControl('otherInfo', 'unit')?.value.key,
        job_position_id: this.getControl('otherInfo', 'position')?.value
          .job_position_id,
        employee_status_id: this.getControl('otherInfo', 'status')?.value
          .employee_status_id,
      };
      const formData = new FormData();
      Object.keys(data).forEach((item) => {
        const employeeItem = data[item as keyof typeof data];
        if (
          item !== 'image_url' &&
          (employeeItem instanceof Array || employeeItem instanceof Object)
        ) {
          Object.keys(employeeItem).forEach((childItem) => {
            formData.append(`${item}[${childItem}]`, JSON.stringify(employeeItem[childItem]));
          });
        } else {
          if (item === 'image_url') {
            console.log(employeeItem);
            formData.append(item, employeeItem, employeeItem.name);
          } else formData.append(item, employeeItem);
        }
      });
      console.log(formData);
      console.log(data);

      this.employeeService.addEmployee(formData).subscribe(
        (data: any) => {
          // if(data.response.statuscode === 200) {

          // }
          console.log(data);
          this.showAlert({
            severity: 'success',
            summary: 'Create employee Success',
            detail: 'One new employee has been added',
          });
        },
        () => {
          this.showAlert({
            severity: 'warn',
            summary: 'Create employee Fail',
            detail: 'You have not completed all required fields',
          });
        }
      );
    } else {
      this.showAlert({
        severity: 'warn',
        summary: 'Create employee Fail',
        detail: 'You have not completed all required fields',
      });
    }
  }

  showAlert(noti: any): void {
    this.messageService.add({
      severity: noti.severity,
      summary: noti.summary,
      detail: noti.detail,
    });
  }

  ngOnInit() {
    this.unitService.getUnit().subscribe((data: any) => {
      this.unitList = handleFormatDataUnitTreeSelect(data.response.data);
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
      }),
      workingProcess: this.fb.group({
        unit: [''],
        position: [''],
        workingTime: [''],
        workingForm: [''],
      }),
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
