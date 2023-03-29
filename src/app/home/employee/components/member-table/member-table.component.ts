import { Component, Input } from '@angular/core';
import { MemberService } from 'src/app/core/services/http/member.service';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})
export class MemberTableComponent {
  constructor(private memberService:MemberService) {}
  @Input() memberList:any[]
  onPageChange(event:any) {
    console.log(event);
  }

  ngOnInit() {
    console.log(this.memberList);
  }
}
