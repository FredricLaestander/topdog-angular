import { input, Component, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button
      (click)="onClick.emit()"
      class="flex px-4 py-2 bg-zinc-950 text-white rounded-full hover:bg-zinc-800 transition cursor-pointer"
    >
      {{ label() }}
    </button>
  `,
})
export class ButtonComponent {
  label = input.required<string>();
  onClick = output();
}
