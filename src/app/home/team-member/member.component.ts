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
          <p class="birthday">({{ memberInfo.birth_date }})</p>
          <p class="phone">{{ memberInfo.mobile }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .team_item {
        height: 350px;
        border: 1px solid var(--primary-color-main);
        height: 100%;
        &:hover {
          box-shadow: 0 0 8px 2px #ccc;
          cursor: pointer;
        }
        padding: 25px 10px;
        display: flex;
        flex-direction: column;
        text-align: center;
        background-color: #fff;
        border-radius: 4px;
        .avt {
          flex: 1;
          margin-bottom: 10px;
          img {
            width: 120px;
            height: 120px;
            border-radius: 100%;
            object-fit: cover;
            border: 1px solid var(--primary-color-main);
          }
          i {
            font-size: 120px;
            color: var(--primary-color-main);
          }
        }
        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .name {
          font-family: 'Times New Roman', Times, serif;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: 600;
        }
        .code,
        .birthday {
          margin-bottom: 20px;
          color: #7a7e80;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .phone {
          color: #7a7e80;
        }
      }
    `,
  ],
})
export class MemberComponent {
  @Input() memberInfo: IMember;
}
