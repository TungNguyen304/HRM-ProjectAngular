import { Component } from '@angular/core';
import { ProviderService } from 'src/app/core/services/http/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent {
  public providerList: any;
  public displayCreate:boolean = false;
  public idProvider:number;
  constructor(
    private providerService: ProviderService
  ) {}

  handleDisplayCreateProvider(): void {
    this.displayCreate = !this.displayCreate;
  }

  ngOnInit() {
    this.providerService.getProvider().subscribe((data: any) => {
      this.providerList = data;
    });
  }
}
