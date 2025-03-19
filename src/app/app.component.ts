import { Component, inject, OnInit } from '@angular/core';
import { VatService } from './services/vat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected vatSrv = inject(VatService);

  ngOnInit() {
    this.vatSrv.setCountry('IT');
  }
}
