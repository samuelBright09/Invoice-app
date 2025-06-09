import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../shared/interfaces/invoiceInterface';
import { InvoiceService } from '../../services/invoice.service';
import { DeleteModalComponentComponent } from "../delete-modal-component/delete-modal-component.component";
import { CommonModule } from '@angular/common';
import { NewInvoiceFormComponent } from '../new-invoice-form/new-invoice-form.component';

@Component({
  selector: 'app-view-invoice-component',
  imports: [DeleteModalComponentComponent, CommonModule, NewInvoiceFormComponent],
  templateUrl: './view-invoice-component.component.html',
  styleUrl: './view-invoice-component.component.scss'
})
export class ViewInvoiceComponentComponent implements OnInit {

  showDeleteModal = false;
  showEditForm = false;

  invoice: Invoice | undefined
  private invoiceService = inject(InvoiceService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('invoiceId');
    if (id) {
      this.invoiceService.getInvoice(id).subscribe((inv) => {
        if (inv) {
          // Map 'id' from data.json to 'invoiceId' for template compatibility
          if ((inv as any).id && !(inv as any).invoiceId) {
            (inv as any).invoiceId = (inv as any).id;
          }
        }
        this.invoice = inv;
      });
    }
  }

  onDeleteClick(): void {
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (!this.invoice?.invoiceId) return;
    this.invoiceService.deleteInvoice(this.invoice.invoiceId);

    this.router.navigate(['']);
    this.showDeleteModal = false;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  deleteInvoice(): void {
    if (!this.invoice?.invoiceId) return;
    const confirmed = confirm('Are you sure you want to delete this invoice?');
    if (confirmed) {
      this.invoiceService.deleteInvoice(this.invoice.invoiceId);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  editInvoice() {
    this.showEditForm = true;
  }

  onInvoiceUpdated(updated: Invoice) {
    this.invoiceService.updateInvoice(updated);
    this.invoice = updated;
    this.showEditForm = false;
  }

  markAsPaid(): void {
    if (!this.invoice) return;
    const updated = { ...this.invoice, status: 'paid' };
    this.invoiceService.updateInvoice(updated);
    this.invoice = updated;
  }
}
