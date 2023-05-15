import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, startWith, switchMap } from 'rxjs';
import { handleFormatDataUnitTreeSelect } from '../helper/unit.service';
import { IUnit } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UnitTreeService {
  constructor(private http: HttpClient) {}
  public unitById: any = {};
  public unitTree$ = new BehaviorSubject<any>(null);
  getUnitTreeByUnitId() {
    of()
      .pipe(
        startWith('organization-units'),
        switchMap((url) => {
          return this.http.get(url);
        })
      )
      .subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.unitTree$.next(
            handleFormatDataUnitTreeSelect(data.response.data)
          );
        }
      });
  }

  getUnitById(unitList: IUnit[] = [], key: string) {
    unitList &&
      unitList.forEach((item: any) => {
        if (item.key === key) {
          this.unitById = item;
        } else {
          if (item.children?.length > 0) {
            this.getUnitById(item.children, key);
          }
        }
      });
  }
  // way2 higher order observable
  // of(this.http.get('organization-units'))
  //   .pipe(switchAll())
  //   .subscribe((data: any) => {
  //     this.unitTree$.next(handleFormatDataUnitTreeSelect(data.response.data));
  //   });
}
