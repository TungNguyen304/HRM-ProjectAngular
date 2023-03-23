import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('nav') nav:ElementRef;

  handleSlideIn():void {
    console.log(this.nav.nativeElement.style.width);
    if(!this.nav.nativeElement.style.width || this.nav.nativeElement.style.width === "20em") {
      this.nav.nativeElement.style.width = "56px"
    } else {
      this.nav.nativeElement.style.width = "20em"
    }
  }

}
