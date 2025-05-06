import { Component, input } from '@angular/core';

@Component({
  selector: 'app-link',
  imports: [],
  template: `
    <a [href]="href()" [className]="getClasses()">
      {{ label() }}
    </a>
  `,
})
export class LinkComponent {
  variant = input<'link' | 'button'>('link');
  href = input.required<string>();
  label = input<string>();

  getClasses() {
    if (this.variant() === 'button') {
      return `flex px-4 py-2 bg-zinc-950 text-white rounded-full hover:bg-zinc-800 transition cursor-pointer`;
    } else {
      return `hover:underline hover:text-zinc-950 transition;`;
    }
  }
}
