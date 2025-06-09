import { Component, inject, Input } from '@angular/core';
import { Invoice } from '../../shared/interfaces/invoiceInterface';
import { Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-invoice-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss'
})
export class InvoiceCardComponent {
@Input() invoice!: Invoice

private router = inject(Router)

viewInvoice(): void {
  this.router.navigate(['invoice', this.invoice.invoiceId]);
}


}
