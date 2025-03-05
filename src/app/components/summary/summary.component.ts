import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { calcCartItem, getTransportFee } from '../../utils/cart-utils';

@Component({
  selector: 'app-summary',
  standalone: false,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {
  @Input({ required: true })
  items: any[] = [];

  @Input({ transform: (val: number | null) => val ? val : 0})
  vat: number = 0;

  summary = this.calcSummary();

  ngOnChanges(changes: SimpleChanges): void {
    this.summary = this.calcSummary();
  }

  protected calcSummary() {
    const summary = {
      netTotal: 0,
      totalVat: 0,
      totalPrice: 0,
      transportFee: 0
    };

    let weight = 0;

    if (!this.items) {
      return summary;
    }

    for(const item of this.items) {
      const cItem = calcCartItem(item, this.vat);
      summary.netTotal += cItem.discountedPrice;
      summary.totalVat += cItem.vatAmount;
      summary.totalPrice += cItem.totalPrice;
      weight += cItem.totalWeight
    }

    summary.transportFee = getTransportFee(weight);

    return summary;
  }

  // sumProperty(property: string): number {
  //   let total = 0;
  //   for (const item of this.items) {
  //     const cItem = calcCartItem(item, this.vat);
  //     total += cItem[property];
  //   }
  //   return total;
  // }

  // netTotal(): number {
  //   return this.sumProperty('discountedPrice');
  // }

  // totalVat(): number {
  //   return this.sumProperty('vatAmount');
  // }
}
