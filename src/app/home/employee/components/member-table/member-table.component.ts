import { Component } from '@angular/core';
import { MemberService } from 'src/app/core/services/api/member.service';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})
export class MemberTableComponent {
  public memberList:any;
  constructor(private memberService:MemberService) {}

  ngOnInit() {
    this.memberService.getMember().subscribe((data: any) => {
      this.memberList = data
    })
  }
}
