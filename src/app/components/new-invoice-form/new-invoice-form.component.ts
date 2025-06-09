import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponentComponent } from '../button-component/button-component.component';

@Component({
  selector: 'app-new-invoice-form',
  imports: [ReactiveFormsModule,  CommonModule, ButtonComponentComponent],
  templateUrl: './new-invoice-form.component.html',
  styleUrl: './new-invoice-form.component.scss'
})
export class NewInvoiceFormComponent implements OnChanges {
  @Input() invoice: any;
  @Output() invoiceCreated = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Input() isEdit: boolean = false;
  invoiceForm: FormGroup;

  @ViewChild('formElement') formElement!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      senderStreet: ['', Validators.required],
      senderCity: ['', Validators.required],
      senderPostCode: ['', Validators.required],
      senderCountry: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreet: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientPostCode: ['', Validators.required],
      clientCountry: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      paymentTerms: [30, Validators.required],
      projectDescription: ['', Validators.required],
      items: this.fb.array([])
    });
    this.addItem();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invoice'] && this.invoice) {
      this.patchForm(this.invoice);
    }
  }

  patchForm(invoice: any) {
    this.invoiceForm.patchValue({
      senderStreet: invoice.senderAddress?.street || '',
      senderCity: invoice.senderAddress?.city || '',
      senderPostCode: invoice.senderAddress?.postCode || '',
      senderCountry: invoice.senderAddress?.country || '',
      clientName: invoice.clientName || '',
      clientEmail: invoice.clientEmail || '',
      clientStreet: invoice.clientAddress?.street || '',
      clientCity: invoice.clientAddress?.city || '',
      clientPostCode: invoice.clientAddress?.postCode || '',
      clientCountry: invoice.clientAddress?.country || '',
      invoiceDate: invoice.createdAt ? invoice.createdAt.substring(0, 10) : '',
      paymentTerms: invoice.paymentTerms || 30,
      projectDescription: invoice.description || ''
    });
    // Clear and set items
    this.items.clear();
    if (invoice.items && invoice.items.length) {
      invoice.items.forEach((item: any) => {
        this.items.push(this.fb.group({
          name: [item.name, Validators.required],
          quantity: [item.quantity, [Validators.required, Validators.min(1)]],
          price: [item.price, [Validators.required, Validators.min(0.01)]]
        }));
      });
    } else {
      this.addItem();
    }
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  closeNewInvoiceForm() {
    this.close.emit();
  }

  submitInvoice(isDraft: boolean = false) {
    if (this.invoiceForm.valid) {
      const formData = this.invoiceForm.value;
      const total = formData.items.reduce((acc: number, item: any) => acc + item.quantity * item.price, 0);

      // Calculate payment due date
      const invoiceDate = new Date(formData.invoiceDate);
      const paymentDue = new Date(invoiceDate);
      paymentDue.setDate(invoiceDate.getDate() + Number(formData.paymentTerms));

      const invoice = {
        ...formData,
        senderAddress: {
          street: formData.senderStreet,
          city: formData.senderCity,
          postCode: formData.senderPostCode,
          country: formData.senderCountry
        },
        clientAddress: {
          street: formData.clientStreet,
          city: formData.clientCity,
          postCode: formData.clientPostCode,
          country: formData.clientCountry
        },
        description: formData.projectDescription,
        total,
        status: isDraft ? 'draft' : (this.invoice && this.invoice.status ? this.invoice.status : 'pending'),
        createdAt: formData.invoiceDate,
        invoiceId: this.invoice && this.invoice.invoiceId ? this.invoice.invoiceId : this.generateInvoiceId(),
        paymentDue: paymentDue.toISOString(),
        items: formData.items
      };
      this.invoiceCreated.emit(invoice);
      this.close.emit();
    }
  }

  private generateInvoiceId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let id = '';
    
    // Generate 2 random letters
    for (let i = 0; i < 2; i++) {
      id += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    // Generate 4 random numbers
    for (let i = 0; i < 4; i++) {
      id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return id;
  }

  onOverlayClick(event: MouseEvent) {
    // Close if the click is outside the form content itself
    if (this.formElement && !this.formElement.nativeElement.contains(event.target)) {
      this.closeNewInvoiceForm();
    }
  }
}
