import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-button-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-button-component.component.html',
  styleUrl: './filter-button-component.component.scss',
})
export class FilterButtonComponentComponent {
  dropdownOpen = false;

  statuses = [
    { label: 'Draft', value: 'draft', checked: false },
    { label: 'Pending', value: 'pending', checked: true },
    { label: 'Paid', value: 'paid', checked: false },
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
