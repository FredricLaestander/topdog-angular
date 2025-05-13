import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tier',
  imports: [],
  template: `
    <li class="h-20 md:h-28 flex">
      <div
        class="size-20 md:size-28 flex shrink-0 items-center justify-center"
        [style.background-color]="color()"
      >
        <p class="text-center break-words min-w-0 line-clamp-4">{{ name() }}</p>
      </div>
      <div
        class="flex flex-wrap size-full border-y border-r-2"
        [style.border-color]="color()"
      >
        <!-- TODO: ADD IMAGES -->
      </div>
    </li>
  `,
})
export class TierComponent {
  name = input.required<string>();
  color = input.required<string>();
  image = input<string>();
}
