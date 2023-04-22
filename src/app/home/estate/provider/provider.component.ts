import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { ModalService } from 'src/app/core/services/helper/modal.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { ProviderService } from 'src/app/core/services/http/provider.service';
import { toast } from 'src/app/shared/toastMessage';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent {
  public providerList: any;
  public displayCreate: boolean = false;
  public idProvider: number;
  public pageCurrent: number = 1;
  public total: number = 0;
  public limit: number = 4;
  public infoUpdate: any;
  public loadDisplay: boolean = false;
  public searchInput: FormControl = new FormControl('');
  public typeAction: 'Add' | 'Update';
  constructor(
    private providerService: ProviderService,
    private toastService: ToastService,
    private modalService: ModalService
  ) {}

  handleDisplayCreateProvider(): void {
    this.typeAction = 'Add';
    this.displayCreate = !this.displayCreate;
  }

  showMessage(type: boolean): void {
    if (type === true) {
      this.displayCreate = false;
      this.toastService.toastSuccess(toast.providerSuccess, this.typeAction);
      this.handleGetProvider();
    } else {
      this.toastService.toastError(toast.providerFail, this.typeAction);
    }
  }

  handleGetProvider(): Observable<Object> {
    this.loadDisplay = true;
    return this.providerService.getProvider(
      this.pageCurrent,
      this.limit,
      this.searchInput.value
    );
  }

  handleDeleteProvider(provider: any): void {
    this.modalService.confirmDetele(provider.name, () => {
      this.loadDisplay = true;
      this.providerService
        .deleteProviderById(provider.distributor_id)
        .subscribe(
          () => {
            this.toastService.toastSuccess(toast.deleteEmployeeSuccess);
          },
          () => {
            this.toastService.toastError(toast.deleteEmployeeFail);
          }
        );
      this.handleGetProvider();
    });
  }

  handleUpdateProvider(provider: any): void {
    this.typeAction = 'Update';
    this.displayCreate = true;
    this.infoUpdate = provider;
  }

  onPageChange(event: any): void {
    if (this.pageCurrent !== event.page + 1) {
      this.loadDisplay = true;
      this.pageCurrent = event.page + 1;
      this.handleGetProvider();
    }
  }

  ngOnInit() {
    this.handleGetProvider().subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          console.log(data);
          this.total = data.response.total;
          this.providerList = data.response.data;
        }
        this.loadDisplay = false;
      },
      () => {
        this.loadDisplay = false;
      }
    );
  }
}
