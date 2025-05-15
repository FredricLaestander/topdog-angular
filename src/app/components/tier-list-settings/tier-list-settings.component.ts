import { Component, output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { InputFieldComponent } from '../input-field/input-field.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';

@Component({
  selector: 'app-tier-list-settings',
  imports: [
    LucideAngularModule,
    InputFieldComponent,
    ReactiveFormsModule,
    InputErrorComponent,
  ],
  template: `
    <div
      id="tier-list-settings-modal"
      class="flex inset-0 flex-col items-center justify-between px-6 py-32 fixed bg-zinc-200/60 backdrop-blur-sm"
    >
      <form
        [formGroup]="tierlistSettings"
        id="tier-list-settings"
        class="gap-8 w-full flex flex-col"
      >
        <div class="w-full flex justify-end">
          <button class="p-1 cursor-pointer" (click)="close()">
            <lucide-icon [img]="x" class="size-6 text-zinc-800"></lucide-icon>
          </button>
        </div>

        <div class="flex flex-col gap-4">
          <app-input-field
            [control]="tierlistSettings.controls.name"
            label="Name"
            name="name"
            placeholder="A good tier list name"
          />
          <app-input-error
            [control]="tierlistSettings.controls.name"
            [possibleErrors]="{
              required: 'A name for the list is required'
            }"
          />

          <app-input-field
            [control]="tierlistSettings.controls.description"
            label="Description"
            name="description"
            placeholder="A fitting description"
          />
        </div>
      </form>

      <button
        type="button"
        id="delete"
        class="button justify-between items-center w-full"
      >
        <span>Delete list</span>
        <i data-lucide="trash-2" class="size-6 text-white"></i>
      </button>
    </div>
  `,
})
export class TierListSettingsComponent {
  readonly x = X;
  closeModal = output();

  tierlistSettings = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    },
    { updateOn: 'blur' }
  );

  close() {
    this.closeModal.emit();
  }
}
