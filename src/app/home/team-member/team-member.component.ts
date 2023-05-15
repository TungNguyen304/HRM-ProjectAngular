import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { PageService } from 'src/app/core/services/helper/page.service';
import { MemberService } from 'src/app/core/services/http/member.service';
import { DestroyDirective } from 'src/app/shared/directives/destroy.directive';

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
export class TeamMemberComponent extends DestroyDirective implements OnInit {
  public memberList: IMember[] = [];
  public page: number = 1;
  public limit: number = 4;
  public total: number = 0;
  public searchInput = '';
  public loadDisplay: boolean = false;
  constructor(
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageService: PageService
  ) {
    super();
  }
  ngOnInit(): void {
    this.loadDisplay = true;
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.page) {
        this.page = params.page;
      }
      if (params.search) {
        this.searchInput = params.search;
      }
      this.handleSearch();
    });

    this.memberService
      .getMember(this.page, this.limit, this.searchInput)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          if (data.statusCode === 200) {
            this.memberList = data.response.data;
            this.total = data.response.total;
            this.loadDisplay = false;
            this.page = this.pageService.setPageThenSearchOrPaginatorChange(
              this.page,
              this.limit,
              this.total,
              this.searchInput,
              'team-member'
            );
          }
        },
        () => {
          this.loadDisplay = false;
        }
      );
  }

  saveUrl() {
    this.pageService.saveUrl('team-member', this.page, this.searchInput);
  }

  handleSearch(): void {
    this.loadDisplay = true;
    console.log(this.page, this.total);
    this.saveUrl();
    this.memberService.getMember(this.page, this.limit, this.searchInput);
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.saveUrl();
    this.loadDisplay = true;
    this.memberService.getMember(this.page, this.limit, this.searchInput);
  }
}
