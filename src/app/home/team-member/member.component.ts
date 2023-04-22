import { Component, Input } from '@angular/core';
import { IMember } from './team-member.component';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-member',
  template: `
    <div class="team_item">
      <div class="avt">
        <img *ngIf="memberInfo.image_url" [src]="memberInfo.image_url" alt="" />
        <i *ngIf="!memberInfo.image_url" class="bi bi-person-circle"></i>
      </div>
      <div class="info">
        <p class="name">{{ memberInfo.full_name }}</p>
        <div>
          <p class="code">{{ memberInfo.employee_code }}</p>
          <p class="birthday">
            {{ commonService.reverseStringDateToVi(memberInfo.birth_date) }}
          </p>
          <p class="phone">{{ memberInfo.mobile }}</p>
        </div>
        <div class="action">
          <button
            pButton
            pRipple
            label="Chi tiết"
            class="p-button-sm p-button-warning"
          ></button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent {
  @Input() memberInfo: IMember;
  constructor(public commonService: CommonService) {}
}
