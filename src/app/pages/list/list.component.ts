import { Component, inject } from '@angular/core';
import { TierlistService } from '../../services/tierlist.service';
import { LucideAngularModule, Settings } from 'lucide-angular';
@Component({
  selector: 'app-list',
  imports: [LucideAngularModule],
  template: `<main class="w-full max-w-5xl p-4 pt-36 gap-8 flex flex-col">
    <section class="grow flex flex-col gap-3">
      <div class="flex w-full gap-4">
        <h2 id="listTitle" class="w-full text-zinc-950 text-xl">
          My tier list with a very long name
        </h2>

        <button id="open-settings" class="size-8 p-1 flex cursor-pointer">
          <lucide-icon
            [img]="settings"
            class="size-6 text-zinc-400"
          ></lucide-icon>
        </button>
      </div>

      <p id="description" class="text-zinc-400 text-sm">testar 1-2 1-2</p>

      <div class="flex justify-between w-full">
        <div class="flex items-center gap-2">
          <img src="/profile.svg" alt="profile" class="size-6" />

          <p id="username" class="text-xs text-zinc-950"></p>
        </div>

        <p id="error" class="text-red-400"></p>
      </div>
    </section>

    <ul id="tiers" class="w-full">
      <li class="h-20 md:h-28 flex">
        <div
          class="size-20 md:size28 flex shrink-0 items-center justify-center bg-zinc-400"
        >
          <p class="text-center break-words min-w-0 line-clamp-4">Tier</p>
        </div>
        <div
          class="flex flex-wrap size-full border-y border-r-2 border-zinc-400"
        ></div>
      </li>
    </ul>
  </main>`,
})
export class ListComponent {
  tierlistService = inject(TierlistService);
  readonly settings = Settings;
}
