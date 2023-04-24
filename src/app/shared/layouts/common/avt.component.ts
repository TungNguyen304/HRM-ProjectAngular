import { Component } from '@angular/core';
import { AccountService } from 'src/app/core/services/state/account.service';

@Component({
  selector: 'app-avt',
  template: `<div class="personal">
    <span class="email">{{ account?.email }}</span>
    <div class="avt">
      <img
        [src]="
          account?.image_url || '../../../../assets/images/Avatar-mac-dinh-ngau-cho-nam-nen-cam.jpg'
        "
        alt=""
      />
    </div>
  </div>`,
  styles: [
    `
      .personal {
        cursor: pointer;
        border-radius: 10px;
        display: flex;
        align-items: center;
        background-color: var(--primary-color-main);
        color: #fff;
        gap: 20px;
        .avt {
          background-color: #fff;
          overflow: hidden;
          border-radius: 100%;
          box-shadow: 0 0 6px 1px #fff;
          border: 1px solid #fff;
        }
        img {
          width: 40px;
          height: 40px;
          display: block;
          object-fit: cover;
        }
        span {
          font-size: 14px;
        }

        i {
          margin-left: 10px;
          padding: 10px;
          border-radius: 5px;
          font-size: 11px;
          border-radius: 50%;
          border: 1px solid transparent;
          &:hover {
            transition: all 0.3s ease-out;
            box-shadow: 0px 0px 6px 2px #ccc;
            border: 1px solid var(--primary-color-main);
          }
        }
      }
    `,
  ],
  styleUrls: ['../side-bar/side-bar.component.scss']
})
export class AvtComponent {
  public account: any;
  constructor(private accountService: AccountService) {}
  ngOnInit() {
    this.accountService.account$.subscribe((data: any) => {
      this.account = data;
    });
  }
}
