import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import {
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import { IPosition, IUnit, IWarningOtherInfo } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-other-information',
  templateUrl: `./other-information.component.html`,
  styleUrls: ['../create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class OtherInformationComponent implements OnInit {
  constructor(private unitTreeService:UnitTreeService, private employeeService:EmployeeService, private positionService:PositionService) {}
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public statusList:any[];
  public cvSize = 2;
  public unitList:IUnit[];
  @Input() employeeForm: FormGroup;
  public positionList:IPosition[];
  @ViewChild('cv', { static: true }) cv: any;
  @Output() showAlert: EventEmitter<any> = new EventEmitter<any>();
  public warning: IWarningOtherInfo = {
    unit: null,
    position: null,
    status: null,
    description: null,
    cv: null,
  };

  ngOnInit() {
    this.unitTreeService.unitTree$.subscribe((data:any) => {
      this.unitList = data;
    })
    getControlCommon(this.employeeForm, 'otherInfo', 'position')?.disable();
    this.employeeService.getStatus().subscribe((data:any) => {
      this.statusList = data.response.data;
    })
    this.warningDetect();
    
    getControlCommon(this.employeeForm, 'otherInfo')?.valueChanges.subscribe(
      () => {
        this.warningDetect();
      }
    );
  }

  handleResetCV(): void {
    if (this.cv._files.length > 0) {
      this.cv.clear();
      setTimeout(() => {
        this.cv.basicFileInput.nativeElement.click();
      });
    }
  }

  onSelectedChange(event:any):void {
    this.positionService.getPositionByUnitId(event.node.key).subscribe((data:any) => {
      this.positionList = data.response.data;
      getControlCommon(this.employeeForm, 'otherInfo', 'position')?.enable();
    })
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.employeeForm, 'otherInfo', control);
  }

  checkTypeCV(file: File | undefined): boolean {
    if (
      file?.type === 'application/pdf'
    ) {
      return true;
    }
    return false;
  }

  checkSizeCV(file: File | undefined): boolean {
    if (
      file?.size &&
      Number((file?.size / (1024 * 1024)).toFixed(2)) < this.cvSize
    ) {
      return true;
    }
    return false;
  }

  myUploader(event: FileUpload) {
    if (this.checkTypeCV(event.files[0])) {
      if (this.checkSizeCV(event.files[0])) {
        this.employeeForm.get('otherInfo')?.get('cv')?.setValue(event.files[0]);
        this.showAlert.emit({
          severity: 'success',
          summary: 'Upload Success',
          detail: 'CV upload success',
        });
      } else {
        this.cv.clear();
        this.showAlert.emit({
          severity: 'error',
          summary: 'Upload Fail',
          detail: `The size of the CV should not be more than ${this.cvSize}mb`,
        });
      }
    } else {
      this.cv.clear();
      this.showAlert.emit({
        severity: 'error',
        summary: 'Upload Fail',
        detail: 'CV must be a pdf file',
      });
    }
  }
  warningDetect(): void {
    this.handleSetWarning('unit');
    this.handleSetWarning('position');
    this.handleSetWarning('status');
    this.handleSetWarning('description', 500);
  }

  handleSetWarning(
    type: keyof IWarningOtherInfo,
    length?: number
  ): void {
    requireWarning(this.employeeForm.get('otherInfo'), this, type);
    length &&
      maxLengthWarning(
        this.employeeForm.get('otherInfo'),
        this,
        type,
        length
      );
  }
}
