import { Component, Input } from '@angular/core';
import { IMember } from './team-member.component';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-member',
  template: `
    <div class="team_item">
      <div class="avt">
        <img
          [src]="
            memberInfo.image_url ||
            '../../../assets/images/Avatar-mac-dinh-ngau-cho-nam-nen-cam.jpg'
          "
          alt=""
        />
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
      </div>
    </div>
  `,
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent {
  @Input() memberInfo: IMember;
  constructor(public commonService: CommonService) {}
}
