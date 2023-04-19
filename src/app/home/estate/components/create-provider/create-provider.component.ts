import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { requireWarning } from 'src/app/core/services/helper/warningForm.service';
import { ProviderService } from 'src/app/core/services/http/provider.service';
import { IWarningProvider } from 'src/app/shared/interfaces';
import { toast } from 'src/app/shared/toastMessage';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss'],
})
export class CreateProviderComponent implements OnInit {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public providerForm: FormGroup;
  public disable: boolean = false;
  @ViewChild('buttonSave') buttonSave: ElementRef;
  @Input() typeAction: 'Add' | 'Update';
  @Input() infoUpdate: any;
  @Output() showMessage: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private commonService: CommonService,
    private providerService: ProviderService,
    private toastService: ToastService
  ) {}
  public warning: IWarningProvider = {
    name: null,
    item: null,
    contact: null,
    address: null,
  };
  handleBack(): void {
    this.location.back();
  }
  handleTypeRequestApi(data: any, id?: string): Observable<Object> {
    if (id && this.typeAction === 'Update') {
      return this.providerService.updateProvider(data, id);
    }
    return this.providerService.addProvider(data);
  }
  onSubmit(): void {
    this.commonService.markAsDirty(this.providerForm);
    if (this.providerForm.valid) {
      console.log('ok');
      const data = {
        name: this.providerForm.get('name')?.value,
        items: this.providerForm.get('item')?.value,
        address: this.providerForm.get('address')?.value,
        contact: this.providerForm.get('contact')?.value,
        note: this.providerForm.get('note')?.value,
      };
      this.buttonSave.nativeElement.classList.toggle('button--loading');
      this.disable = true;
      this.handleTypeRequestApi(
        data,
        this.infoUpdate?.job_position_id
      ).subscribe(
        (data: any) => {
          if (data.statusCode === 200) {
            this.showMessage.emit(true);
          }
        },
        () => {
          this.showMessage.emit(false);
          this.buttonSave.nativeElement.classList.toggle('button--loading');
          this.disable = false;
        }
      );
    }
  }

  ngOnInit() {
    this.providerForm = this.fb.group({
      name: ['', [Validators.required]],
      item: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      note: [''],
    });

    this.warningDetect();
    this.providerForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.providerForm, control);
  }

  warningDetect(): void {
    this.handleSetWarning('name');
    this.handleSetWarning('item');
    this.handleSetWarning('address');
    this.handleSetWarning('contact');
  }

  handleSetWarning(type: keyof IWarningProvider): void {
    requireWarning(this.providerForm, this, type);
  }
}
