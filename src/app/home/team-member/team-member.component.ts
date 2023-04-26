import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs';
import { MemberService } from 'src/app/core/services/http/member.service';

export interface IMember {
  employee_id: number;
  full_name: string;
  employee_code: number;
  birth_date: string;
  mobile: string;
  image_url: string;
  email: string;
  gender: string;
}

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss'],
})
export class TeamMemberComponent {
  public memberList: IMember[] = [];
  public page: number = 1;
  public limit: number = 4;
  public total: number = 0;
  public searchInput = '';
  public loadDisplay: boolean = false;
  constructor(private memberService: MemberService) {}
  ngOnInit(): void {
    this.loadDisplay = true;
    this.memberService.getMember(this.page, this.limit).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          this.memberList = data.response.data;
          this.total = data.response.total;
          this.loadDisplay = false;
        }
      },
      () => {
        this.loadDisplay = false;
      }
    );
  }

  handleSearch(): void {
    this.loadDisplay = true;
    this.memberService.getMember(this.page, this.limit, this.searchInput);
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.loadDisplay = true;
    this.memberService.getMember(this.page, this.limit, this.searchInput);
  }
}
