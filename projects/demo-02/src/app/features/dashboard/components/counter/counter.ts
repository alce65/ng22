import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'alc-counter',
  imports: [],
  template: `
    <h3>Counter {{ id() }}</h3>
    <p>
      Clicks: <output class="clicks">{{ clicks() }}</output>
    </p>
    <!-- <p>Value: <output [class]="count() < 0 ? 'negative' : ''" class="value">{{ count() }}</output></p> -->
    <!-- <p>Value: <output [class]="{negative: count() < 0}" class="value">{{ count() }}</output></p> -->
    <p>
      Value: <output [class.negative]="count() < 0" class="value">{{ count() }}</output>
    </p>

    @if (count() >= limit()) {
      <p class="limit-reached">Alcanzaste el límite de {{ limit() }}</p>
    } @else if (count() <= -limit()) {
      <p class="limit-reached">Alcanzaste el límite de -{{ limit() }}</p>
    } @else {
      <p class="limit-reached">&nbsp;</p>
    }

    <div>
      <button (click)="changeCount(1)" [disabled]="count() >= limit()" title="Increment">➕</button>
      <button (click)="changeCount(-1)" [disabled]="count() <= -limit()" title="Decrement">
        ➖
      </button>
      <button (click)="resetCount()" [disabled]="count() === 0" title="Reset">🟣</button>
      <button (click)="changeCountAsync()" [disabled]="count() >= limit()" title="Increment Async">
        ➕ Async
      </button>
    </div>
  `,
  styles: `
    div {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .limit-reached {
      color: var(--color-primary-hot);
    }

    .negative {
      color: var(--color-tertiary-hot);
    }
  `,
})
export class Counter {
  readonly id = input.required<number>();
  readonly initialValue = input<number>(0, { alias: 'value' });

  protected readonly clickEvent = output<number>();

  protected readonly limit = signal(5);
  protected readonly clicks = signal(0);
  protected readonly count = signal(0);

  // GETTER de la signal
  // this.clicks()
  // SETTERS de la signal
  // this.clicks.set()
  // this.clicks.update()

  changeCount(delta: number) {
    this.clicks.update((value) => value + 1);
    this.clickEvent.emit(delta);
    if (delta > 0 && this.count() >= this.limit()) {
      return;
    }
    if (delta < 0 && this.count() <= -this.limit()) {
      return;
    }
    this.count.update((value) => value + delta);
  }

  resetCount() {
    const delta = -this.count();
    this.clickEvent.emit(delta);
    this.clicks.set(0);
    this.count.set(0);
  }
  changeCountAsync() {
    setTimeout(() => {
      this.changeCount(1);
      console.log(`Clicks: ${this.clicks}`);
    }, 1000);
  }
}
