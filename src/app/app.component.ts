import { Component } from '@angular/core';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebootcamp-crm';
  date = new Date();

  // titleChanged(e: KeyboardEvent) {
  //   this.title = (e.target as HTMLInputElement).value;
  // }

  // titleChanged(e) {
  //   this.title = e.target.value;
  // }

}
