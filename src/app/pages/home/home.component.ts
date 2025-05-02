import { Component } from '@angular/core';
import { FeaturedListsComponent } from '../../components/featured-lists/featured-lists.component';

@Component({
  selector: 'app-home',
  imports: [FeaturedListsComponent],
  template: ` <main class="max-w-5xl w-full p-4 pt-36 gap-8 flex flex-col">
    <div>
      <h1 class="text-xl text-zinc-900">Create a tier list for anything</h1>
      <p>
        Easily organize items into tiers, grouping similar ones together from
        best to worst.
      </p>
    </div>
    <!-- <section>
      <h2 class="text-zinc-900">Your tier list</h2>
      <div>Lists</div>
    </section> -->
    <section class="flex flex-col gap-2">
      <h2 class="text-zinc-900">Top Dog featured</h2>
      <app-featured-lists />
    </section>
  </main>`,
})
export class HomeComponent {}
