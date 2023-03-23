import { Location } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

const labelEmployee = [
  { key: "employeeCode", name: "Mã nhân viên" },
  { key: "image", name: "Ảnh" },
  { key: "CV", name: "CV" },
  { key: "fullName", name: "Họ Tên" },
  { key: "email", name: "Email" },
  { key: "skypeID", name: "SkypeID" },
  { key: "phone", name: "Số điện thoại" },
  { key: "sex", name: "Giới tính" },
  { key: "currentPlaceOfResidence", name: "Nơi ở hiện tại" },
  { key: "resident", name: "Thường trú" },
  { key: "dateOfBirth", name: "Ngày sinh" },
  { key: "jobDate", name: "Ngày nhận việc" },
  { key: "dateOfHire", name: "Ngày thuê" },
  { key: "workingProcess", name: "Quá trình công tác" },
  { key: "relatedProperty", name: "Tài sản liên quan" },
  { key: "workUnit", name: "Đơn vị công tác" },
  { key: "jobPosition", name: "Vị trí công việc" },
  { key: "describe", name: "Mô tả" },
  { key: "status", name: "Trạng thái" },
];



@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent {
  constructor(private location:Location, private commonService:CommonService) {}
  public infoEmployee:any = [];
  handleBack():void {
    this.location.back()
  }
  checkAvt(url:string):boolean {
      if(url)
        return true;
      return false;
  }
  ngOnInit() {
    const responeFromAPI = {
      fullName: "Nguyễn Văn Tùng",
      employeeCode: "25211216536",
    };

    this.infoEmployee = this.commonService.convertDataForTableRowStyle(labelEmployee, responeFromAPI);
  
  }
}
