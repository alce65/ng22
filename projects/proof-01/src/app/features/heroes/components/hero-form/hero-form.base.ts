import { Component, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
  imports: [],
  template: `
    <h3>Add an Hero!</h3>

    <div>
      <h4 class="error">{{ message }}</h4>
      <!-- <form  [formGroup]="heroForm"> -->
      <form (ngSubmit)="addHero($event)" (submit)="addHero($event)" novalidate>
        <label for="name" class="control-group">
          <span>Name:</span>
          <input type="text" name="name" placeholder="Name" required />
        </label>
        <label for="image" class="control-group">
          <span>Image:</span>
          <select>
            @for (image of images; track image.url) {
              <option value="{{ image.url }}" [selected]="image.name === 'Superman'">
                {{ image.name }}
              </option>
            }
          </select>
        </label>
        <label for="alignment" class="control-group">
          <span>Alignment:</span>
          <select>
            <option value="good" selected>Good</option>
            <option value="bad">Bad</option>
          </select>
        </label>

        <!-- <fieldset formGroupName="powerstats"> -->
        <fieldset>
          <label for="combat" class="control-group">
            <span>Combat:</span>
            <input type="number" name="combat" placeholder="Combat" />
          </label>
          <label for="durability" class="control-group">
            <span>Durability:</span>
            <input type="number" name="durability" placeholder="Durability" />
          </label>
          <label for="intelligence" class="control-group">
            <span>Intelligence:</span>
            <input type="number" name="intelligence" placeholder="Intelligence" />
          </label>
          <label for="power" class="control-group">
            <span>Power:</span>
            <input type="number" name="power" placeholder="Power" />
          </label>
          <label for="speed" class="control-group">
            <span>Speed:</span>
            <input type="number" name="speed" placeholder="Speed" />
          </label>
          <label for="strength" class="control-group">
            <span>Strength:</span>
            <input type="number" name="strength" placeholder="Strength" />
          </label>
        </fieldset>

        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
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
  `,
})
export class HeroForm {
  readonly router = inject(Router);
  protected readonly message = '';

  protected readonly images = IMAGES;

  addHero(event: Event) {
    event.preventDefault();
    console.log('addHero() in Hero-form');

    const navigationExtras: NavigationExtras = {
      state: {
        hero: {
          name: 'New Hero',
          powerstats: {
            combat: 0,
            durability: 0,
            intelligence: 0,
            power: 0,
            speed: 0,
            strength: 0,
          },
          image:
            'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/644-superman.jpg',
          alignment: 'good',
        },
      },
    };

    this.router.navigate(['/heroes'], navigationExtras);
  }
}
