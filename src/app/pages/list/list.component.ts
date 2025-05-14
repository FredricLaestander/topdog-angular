import { Component, computed, inject } from '@angular/core';
import { TierlistService } from '../../services/tierlist.service';
import { LucideAngularModule, Settings } from 'lucide-angular';
import { TierComponent } from '../../components/tier/tier.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { List } from '../../../types';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-list',
  imports: [AsyncPipe, LucideAngularModule, TierComponent],
  template: `
    @if (list$ | async; as list) {
    <main class="w-full max-w-5xl p-4 pt-36 gap-8 flex flex-col">
      <section class="grow flex flex-col gap-3">
        <div class="flex w-full gap-4">
          <h2 id="listTitle" class="w-full text-zinc-950 text-xl">
            {{ list.name }}
          </h2>

          <button id="open-settings" class="size-8 p-1 flex cursor-pointer">
            <lucide-icon
              [img]="settings"
              class="size-6 text-zinc-400"
            ></lucide-icon>
          </button>
        </div>

        <p id="description" class="text-zinc-400 text-sm">
          {{ list.description }}
        </p>

        <div class="flex justify-between w-full">
          <div class="flex items-center gap-2">
            <img src="/profile.svg" alt="profile" class="size-6" />

            <p id="username" class="text-xs text-zinc-950">
              {{ list.user.username }}
            </p>
          </div>

          <p id="error" class="text-red-400"></p>
        </div>
      </section>

      <ul id="tiers" class="w-full">
        @for (tier of list.tiers; track tier._id){
        <app-tier name="{{ tier.name }}" color="{{ tier.color }}" />
        }
      </ul>
    </main>
    }
  `,
})
export class ListComponent {
  tierlistService = inject(TierlistService);
  readonly settings = Settings;

  route = inject(ActivatedRoute);

  id = computed(() => this.route.snapshot.paramMap.get('id')!);
  list$!: Observable<List>;

  ngOnInit() {
    this.list$ = this.tierlistService.getListById(this.id());
    this.list$.subscribe({
      next: (data) => {
        console.log(data);

        console.log(data.tiers);
      },
    });
  }
}
