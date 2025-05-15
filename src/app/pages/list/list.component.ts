import { Component, computed, inject, signal } from '@angular/core';
import { TierlistService } from '../../services/tierlist.service';
import { LucideAngularModule, Settings } from 'lucide-angular';
import { TierComponent } from '../../components/tier/tier.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { List } from '../../../types';
import { AsyncPipe } from '@angular/common';
import { TierListSettingsComponent } from '../../components/tier-list-settings/tier-list-settings.component';
@Component({
  selector: 'app-list',
  imports: [
    AsyncPipe,
    LucideAngularModule,
    TierComponent,
    TierListSettingsComponent,
  ],
  template: `
    @if (list$ | async; as list) {
    <main class="w-full max-w-5xl p-4 pt-36 gap-8 flex flex-col">
      <section class="grow flex flex-col gap-3">
        <div class="flex w-full gap-4">
          <h2 id="listTitle" class="w-full text-zinc-950 text-xl">
            {{ list.name }}
          </h2>

          <button
            (click)="openModal()"
            id="open-settings"
            class="p-2 items-center justify-center flex cursor-pointer rounded-full transition hover:bg-zinc-50"
          >
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

    @if (isModalOpen()) {
    <app-tier-list-settings
      (closeModal)="closeModal()"
      [listId]="list._id"
      [name]="list.name"
      [description]="list.description"
    />
    } }
  `,
})
export class ListComponent {
  tierlistService = inject(TierlistService);
  readonly settings = Settings;
  isModalOpen = signal(false);

  route = inject(ActivatedRoute);

  id = computed(() => this.route.snapshot.paramMap.get('id')!);
  list$!: Observable<List>;

  ngOnInit() {
    this.list$ = this.tierlistService.getListById(this.id());
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
