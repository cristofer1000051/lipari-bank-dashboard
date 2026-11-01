import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { InvestmentTicker } from '../../../core/services/investment-ticker';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-ticker-widget',
  imports: [FormsModule],
  templateUrl: './ticker-widget.html',
  styleUrl: './ticker-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TickerWidget {
  readonly prices = signal([
    { symbol: 'AAPL', price: 200, delta: 1.5 },
    { symbol: 'MSFT', price: 450, delta: -0.8 },
    { symbol: 'GOOG', price: 180, delta: 2.1 }
  ]);
  protected readonly ticker = inject(InvestmentTicker);

  // UI state locale
  readonly filter = signal('');
  readonly onlyMovers = signal(false);

  sortBy = signal<'symbol' | 'price' | 'delta'>('symbol');

  sortedPrices = computed(() =>
    [...this.prices()].sort((a, b) => {
      switch (this.sortBy()) {
        case 'symbol':
          return a.symbol.localeCompare(b.symbol);

        case 'price':
          return a.price - b.price;

        case 'delta':
          return a.delta - b.delta;

        default:
          return 0;
      }
    })
  );

  // ViewModel: combina domain state + UI state
  readonly viewModel = computed(() => {
    const text = this.filter().toUpperCase().trim();
    let items = this.ticker.pricesList();
    if (text) items = items.filter(p => p.symbol.includes(text));
    if (this.onlyMovers()) items = items.filter(p => p.delta !== 0);
    return items;
  });

  // Normalizzazione alla sorgente — niente effect che scrive su filter
  onFilterChange(text: string): void {
    this.filter.set(text);
  }
}
