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
  public limit: number = 5;
  public total: number = 0;
  public searchInput: FormControl = new FormControl('');
  public loadDisplay: boolean = false;
  constructor(private memberService: MemberService) {}
  ngOnInit(): void {
    this.loadDisplay = true;
    this.memberService
      .getMember(1, this.limit)
      .subscribe(
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

  onPageChange(event: any): void {}
}
