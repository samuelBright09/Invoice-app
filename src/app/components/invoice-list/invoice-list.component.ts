import { Component, inject, OnInit } from '@angular/core';
import { InvoiceCardComponent } from '../invoice-card/invoice-card.component';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../shared/interfaces/invoiceInterface';
import { InvoiceService } from '../../services/invoice.service';
import { FilterButtonComponentComponent } from "../filter-button-component/filter-button-component.component";
import { ButtonComponentComponent } from "../button-component/button-component.component";
import { NewInvoiceFormComponent } from "../new-invoice-form/new-invoice-form.component";
import { Router } from '@angular/router';
import { EmptyInvoiceComponent } from '../empty-invoice/empty-invoice.component';

@Component({
  selector: 'app-invoice-list',
  imports: [InvoiceCardComponent, CommonModule, FilterButtonComponentComponent, ButtonComponentComponent, NewInvoiceFormComponent, EmptyInvoiceComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  private invoiceService = inject(InvoiceService);
  private router = inject(Router);
  showNewInvoiceForm = false;
  selectedStatuses: string[] = ['pending'];

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  openNewInvoiceForm() {
    this.showNewInvoiceForm = true;
  }

  closeNewInvoiceForm() {
    this.showNewInvoiceForm = false;
  }

  onInvoiceCreated(invoice: Invoice) {
    this.invoiceService.addInvoice(invoice).subscribe(() => {
      this.invoiceService.getInvoices().subscribe(invoices => {
        this.invoices = invoices;
        this.router.navigate(['/']);
      });
    });
  }

  viewInvoiceDetails(invoiceId: string) {
    this.router.navigate(['/invoice', invoiceId]);
  }

  get filteredInvoices(): Invoice[] {
    if (!this.selectedStatuses.length) return this.invoices;
    return this.invoices.filter(inv => this.selectedStatuses.includes(inv.status));
  }

  onStatusChange(statuses: string[]) {
    this.selectedStatuses = statuses;
  }
}
