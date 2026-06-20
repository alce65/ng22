import { Component, computed, input, output } from '@angular/core';
import { HEROES } from '../../data/heroes';
import { Hero, PowerStat } from '../../types/hero';
import { Card } from '../../../../core/components/card/card';
import { PowerStatsChangeEvent } from '../../types/power-stats-change.event';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'alc-hero-item',
  imports: [Card, KeyValuePipe, TitleCasePipe, RouterLink],
  template: `
    <alc-card class="hero-item" [class]="isHeroVillain() ? 'hero-item hero-villain' : 'hero-item '">
      <div class="image" title="{{ hero().id }} ">
        <img [src]="hero().image" />
      </div>
      <div class="details">
        <div class="hero-name">
          {{ hero().name }}
          @if (isHeroVillain()) {
            <span> 🦹</span>
          } @else {
            <span> 🦸</span>
          }
        </div>

        @for (item of hero().powerStats | keyvalue; track $index) {
          <div class="hero-power-stats">
            <span
              >{{ item.key | titlecase }}:
              {{ item.value }}
            </span>
            <div class="hero-powerStats-buttons">
              <button
                [disabled]="hero().powerStats[item.key] === 0"
                (click)="changePowerStats(item.key, -1)"
              >
                ➖
              </button>
              <button
                [disabled]="hero().powerStats[item.key] === 100"
                (click)="changePowerStats(item.key)"
              >
                ➕
              </button>
              <button
                [disabled]="hero().powerStats[item.key] === 0"
                (click)="changePowerStats(item.key, 0)"
                [title]="'Reset ' + (item.key | titlecase) + ' to 0'"
              >
                🔄️
              </button>
            </div>
          </div>
        }
      </div>

      <div class="buttons">
        <button [routerLink]="[hero().id]">Detalles</button>
        <button [routerLink]="['edit', hero().id]">Editar</button>
        <button (click)="deleteHero()">Eliminar</button>
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
    .buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 1rem;
      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background-color: var(--color-primary);
        color: var(--color-background);
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: var(--color-primary-hot);
          transform: scale(1.05);
          transition: all 0.3s ease, transform 0.3s ease;
        }
      }
    }

    .hero-villain {
      .buttons {
        button {
          background-color: var(--color-background);
          color: var(--color-primary);

          &:hover {
            color: var(--color-primary-hot);
          }
        }
      }
    }
  `,
})
export class HeroItem {
  readonly hero = input<Hero>(HEROES[0]);
  protected readonly isHeroVillain = computed(() => this.hero().alignment === 'bad');

  protected readonly powerStatsChangeEvent = output<PowerStatsChangeEvent>();

  changePowerStats(powerStat: PowerStat, delta = 1): void {
    const value = this.hero().powerStats[powerStat];

    if (
      (delta === 1 && value < 100) ||
      (delta === -1 && value > 0) ||
      (delta === 0 && value !== 0)
    ) {
      this.powerStatsChangeEvent.emit({
        hero: this.hero(),
        powerStat,
        delta,
      });
    }
  }

  deleteHero(): void {
    console.log(`Deleting hero: ${this.hero().name}`);
  }
}
