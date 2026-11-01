import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Currency {

  private _rates = signal<Record<string, number>>
    ({
      USD: 1.08, GBP: 0.86, CHF: 0.95, JPY: 162.5
    });

  readonly rates = this._rates.asReadonly();
  
  readonly sortedRates = computed(
    () => Object
      .entries(this.rates())
      .sort(([a], [b]) => a.localeCompare(b))
  );
}
