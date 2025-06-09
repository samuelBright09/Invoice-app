import { Routes } from '@angular/router';
import { ViewInvoiceComponentComponent } from './components/view-invoice-component/view-invoice-component.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';



export const routes: Routes = [
    {path: '', component: InvoiceListComponent},
    {path: 'invoice/:invoiceId', component: ViewInvoiceComponentComponent},
];
