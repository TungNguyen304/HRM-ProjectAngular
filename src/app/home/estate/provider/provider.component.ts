import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { ExportFileService } from 'src/app/core/services/helper/export-file.service';
import { ModalService } from 'src/app/core/services/helper/modal.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { ProviderService } from 'src/app/core/services/http/provider.service';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';
import { IProviderResponse } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent {
  public providerList: IProviderResponse[];
  public displayCreate: boolean = false;
  public idProvider: number;
  public pageCurrent: number = 1;
  public total: number = 0;
  public limit: number = 4;
  public infoUpdate: IProviderResponse;
  public loadDisplay: boolean = false;
  public searchInput: FormControl = new FormControl('');
  public typeAction: 'Add' | 'Update';
  public toast: any;
  constructor(
    private providerService: ProviderService,
    private toastService: ToastService,
    private modalService: ModalService,
    private loadingService: LoadingService,
    private exportFileService: ExportFileService,
    private toasMsgService: ToastMsgService
  ) {}

  handleDisplayCreateProvider(): void {
    this.typeAction = 'Add';
    this.displayCreate = !this.displayCreate;
  }

  exportFile() {
    this.loadingService.setloading(true);
    this.providerService
      .getAllProvider()
      .pipe(
        finalize(() => {
          this.loadingService.setloading(false);
        })
      )
      .subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.exportFileService.exportAsExcelFile(
            data.response.data,
            'Distributor List'
          );
        }
      });
  }

  showMessage(type: boolean): void {
    if (type === true) {
      this.displayCreate = false;
      this.toastService.toastSuccess(
        this.toast.providerSuccess,
        this.typeAction
      );
      this.handleGetProvider();
    } else {
      this.toastService.toastError(
        this.toast.providerFail,
        this.typeAction
      );
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

  handleDeleteProvider(provider: IProviderResponse): void {
    this.modalService.confirmDetele(provider.name, () => {
      this.loadDisplay = true;
      this.providerService
        .deleteProviderById(provider.distributor_id)
        .subscribe(
          () => {
            this.toastService.toastSuccess(
              this.toast.deleteEmployeeSuccess
            );
          },
          () => {
            this.toastService.toastError(
              this.toast.deleteEmployeeFail
            );
          }
        );
      this.handleGetProvider();
    });
  }

  handleUpdateProvider(provider: IProviderResponse): void {
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
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
    this.handleGetProvider().subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
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
