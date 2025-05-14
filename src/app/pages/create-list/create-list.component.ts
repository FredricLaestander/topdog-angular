import { Component, inject, signal } from '@angular/core';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { InputErrorComponent } from '../../components/input-error/input-error.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { TierlistService } from '../../services/tierlist.service';

@Component({
  selector: 'app-create-list',
  imports: [
    InputFieldComponent,
    InputErrorComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  template: ` <main
    class="w-full grow max-w-lg px-4 pt-30 pb-12 flex flex-col items-center h-full justify-between"
  >
    <section class="flex grow flex-col gap-8 w-full">
      <h2 class="font-bold w-full text-center text-2xl text-zinc-950">
        Create a tier list
      </h2>

      <form
        [formGroup]="createForm"
        (ngSubmit)="createList()"
        id="sign-up"
        class="flex flex-col gap-3"
      >
        <app-input-field
          [control]="createForm.controls.name"
          label="Name"
          type="text"
          name="name"
          placeholder="Tierlist name"
        />

        <app-input-error
          [control]="createForm.controls.name"
          [possibleErrors]="{
            required: 'Enter name of your new list',
          }"
        />

        <app-input-field
          [control]="createForm.controls.description"
          label="Description"
          type="text"
          name="description"
          placeholder="Describe your cool list"
        />

        <app-button label="Create tier list!" [full]="true" />

        @if (errorMessage()){
        <span class="text-red-400 text-end font-bold">
          {{ errorMessage() }} </span
        >}
      </form>
    </section>
  </main>`,
})
export class CreateListComponent {
  routerService = inject(Router);
  errorMessage = signal<null | string>(null);
  tierlistService = inject(TierlistService);

  createForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    },
    { updateOn: 'blur' }
  );

  createList() {
    if (this.createForm.valid) {
      const name = this.createForm.value.name!;
      const description = this.createForm.value.description!;

      this.tierlistService.createList(name, description).subscribe({
        next: (data) => {
          this.routerService.navigate(['/list', data.listId]);
        },
        error: (error) => {
          this.errorMessage.set(error.error.errorMessage);
        },
      });
    } else {
      this.createForm.markAllAsTouched();
    }
  }
}
