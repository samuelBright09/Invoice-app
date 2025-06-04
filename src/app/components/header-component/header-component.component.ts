import { Component } from '@angular/core';
import { FilterButtonComponentComponent } from "../filter-button-component/filter-button-component.component";
// import { ButtonComponentComponent } from "../button-component/button-component.component";

@Component({
  selector: 'app-header-component',
  imports: [FilterButtonComponentComponent],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss'
})
export class HeaderComponentComponent {

}
