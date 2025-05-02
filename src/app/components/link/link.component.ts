import { Component, input } from '@angular/core';

@Component({
  selector: 'app-link',
  imports: [],
  template: `
    <a [href]="href()" [className]="variant() === 'button' ? 'button' : 'link'">
      {{ label() }}
    </a>
  `,
})
export class LinkComponent {
  variant = input<'link' | 'button'>('link');
  href = input.required<string>();
  label = input.required<string>();
}
