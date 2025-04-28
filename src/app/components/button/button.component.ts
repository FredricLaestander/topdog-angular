import { input, Component, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button (click)="onClick.emit()" class="button">
      {{ label() }}
    </button>
  `,
})
export class ButtonComponent {
  label = input.required<string>();
  onClick = output();
}
