import { Component, inject } from '@angular/core';
import { TierlistService } from '../../services/tierlist.service';
import { Observable } from 'rxjs';
import { List } from '../../../types';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-lists',
  imports: [AsyncPipe, RouterLink],
  template: `
    <ul id="featured" class="flex flex-row gap-4 overflow-x-scroll">
      @for (list of lists$ | async; track list._id) {
      <li>
        <a [routerLink]="['/list', list._id]">
          <div class="size-32 md:size-44 bg-zinc-500"></div>

          <h3>{{ list.name }}</h3>
        </a>
      </li>
      }
    </ul>
  `,
})
export class FeaturedListsComponent {
  tierlistService = inject(TierlistService);
  lists$!: Observable<List[]>;

  ngOnInit() {
    this.lists$ = this.tierlistService.getAll();
  }
}
