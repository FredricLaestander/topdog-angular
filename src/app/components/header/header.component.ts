import { Component } from '@angular/core';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-header',
  imports: [LinkComponent],
  template: `<header class="flex w-full absolute p-4 justify-between">
    <a href="/">
      <img src="/logo.svg" alt="logo" />
    </a>

    <nav class="px-4 flex md:gap-8 items-center">
      <div class="flex text-zinc-700 md:flex md:gap-8">
        <app-link href="/" label="Home" />
        <app-link href="/create-list" label="Create tier list" />
      </div>

      <app-link href="/log-in" label="Log in" variant="button" />
      <!-- <img src="/profile.svg" alt="profile icon" class="size-8" /> -->
    </nav>
  </header>`,
})
export class HeaderComponent {}
