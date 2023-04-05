import { Component, Input, OnInit } from '@angular/core';
import { MemberService } from 'src/app/core/services/http/member.service';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})
export class MemberTableComponent implements OnInit {
  constructor(private memberService:MemberService) {}
  public limit: number = 5;
  public total: number;
  @Input() memberList:any[]
  onPageChange(event:any) {
    console.log(event);
  }

  ngOnInit() {
    console.log(this.memberList);
    this.total = this.memberList.length;
  }
}
