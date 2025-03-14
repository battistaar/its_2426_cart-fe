import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';

export type ProductFilterEvent = {
  name: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}

@Component({
  selector: 'app-product-filter',
  standalone: false,
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  protected fb = inject(FormBuilder);

  filters = this.fb.group({
    name: new FormControl<string | null>(''),
    minPrice: new FormControl<number | null>(null,{updateOn: 'submit', validators: [Validators.min(0)]}),
    maxPrice: new FormControl<number | null>(null, {updateOn: 'submit', validators: [Validators.min(0)]})
  });

  @Output()
  filterChange = new EventEmitter<ProductFilterEvent>();

  protected destroyed$ = new Subject<void>();

  ngOnInit() {
    this.filters.valueChanges
      .pipe(
        filter(_ => this.filters.valid),
        takeUntil(this.destroyed$)
      )
      .subscribe(filterValue => {
        this.filterChange.next(filterValue as ProductFilterEvent);
      });
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }
}
