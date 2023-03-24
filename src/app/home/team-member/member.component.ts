import { Component, Input } from '@angular/core';
import { IMember } from './team-member.component';

@Component({
  selector: 'app-member',
  template: `
    <div class="team_item">
      <div class="avt">
        <img [src]="memberInfo.image" alt="" />
      </div>
      <div class="info">
        <p class="name">{{ memberInfo.name }}</p>
        <div>
          <p class="code">{{ memberInfo.code }}</p>
          <p class="birthday">({{ memberInfo.birthday }})</p>
          <p class="phone">{{ memberInfo.phone }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .team_item {
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
          margin-bottom: 10px;
          font-size: 20px;
          font-weight: 600;
        }
        .code,
        .birthday {
          margin-bottom: 10px;
          color: #7a7e80;
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
