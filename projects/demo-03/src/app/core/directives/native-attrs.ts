import { Directive, ElementRef, Renderer2, effect, inject, input } from '@angular/core';

export type NativeAttrRecord = Record<string, string | number | boolean | null | undefined>;

@Directive({
  selector: 'input[alcNativeAttrs], textarea[alcNativeAttrs], select[alcNativeAttrs]',
  // selector: '[alcNativeAttrs]',
})
export class NativeAttrs {
  readonly alcNativeAttrs = input<NativeAttrRecord>({});
  readonly #elementRef = inject(
    ElementRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  );
  readonly #renderer = inject(Renderer2);

  #previousKeys = new Set<string>();

  constructor() {
    effect(() => {
      this.applyAttrs(this.alcNativeAttrs());
    });
  }

  private applyAttrs(attrs: NativeAttrRecord): void {
    const element = this.#elementRef.nativeElement;
    const nextKeys = new Set(Object.keys(attrs));

    // Remove attributes that are no longer present
    for (const key of this.#previousKeys) {
      if (!nextKeys.has(key)) {
        this.#renderer.removeAttribute(element, key);
      }
    }

    // Add or update attributes based on the new values
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) {
        this.#renderer.removeAttribute(element, key);
        continue;
      }

      if (value === true) {
        this.#renderer.setAttribute(element, key, '');
        continue;
      }

      this.#renderer.setAttribute(element, key, String(value));
    }

    this.#previousKeys = nextKeys;
  }
}
