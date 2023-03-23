import { Component } from '@angular/core';
import { MemberService } from 'src/app/core/services/http/member.service';

export interface IMember {
  id: number,
  name: string,
  code: number,
  birthday: string,
  phone: string,
  image: string
}

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})

export class TeamMemberComponent {
  public memberList:IMember[];
  constructor(private memberService:MemberService) {}
  ngOnInit():void {
    this.memberService.getMember().subscribe((data:any) => {
      this.memberList = data
    })
  }
}
