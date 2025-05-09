import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { LinkComponent } from '../../components/link/link.component';
import { ButtonComponent } from '../../components/button/button.component';
import { InputErrorComponent } from '../../components/input-error/input-error.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    InputFieldComponent,
    LinkComponent,
    ButtonComponent,
    ReactiveFormsModule,
    InputErrorComponent,
  ],
  template: `
    <main
      class="w-full min-h-screen grow max-w-lg px-4 pt-30 pb-12 flex flex-col items-center justify-between"
    >
      <section class="flex grow flex-col gap-8 w-full">
        <h2 class="font-bold w-full text-center text-2xl text-zinc-950">
          Create the bark in you!
        </h2>

        <form
          [formGroup]="userForm"
          (ngSubmit)="signUp()"
          id="sign-up"
          class="flex flex-col gap-3"
        >
          <app-input-field
            [control]="userForm.controls.username"
            label="Username"
            name="username"
            placeholder="Enter a unique username"
          />

          <app-input-error
            [control]="userForm.controls.username"
            [possibleErrors]="{
              required: 'Username is required',
              minlength: 'Username must be at least 3 characters',
              maxlength: 'Username must be maximum 30 characters'
            }"
          />

          <app-input-field
            [control]="userForm.controls.email"
            label="Email"
            type="email"
            name="email"
            placeholder="Enter a valid email"
          />

          <app-input-error
            [control]="userForm.controls.email"
            [possibleErrors]="{
              required: 'Email is required',
              email: 'Email is not valid'
            }"
          />

          <app-input-field
            [control]="userForm.controls.password"
            label="Password"
            type="password"
            name="password"
            placeholder="Enter a strong password"
          />

          <app-input-error
            [control]="userForm.controls.password"
            [possibleErrors]="{
              required: 'Password is required',
              minlength: 'Password must be least 8 characters',
              maxlength: 'Password must be maximum 30 characters'
            }"
          />

          <app-input-field
            [control]="userForm.controls.confirmPassword"
            label="Confirm password"
            type="password"
            name="password-confirmation"
            placeholder="Enter password again"
          />

          <app-input-error
            [control]="userForm.controls.confirmPassword"
            [possibleErrors]="{
              required: 'Confirm your password',
              passwordMismatch: 'Passwords do not match'
            }"
          />

          <app-button label="Create account" [full]="true" />
          @if (errorMessage()){
          <span class="text-red-400 text-end font-bold">
            {{ errorMessage() }}
          </span>
          }
        </form>
      </section>

      <app-link href="/log-in" label="Already part of the flock? Log in!" />
    </main>
  `,
})
export class SignUpComponent {
  authService = inject(AuthService);
  errorMessage = signal<null | string>(null);
  routerService = inject(Router);

  userForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        (control) => {
          const parent = control.parent;
          if (!parent) {
            return null;
          }

          const passwordControl = parent.get('password');
          if (!passwordControl) {
            return null;
          }

          if (passwordControl.value !== control.value) {
            return { passwordMismatch: true };
          }

          return null;
        },
      ]),
    },
    { updateOn: 'blur' }
  );

  signUp() {
    if (this.userForm.valid) {
      const username = this.userForm.value.username!;
      const email = this.userForm.value.email!;
      const password = this.userForm.value.password!;

      this.authService.createUser(username, email, password).subscribe({
        next: () => {
          this.routerService.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage.set(error.error.errorMessage);
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
