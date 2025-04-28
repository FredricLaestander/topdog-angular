import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, HeaderComponent],
  template: `<app-header />`,
})
export class AppComponent {
  title = 'topdog-angular';
}
