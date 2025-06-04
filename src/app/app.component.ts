import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { EmptyInvoiceComponent } from "./components/empty-invoice/empty-invoice.component";
// import { InvoiceCardComponent } from './components/invoice-card/invoice-card.component';
// import { ViewInvoiceComponentComponent } from "./components/view-invoice-component/view-invoice-component.component";
// import { NewInvoiceFormComponent } from "./components/new-invoice-form/new-invoice-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponentComponent, EmptyInvoiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'invoice-app';
}
