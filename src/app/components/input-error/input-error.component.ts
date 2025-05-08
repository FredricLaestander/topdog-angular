import { Component, computed, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  imports: [],
  template: `
    @if (control().invalid && (control().dirty || control().touched)) {
    @for(errorKey of errorKeys(); track errorKey) { @if
    (control().hasError(errorKey)) {
    <span class="text-red-400 text-sm">{{ possibleErrors()[errorKey] }}</span>
    } }}
  `,
})
export class InputErrorComponent {
  control = input.required<FormControl>();
  possibleErrors = input.required<Record<string, string>>();
  errorKeys = computed(() => {
    return Object.keys(this.possibleErrors());
  });
}
