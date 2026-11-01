import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { Currency } from '../../../core/services/currency';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  imports: [FormsModule],
  templateUrl: './currency-converter.html',
  styleUrl: './currency-converter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyConverter {
  amount = signal(1000);
  currency = inject(Currency);
  selectedCurrency = signal<string>('USD');

  convertedAmount = computed(() => this.amount() * this.currency.rates()[this.selectedCurrency()]);

  constructor() {
    effect(() => console.log('Convertito €' + this.amount() + ' → ' + this.convertedAmount()));
  }
}
