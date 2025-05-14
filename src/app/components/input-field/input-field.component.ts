import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule],
  template: `
    <div class="gap-1 flex flex-col w-full">
      <div class="flex justify-between items-center">
        <label [for]="name()" class="px-3 text-zinc-700 text-xs">{{
          label()
        }}</label>
        <span id="username-error" class="text-xs text-red-400"></span>
      </div>
      <input
        [formControl]="control()"
        [class]="getClasses()"
        [type]="type()"
        [name]="name()"
        [id]="name()"
        [placeholder]="placeholder()"
      />
    </div>
  `,
})
export class InputFieldComponent {
  label = input.required<string>();
  type = input<string>('text');
  name = input.required<string>();
  placeholder = input.required<string>();
  variant = input<'primary' | 'secondary'>('primary');

  control = input.required<FormControl>();

  getClasses() {
    const shared = 'rounded-xl px-4 py-2 gap-2 placeholder:text-zinc-400';

    if (this.variant() === 'secondary') {
      return `bg-white/80 backdrop-blur-sm ${shared}`;
    } else {
      return `bg-white border-1 border-zinc-200 ${shared}`;
    }
  }
}
