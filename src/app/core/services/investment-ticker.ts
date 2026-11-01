import { computed, Injectable, signal } from '@angular/core';

interface StockPrice {
  symbol: string;
  price: number;
  delta: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvestmentTicker {
  // Stato privato — solo il servizio può scriverlo
  private readonly _prices = signal<Record<string, StockPrice>>({
    ENI: { symbol: 'ENI', price: 14.20, delta: 0 },
    ISP: { symbol: 'ISP', price: 3.10, delta: 0 },
    UCG: { symbol: 'UCG', price: 28.50, delta: 0 },
    STM: { symbol: 'STM', price: 42.80, delta: 0 },
    LDO: { symbol: 'LDO', price: 22.10, delta: 0 },
  });
  private readonly _lastError = signal<string | null>(null);

  // API pubblica read-only
  readonly pricesList = computed(() => Object.values(this._prices()));
  readonly lastError = computed(() => this._lastError());
  readonly hasError = computed(() => this._lastError() !== null);

  constructor() {
    // Simulazione feed real-time: aggiorna 1 prezzo a caso ogni secondo
    setInterval(() => this.simulateTick(), 1000);
  }

  private simulateTick(): void {
    const symbols = Object.keys(this._prices());
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const variation = (Math.random() - 0.5) * 0.4;   // ± €0.20

    this._prices.update(curr => {
      const old = curr[symbol];
      const newValue = Math.max(0, +(old.price + variation).toFixed(2));
      return {
        ...curr,                                      // nuovo oggetto contenitore
        [symbol]: { ...old, price: newValue, delta: +(newValue - old.price).toFixed(2) },
      };
    });
  }
}
