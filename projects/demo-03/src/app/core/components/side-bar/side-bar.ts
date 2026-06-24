import { Component, computed, input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'alc-side-bar',
  imports: [],
  template: `
    <div class="icons" (click)="toggle()">
      @if (isOpen()) {
        <svg
          id="close-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          [attr.width]="size()"
          [attr.height]="size()"
          fill="currentColor"
        >
          <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
          <path
            d="M144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144C151.2 144 144 151.2 144 160L144 480zM160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544zM224 320C224 313.3 226.8 307 231.7 302.4L343.7 198.4C350.7 191.9 360.9 190.2 369.6 194C378.3 197.8 384 206.5 384 216L384 424C384 433.5 378.3 442.2 369.6 446C360.9 449.8 350.7 448.1 343.7 441.6L231.7 337.6C226.8 333.1 224 326.7 224 320z"
          />
        </svg>
      } @else {
        <svg
          id="open-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          [attr.width]="size()"
          [attr.height]="size()"
          fill="currentColor"
        >
          <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
          <path
            d="M496 160C496 151.2 488.8 144 480 144L160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160zM480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96zM416 320C416 326.7 413.2 333 408.3 337.6L296.3 441.6C289.3 448.1 279.1 449.8 270.4 446C261.7 442.2 256 433.5 256 424L256 216C256 206.5 261.7 197.8 270.4 194C279.1 190.2 289.3 191.9 296.3 198.4L408.3 302.4C413.2 306.9 416 313.3 416 320z"
          />
        </svg>
      }
    </div>
    @if (isOpen()) {
      <div class="content">
        <ng-content />
      </div>
    }
  `,
  styles: `
    :host {
      background-color: var(--color-background-primary);
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: fit-content;
      height: 100%;
      &:has(#open-icon) {
        width: 50px;
      }
    }
    .icons {
      background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
      color: var(--color-primary);
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .content {
      padding-inline-start: 2rem;
      padding-inline-end: 3rem;
    }
  `,
})
export class SideBar {
  readonly isOpenFromParent = input<WritableSignal<boolean>>();
  protected readonly isOpen = computed(() => this.isOpenFromParent()?.() ?? false);
  protected readonly size = signal('3rem');

  protected toggle(): void {
    this.isOpenFromParent()?.set(!this.isOpen());
  }
}
