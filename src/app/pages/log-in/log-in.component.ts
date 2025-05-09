import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LinkComponent } from '../../components/link/link.component';
import { ButtonComponent } from '../../components/button/button.component';

import { InputErrorComponent } from '../../components/input-error/input-error.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';

@Component({
  selector: 'app-log-in',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    InputErrorComponent,
    ButtonComponent,
    LinkComponent,
  ],
  template: `<main
    class="w-full min-h-screen grow max-w-lg px-4 pt-30 pb-12 flex flex-col items-center justify-between"
  >
    <section class="flex grow flex-col gap-8 w-full">
      <h2 class="font-bold w-full text-center text-2xl text-zinc-950">
        Enter the dog house
      </h2>

      <form
        [formGroup]="logInForm"
        (ngSubmit)="logIn()"
        id="sign-up"
        class="flex flex-col gap-3"
      >
        <app-input-field
          [control]="logInForm.controls.email"
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />

        <app-input-error
          [control]="logInForm.controls.email"
          [possibleErrors]="{
            required: 'Email is required',
            email: 'Email is not valid'
          }"
        />

        <app-input-field
          [control]="logInForm.controls.password"
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />

        <app-input-error
          [control]="logInForm.controls.password"
          [possibleErrors]="{
            required: 'Password is required',
          }"
        />

        <app-button label="Log in" [full]="true" />
        @if (errorMessage()){
        <span class="text-red-400 text-end font-bold">
          {{ errorMessage() }}
        </span>
        }
      </form>
    </section>

    <app-link href="/sign-up" label="A new puppy? Create account" />
  </main>`,
})
export class LogInComponent {
  authService = inject(AuthService);
  errorMessage = signal<null | string>(null);
  routerService = inject(Router);

  logInForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    },
    { updateOn: 'blur' }
  );

  logIn() {
    if (this.logInForm.valid) {
      const email = this.logInForm.value.email!;
      const password = this.logInForm.value.password!;

      this.authService.logInUser(email, password).subscribe({
        next: (data) => {
          this.authService.setAccessToken(data.accessToken);
          this.routerService.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage.set(error.error.errorMessage);
        },
      });
    } else {
      this.logInForm.markAllAsTouched();
    }
  }
}
