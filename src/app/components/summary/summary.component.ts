import { ChangeDetectionStrategy, Component, computed, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { calcCartItem, getTransportFee } from '../../utils/cart-utils';

@Component({
  selector: 'app-summary',
  standalone: false,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {
  @Input()
  items: any[] = [];

  @Input()
  vat: number = 0;

  summary = this.getSummary();

  ngOnChanges(changes: SimpleChanges): void {
    this.summary = this.getSummary();
  }

  getSummary() {
    console.log('getSummary');
    const summary = this.items.reduce((summ, item) => {
      const calculated = calcCartItem(item, this.vat);
      return {
        netTotal: summ.netTotal + calculated.discountedPrice,
        totalVat: summ.totalVat + calculated.vatAmount,
        totalWeight: summ.totalWeight + calculated.totalWeight,
        totalPrice: summ.totalPrice + calculated.totalPrice
      }
    }, {netTotal: 0, totalVat: 0, totalWeight: 0, totalPrice: 0});

    const transportFee = getTransportFee(summary.totalWeight);

    return {
      ...summary,
      transportFee
    }
  }
}

// @Component({
//   selector: 'app-summary',
//   standalone: false,
//   templateUrl: './summary.component.html',
//   styleUrl: './summary.component.css',
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class SummaryComponent {
//   items = input<any[]>([]);

//   vat = input(0);

//   summary = computed<any>(() => {
//     return this.getSummary(this.items(), this.vat());
//   })

//   protected getSummary(items: any[], vat: number) {
//     console.log('getSummary');
//     const summary = items.reduce((summ, item) => {
//       const calculated = calcCartItem(item, vat);
//       return {
//         netTotal: summ.netTotal + calculated.discountedPrice,
//         totalVat: summ.totalVat + calculated.vatAmount,
//         totalWeight: summ.totalWeight + calculated.totalWeight,
//         totalPrice: summ.totalPrice + calculated.totalPrice
//       }
//     }, {netTotal: 0, totalVat: 0, totalWeight: 0, totalPrice: 0});

//     const transportFee = getTransportFee(summary.totalWeight);

//     return {
//       ...summary,
//       transportFee
//     }
//   }
// }


