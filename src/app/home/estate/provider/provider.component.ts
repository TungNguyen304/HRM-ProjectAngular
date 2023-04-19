import { Component } from '@angular/core';
import { finalize } from 'rxjs';
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
  public page: number = 1;
  public total: number = 0;
  public limit: number = 5;
  public loadDisplay: boolean = false;
  public typeAction: 'Add' | 'Update';
  constructor(
    private providerService: ProviderService,
    private toastService: ToastService
  ) {}

  handleDisplayCreateProvider(): void {
    this.typeAction = 'Add';
    this.displayCreate = !this.displayCreate;
  }

  showMessage(type: boolean): void {
    if (type === true) {
      this.displayCreate = false;
      this.toastService.toastSuccess(toast.providerSuccess, this.typeAction);
    } else {
      this.toastService.toastError(toast.providerFail, this.typeAction);
    }
  }

  onPageChange(event: any) {}

  ngOnInit() {
    this.loadDisplay = true;
    this.providerService
      .getProvider(this.page, this.limit)
      .pipe(
        finalize(() => {
          this.loadDisplay = false;
        })
      )
      .subscribe((data: any) => {
        console.log(data);
        if (data.statusCode === 200) {
          this.total = data.total;
          this.providerList = data.response.data;
        }
      });
  }
}
