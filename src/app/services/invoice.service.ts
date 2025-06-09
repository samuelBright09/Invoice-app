import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Invoice } from '../shared/interfaces/invoiceInterface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly INV_URL = 'assets/data/data.json';
  private readonly localStorageKey = 'invoices';
  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
  public invoices$ = this.invoicesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInvoices();
  }

  private loadInvoices(): void {
    const storedInvoices = localStorage.getItem(this.localStorageKey);
    if (storedInvoices) {
      this.invoicesSubject.next(JSON.parse(storedInvoices));
      console.log('📦 Invoices loaded from local storage.');
    } else {
      this.fetchInvoicesFromJSON();
    }
  }

  private fetchInvoicesFromJSON(): void {
    console.log('📡 Fetching invoices from JSON...');
    this.http.get<Invoice[]>(this.INV_URL).pipe(
      catchError(error => {
        console.error('🔥 Error fetching invoices:', error);
        return throwError(() => error);
      })
    ).subscribe(invoices => {
      this.invoicesSubject.next(invoices);
      this.saveInvoicesToLocalStorage(invoices);
    });
  }

  private saveInvoicesToLocalStorage(invoices: Invoice[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(invoices));
    console.log('💾 Invoices saved to local storage.');
  }

  getInvoices(): Observable<Invoice[]> {
    return this.invoices$;
  }

  getInvoice(invoiceId: string): Observable<Invoice | undefined> {
    return this.invoices$.pipe(
      map(invoices => invoices.find(invoice => invoice.invoiceId === invoiceId))
    );
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    const currentInvoices = this.invoicesSubject.getValue();
    const updatedInvoices = [...currentInvoices, invoice];
    this.invoicesSubject.next(updatedInvoices);
    this.saveInvoicesToLocalStorage(updatedInvoices);
    return of(invoice);
  }

  updateInvoice(updated: Invoice): Observable<Invoice> {
    const currentInvoices = this.invoicesSubject.getValue();
    const updatedInvoices = currentInvoices.map(inv =>
      inv.invoiceId === updated.invoiceId ? updated : inv
    );
    this.invoicesSubject.next(updatedInvoices);
    this.saveInvoicesToLocalStorage(updatedInvoices);
    return of(updated);
  }

  deleteInvoice(invoiceId: string): void {
    const currentInvoices = this.invoicesSubject.getValue();
    const updatedInvoices = currentInvoices.filter(inv => inv.invoiceId !== invoiceId);
    this.invoicesSubject.next(updatedInvoices);
    this.saveInvoicesToLocalStorage(updatedInvoices);
  }
}
