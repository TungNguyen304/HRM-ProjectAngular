import { Component, Input } from '@angular/core';
import { IMember } from './team-member.component';

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
          <p class="birthday">{{ memberInfo.birth_date }}</p>
          <p class="phone">{{ memberInfo.mobile }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .team_item {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        text-align: center;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        .avt {
          flex: 1;
          img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            display: block;
          }
          i {
            font-size: 120px;
            color: var(--primary-color-main);
          }
        }
        .info {
          padding: 10px 20px 20px;
          flex: 1;
          display: flex;
          background-color: var(--primary-color-main);
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
        }
        .name {
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }
        .code,
        .birthday {
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    `,
  ],
})
export class MemberComponent {
  @Input() memberInfo: IMember;
}
