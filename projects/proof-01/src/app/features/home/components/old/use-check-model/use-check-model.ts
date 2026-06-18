import { Component, signal } from '@angular/core';
import { CheckModel } from '../check-model/check-model';

@Component({
  selector: 'alc-use-check-model',
  imports: [CheckModel],
  template: `
    <div class="shopping-app">
      <h1>Custom Checkbox Example</h1>
      <p>No model() signal is used in this example.</p>

      <div class="demo-section">
        <alc-check-model
          [checked]="agreedToTerms()"
          (emitCheckedChange)="agreedToTerms.set($event)"
          label="I agree to the terms"
        />

        <alc-check-model
          [checked]="enableNotifications()"
          (emitCheckedChange)="enableNotifications.set($event)"
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
      font-family: Arial, sans-serif;
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
      border-left: 4px solid #007bff;
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
      background: #1976d2;
      color: white;
      font-weight: bold;
      transition: background-color 0.2s;
    }

    button:hover {
      background: #1565c0;
    }
  `,
})
export class UseCheckModel {
  // Parent signal models
  protected readonly agreedToTerms = signal(false);
  protected readonly enableNotifications = signal(true);

  protected toggleTerms() {
    this.agreedToTerms.set(!this.agreedToTerms());
  }

  resetAll() {
    this.agreedToTerms.set(false);
    this.enableNotifications.set(false);
  }

}
