import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Identity Verification';

  constructor() { }

  public goToLink(link: string): void {
    window.location.href = link;
  }
}
