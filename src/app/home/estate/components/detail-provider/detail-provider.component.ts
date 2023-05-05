import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/core/services/http/provider.service';
import { CommonService } from 'src/app/core/services/common.service';

const labelProvider = [
  { key: 'providerName', name: 'Tên nhà cung cấp' },
  { key: 'item', name: 'Mặt hàng' },
  { key: 'address', name: 'Địa chỉ' },
  { key: 'contact', name: 'Liên hệ' },
  { key: 'note', name: 'Ghi chú' },
  { key: 'priority', name: 'Độ ưu tiên' },
  { key: 'evaluate', name: 'Đánh giá định kỳ' },
  { key: 'conclude', name: 'Kết luận' },
  { key: 'dateCreated', name: 'Ngày tạo' },
  { key: 'dateUpdated', name: 'Ngày cập nhật' },
];

@Component({
  selector: 'app-detail-provider',
  templateUrl: './detail-provider.component.html',
  styleUrls: ['./detail-provider.component.scss'],
})
export class DetailProviderComponent implements OnInit {
  public infoProvider: any;
  @Input() idProvider: string;
  constructor(
    private location: Location,
    private commonService: CommonService,
    private providerService: ProviderService
  ) {}

  handleBack() {
    this.location.back();
  }

  ngOnInit() {
    this.providerService
      .getProviderById(this.idProvider)
      .subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.infoProvider = this.commonService.convertDataForTableRowStyle(
            labelProvider,
            data
          );
        }
      });
  }
}
