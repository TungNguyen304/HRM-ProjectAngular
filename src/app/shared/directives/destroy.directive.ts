import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appDestroy]',
})
export class DestroyDirective implements OnDestroy {
  public destroy$ = new Subject<any>();
  ngOnDestroy(): void {
    this.destroy$.next('completed');
    this.destroy$.complete();
  }
}
