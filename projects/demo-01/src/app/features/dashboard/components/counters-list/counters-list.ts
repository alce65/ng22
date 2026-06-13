import { Component, signal } from '@angular/core';
import { Card } from '../../../../core/components/card/card';
import { Counter } from '../counter/counter';

interface CounterState {
  id: number;
  value: number;
}

const COUNTERS: CounterState[] = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
];

@Component({
  selector: 'alc-counters-list',
  imports: [Counter, Card],
  template: `
    <p>Total: {{ total() }}</p>
    <p>Total Clicks: {{ totalClicks() }}</p>
    <div>
      @for (item of counters(); track $index) {
        <alc-card>
          <alc-counter [id]="item.id" (clickEvent)="handleClicks($event)" />
        </alc-card>
      }
    </div>
  `,
  styles: `
    div {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
      gap: 1rem;
    }
  `,
})
export class CountersList {
  protected readonly total = signal(0);
  protected readonly totalClicks = signal(0);

  protected readonly counters = signal<CounterState[]>(COUNTERS);

  handleClicks(delta: number) {
    this.total.update((value) => value + delta);
    this.totalClicks.update((value) => value + 1);
  }
}
