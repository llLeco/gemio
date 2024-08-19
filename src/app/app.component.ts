import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  prefersDark: any = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    if (this.prefersDark.matches) {
      document.body.classList.toggle('dark', true);
    }
  }

}
