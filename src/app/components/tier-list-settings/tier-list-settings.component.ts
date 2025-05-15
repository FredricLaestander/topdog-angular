import { Component, inject, input, output, signal } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { InputFieldComponent } from '../input-field/input-field.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { Router } from '@angular/router';
import { TierlistService } from '../../services/tierlist.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-tier-list-settings',
  imports: [
    LucideAngularModule,
    InputFieldComponent,
    ReactiveFormsModule,
    InputErrorComponent,
    ButtonComponent,
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
      <app-button label="Delete tierlist" (onClick)="deleteList()" />

      @if (errorMessage()){
      <span class="text-red-400 text-end font-bold"> {{ errorMessage() }} </span
      >}
    </div>
  `,
})
export class TierListSettingsComponent {
  readonly x = X;

  routerService = inject(Router);
  tierlistService = inject(TierlistService);

  errorMessage = signal<null | string>(null);
  closeModal = output();

  listId = input.required<string>();
  name = input.required<string>();
  description = input<string | undefined>();

  tierlistSettings = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    },
    { updateOn: 'blur' }
  );

  ngOnInit() {
    this.tierlistSettings.controls.name.setValue(this.name());
    this.tierlistSettings.controls.description.setValue(
      this.description() || ''
    );
  }

  close() {
    this.updateList();
    this.closeModal.emit();
  }

  updateList() {
    if (this.tierlistSettings.valid) {
      const name = this.tierlistSettings.value.name!;
      const description = this.tierlistSettings.value.description!;

      this.tierlistService
        .updateList(this.listId(), name, description)
        .subscribe({
          next: () => {
            window.location.reload();
          },
          error: (error) => {
            this.errorMessage.set(error.error.errorMessage);
          },
        });
    } else {
      this.tierlistSettings.markAllAsTouched();
    }
  }

  deleteList() {
    this.tierlistService.deleteList(this.listId()).subscribe({
      next: () => {
        this.routerService.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.error.errorMessage);
      },
    });
  }
}
