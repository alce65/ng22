import { Component, computed, input, signal } from '@angular/core';
import { HEROES } from '../../data/heros';
import { Hero, PowerStat } from '../../types/hero';
import { Card } from '../../../../core/components/card/card';

@Component({
  selector: 'alc-hero-item',
  imports: [Card],
  template: `
    <alc-card class="hero-item" [class]="isHeroVillain() ? 'hero-item hero-villain' : 'hero-item '">
      <div class="image">
        <img [src]="hero().image" />
      </div>
      <div class="details">
        <div class="hero-name">
          {{ hero().name }}
        </div>
        <section>
          <div class="hero-power-stats">
            <span
              >Intelligence:
              {{ hero().powerStats.intelligence }}
            </span>
            <div class="hero-powerStats-buttons">
              <button
                [disabled]="hero().powerStats.intelligence === 0"
                (click)="changePowerStats('intelligence', -1)"
              >
                ➖
              </button>
              <button
                [disabled]="hero().powerStats.intelligence === 100"
                (click)="changePowerStats('intelligence')"
              >
                ➕
              </button>
            </div>
          </div>
          <div class="hero-power-stats">
            <span>Strength: {{ hero().powerStats.strength }}</span>
            <div class="hero-powerStats-buttons">
              <button
                [disabled]="hero().powerStats.strength === 0"
                (click)="changePowerStats('strength', -1)"
              >
                ➖
              </button>
              <button
                [disabled]="hero().powerStats.strength === 100"
                (click)="changePowerStats('strength')"
              >
                ➕
              </button>
            </div>
          </div>
          <div class="hero-power-stats">
            <span> Speed: {{ hero().powerStats.speed }}</span>
            <div class="hero-powerStats-buttons">
              <button
                [disabled]="hero().powerStats.speed === 0"
                (click)="changePowerStats('speed', -1)"
              >
                ➖
              </button>
              <button
                [disabled]="hero().powerStats.speed === 100"
                (click)="changePowerStats('speed')"
              >
                ➕
              </button>
            </div>
          </div>
          <div class="hero-power-stats">
            <span>Durability: {{ hero().powerStats.durability }}</span>
            <div class="hero-powerStats-buttons">
              <button
                [disabled]="hero().powerStats.durability === 0"
                (click)="changePowerStats('durability', -1)"
              >
                ➖
              </button>
              <button
                [disabled]="hero().powerStats.durability === 100"
                (click)="changePowerStats('durability')"
              >
                ➕
              </button>
            </div>
          </div>
          <div class="hero-power-stats">
            <span>Power: {{ hero().powerStats.power }}</span>
            <div class="hero-powerStats-buttons">
              <button
                [disabled]="hero().powerStats.power === 0"
                (click)="changePowerStats('power', -1)"
              >
                ➖
              </button>
              <button
                [disabled]="hero().powerStats.power === 100"
                (click)="changePowerStats('power')"
              >
                ➕
              </button>
            </div>
          </div>
          <div class="hero-power-stats">
            <!-- TODO 106: Same as TODO 103 but for combat -->
            <span>Combat: {{ hero().powerStats.combat }}</span>
            <div class="hero-powerStats-buttons">
              <!-- TODO 106: Same as TODO 105 but for combat -->
              <button
                [disabled]="hero().powerStats.combat === 0"
                (click)="changePowerStats('combat', -1)"
              >
                ➖
              </button>
              <button
                [disabled]="hero().powerStats.combat === 100"
                (click)="changePowerStats('combat')"
              >
                ➕
              </button>
            </div>
          </div>
        </section>
      </div>
    </alc-card>
  `,
  styles: `
    .hero-item {
      padding: 10px;

      .image {
        img {
          width: 100%;
          height: auto;
        }
      }

      .details {
        text-align: center;
      }

      &.hero-villain {
        background-color: var(--color-primary);
        color: var(--color-background);
      }

      .hero-name {
        font-weight: bolder;
        font-size: 1.4rem;
        margin-block: 0.5rem;
      }
      .hero-power-stats {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;

        .hero-powerStats-buttons {
          display: flex;
          gap: 0.5rem;
        }
      }
    }
  `,
})
export class HeroItem {
  readonly hero = input<Hero>(HEROES[0]);
  protected readonly isHeroVillain = computed(() => this.hero().alignment === 'bad');

  changePowerStats(powerStat: PowerStat, delta = 1): void {
    const value = this.hero().powerStats[powerStat];
    if (value > 0) {
      // Aunque hero es una signal, sus propiedades no lo son.
      // Por eso, de momento, podemos modificar una propiedad de hero,
      // pero el cambio ne sera completamente reactivo.
      // Si fuera asíncrono, el cambio no se reflejaría en la UI.

      this.hero().powerStats[powerStat] = this.hero().powerStats[powerStat] + delta;

      // this.hero.update((hero) => ({
      //   ...hero,
      //   powerStats: {
      //     ...hero.powerStats,
      //     [powerStat]: hero.powerStats[powerStat] + delta,
      //   },
      // }));
    }
  }
}
