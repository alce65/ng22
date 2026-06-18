import { Component, model } from '@angular/core';
import { CheckModel } from '../check-model/check-model';

@Component({
  selector: 'alc-use-check-model',
  imports: [CheckModel],
  template: `
    <div class="shopping-app">
      <h1>Custom Checkbox Example</h1>

      <div class="demo-section">
        <alc-check-model
          [checked]="agreedToTerms()"
          (checkedChange)="agreedToTerms.set($event)"
          label="I agree to the terms"
        />

        <alc-check-model
          [checked]="enableNotifications()"
          (checkedChange)="enableNotifications.set($event)"
          label="Enable notifications"
        />

        <div class="controls">
          <p>
            Terms agreed:
            @if (agreedToTerms()) {
              Yes
            } @else {
              No
            }
          </p>
          <p>
            Notifications:
            @if (enableNotifications()) {
              Yes
            } @else {
              No
            }
          </p>
          <!-- TODO: Add (click) handlers -->
          <button (click)="toggleTerms()">Toggle Terms from Parent</button>
          <button (click)="resetAll()">Reset All</button>
        </div>
      </div>
    </div>
  `,

  styles: `
    .shopping-app {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .demo-section {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }

    .controls {
      margin: 20px 0;
      padding: 16px;
      background: #f0f8ff;
      border-radius: 8px;
      border-left: 4px solid var(--color-primary);
    }

    .controls p {
      margin: 8px 0;
      font-weight: bold;
    }

    button {
      margin-right: 8px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: var(--color-primary);
      color: var(--color-background);
      font-weight: bold;
      transition: background-color 0.2s;
    }

    button:hover {
      background: var(--color-primary-hot);
    }
  `,
})
export class UseCheckModel {
  // Parent signal models
  protected readonly agreedToTerms = model(false);
  protected readonly enableNotifications = model(true);

  protected toggleTerms() {
    this.agreedToTerms.set(!this.agreedToTerms());
  }

  resetAll() {
    this.agreedToTerms.set(false);
    this.enableNotifications.set(false);
  }

}
