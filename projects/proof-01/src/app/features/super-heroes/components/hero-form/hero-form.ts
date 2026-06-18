import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Hero, PowerStat } from '../../types/hero';
import { heroNameAsyncValidator } from '../../validators/hero-name';

type ImageOptions = {
  name: string;
  url: string;
};

const IMAGES: ImageOptions[] = [
  {
    name: 'Joker',
    url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg',
  },
  {
    name: 'Bionic Woman',
    url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/87-bionic-woman.jpg',
  },
  {
    name: 'Cat Woman',
    url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/165-catwoman.jpg',
  },
  {
    name: 'Hulk',
    url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/332-hulk.jpg',
  },
  {
    name: 'Superman',
    url: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/644-superman.jpg',
  },
];

@Component({
  selector: 'alc-hero-form',
  imports: [ReactiveFormsModule, JsonPipe, TitleCasePipe],
  template: `
    <h3>Add a Super Hero!</h3>
    <div>
      <h4 class="error">{{ message() }}</h4>
      <!-- <form  [formGroup]="heroForm"> -->
      <form (ngSubmit)="addHero($event)" [formGroup]="heroForm">
        <label for="name" class="control-group">
          <span>Name:</span>
          <input type="text" id="name" placeholder="Name" formControlName="name" />
        </label>

        @if (
          this.heroForm.get('name')?.dirty || (this.message() && this.heroForm.get('name')?.invalid)
        ) {
          <div class="error">
            @if (this.heroForm.get('name')?.getError('heroNameValid')) {
              <p>* Hero name must be a valid name</p>
            }
            @if (this.heroForm.get('name')?.getError('required')) {
              <p>* Hero name is required</p>
            }
            @if (this.heroForm.get('name')?.getError('minlength')) {
              <p>* Hero name must be at least 3 characters long</p>
            }
          </div>
        }

        <label for="image" class="control-group">
          <span>Image:</span>
          <select id="image" formControlName="image">
            @for (image of images; track image.url) {
              <option value="{{ image.url }}" [selected]="image.name === 'Superman'">
                {{ image.name }}
              </option>
            }
          </select>
        </label>
        <label for="alignment" class="control-group">
          <span>Alignment:</span>
          <select id="alignment" formControlName="alignment">
            <option value="good" selected>Good</option>
            <option value="bad">Bad</option>
          </select>
        </label>

        <!-- Para el formGroup anidado se utiliza el atributo formGroupName -->
        <fieldset formGroupName="powerStats">
          @for (powerStat of powerStats(); track powerStat) {
            <label for="{{ powerStat }}" class="control-group">
              <span>{{ powerStat | titlecase }}:</span>
              <input
                type="number"
                id="{{ powerStat }}"
                placeholder="{{ powerStat | titlecase }}"
                [formControlName]="powerStat"
              />
            </label>

            <!-- @if (this.heroForm.get('powerStats')?.get('combat')?.dirty || this.message() &&
                this.heroForm.get('powerStats')?.get('combat')?.invalid) { -->

            @if (
              this.heroForm.get('powerStats.' + powerStat)?.dirty ||
              (this.message() && this.heroForm.get('powerStats.' + powerStat)?.invalid)
            ) {
              <div class="error">
                @if (this.heroForm.get('powerStats')?.get(powerStat)?.getError('required')) {
                  <p>* {{ powerStat | titlecase }} is required</p>
                }
                @if (this.heroForm.get('powerStats')?.get(powerStat)?.getError('min')) {
                  <p>* {{ powerStat | titlecase }} must be at least 0</p>
                }
                @if (this.heroForm.get('powerStats')?.get(powerStat)?.getError('max')) {
                  <p>* {{ powerStat | titlecase }} must be at most 100</p>
                }
              </div>
            }
          }
          <!-- <label for="durability" class="control-group">
            <span>Durability:</span>
            <input
              type="number"
              id="durability"
              placeholder="Durability"
              formControlName="durability"
            />
          </label>
          <label for="intelligence" class="control-group">
            <span>Intelligence:</span>
            <input
              type="number"
              id="intelligence"
              placeholder="Intelligence"
              formControlName="intelligence"
            />
          </label>
          <label for="power" class="control-group">
            <span>Power:</span>
            <input type="number" id="power" placeholder="Power" formControlName="power" />
          </label>
          <label for="speed" class="control-group">
            <span>Speed:</span>
            <input type="number" id="speed" placeholder="Speed" formControlName="speed" />
          </label>
          <label for="strength" class="control-group">
            <span>Strength:</span>
            <input type="number" id="strength" placeholder="Strength" formControlName="strength" />
          </label> -->
        </fieldset>

        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
    <pre>{{ heroForm.value | json }}</pre>
    <pre>{{ 'State valid: ' + heroForm.valid  }}</pre>
  `,
  styles: `
    h3 {
      text-align: center;
    }

    form,
    fieldset {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }

    form {
      background-color: var(--color-background-primary);
      border-radius: 3px;
      padding: 1em;
      max-width: 500px;
      margin: 0 auto;

      .control-group {
        display: flex;
        align-items: flex-end;

        span {
          flex: 1 1 20%;
          font-weight: bolder;
          font-size: 1.1rem;
        }

        input,
        select {
          flex: 6 1 35%;

          padding: 0.5rem;
          font-size: 1rem;
          color: var(--color-primary-hot);
          background-color: var(--color-background-primary);
          border: none;
          border-block-end: 2px solid var(--color-primary);
          border-radius: 4px;

          &:focus-visible {
            outline: var(--color-primary) auto 1px;
            background-color: var(--color-background);
          }
        }
      }

      button {
        padding: 1rem;
        background: var(--color-primary);
        color: var(--color-background);
        border: 0;
        cursor: pointer;
      }

      fieldset {
        border: 0;
        padding: 0;
        margin-block-end: 1rem;
      }
    }

    .error {
      color: var(--color-tertiary);
      text-align: center;
      font-size: 0.9rem;
    }
  `,
})
export class HeroForm {
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);

  // Al hacer explicito el tipo creamos un FormGroup con tipado fuerte,
  // lo que nos permite tener autocompletado y validación de tipos en el formulario.
  heroForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], [heroNameAsyncValidator]],
    image: ['', [Validators.required]],
    alignment: ['good', [Validators.required]],
    powerStats: this.fb.group({
      combat: [90, [Validators.required, Validators.min(0), Validators.max(100)]],
      durability: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
      intelligence: [20, [Validators.required, Validators.min(0), Validators.max(100)]],
      power: [60, [Validators.required, Validators.min(0), Validators.max(100)]],
      speed: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      strength: [40, [Validators.required, Validators.min(0), Validators.max(100)]],
    }),
  });

  protected readonly powerStats = signal<PowerStat[]>([
    'combat',
    'durability',
    'intelligence',
    'power',
    'speed',
    'strength',
  ]);
  protected readonly message = signal('');
  protected readonly images = IMAGES;

  // En lugar de emitir un evento al componente padre,
  // vamos a utilizar el router para navegar a la ruta de la lista de héroes
  // y pasar el nuevo héroe como estado de navegación.

  addHero(event: Event) {
    event.preventDefault();
    if (this.heroForm.invalid) {
      this.message.set('Form is invalid. Please check the fields.');
      return;
    }
    const hero: Hero = {
      // Generate a random four-digit ID for the new hero
      id: Math.floor(1000 + Math.random() * 999),
      ...this.heroForm.value,
      powerStats: {
        ...this.heroForm.value.powerStats,
      },
    };

    const navigationExtras: NavigationExtras = {
      state: {
        hero,
      },
    };

    this.router.navigate(['/super-heroes'], navigationExtras);
  }
}
