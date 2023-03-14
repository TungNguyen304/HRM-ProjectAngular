import { Component, Input } from '@angular/core';
import { IMember } from './team-member.component';

@Component({
  selector: 'app-member',
  template: `
    <div class="team_item">
      <div class="avt">
        <img
          [src]="memberInfo.image"
          alt=""
        />
      </div>
      <p class="name">{{memberInfo.name}}</p>
      <p class="code">{{memberInfo.code}}</p>
      <p class="birthday">({{memberInfo.birthday}})</p>
      <p class="phone">{{memberInfo.phone}}</p>
    </div>
  `,
  styles: [
    `
      .team_item {
        &:hover {
            box-shadow: 0 0 8px 2px #ccc;
            cursor: pointer;
        }
        padding: 25px 10px;
        text-align: center;
        background-color: #fff;
        border-radius: 4px;
        .avt {
          margin-bottom: 10px;
          img {
            width: 120px;
            height: 120px;
            border-radius: 100%;
          }
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
    @Input() memberInfo:IMember;
}
