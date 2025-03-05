import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VatService {
  protected _vat$ = new BehaviorSubject<number>(0);
  vat$ = this._vat$.asObservable();

  setCountry(countryCode: string) {
    const vat = countryCode === 'IT' ? 0.22 : 0;
    this._vat$.next(vat);
  }

}
