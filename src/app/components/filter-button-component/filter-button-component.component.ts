import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-button-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-button-component.component.html',
  styleUrl: './filter-button-component.component.scss',
})
export class FilterButtonComponentComponent implements OnInit {
  @Output() statusChange = new EventEmitter<string[]>();
  dropdownOpen = false;

  statuses = [
    { label: 'Draft', value: 'draft', checked: false },
    { label: 'Pending', value: 'pending', checked: false },
    { label: 'Paid', value: 'paid', checked: false },
  ];

  constructor(private eRef: ElementRef) {}

  ngOnInit() {
    this.onStatusChange();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onStatusChange() {
    const selected = this.statuses.filter(s => s.checked).map(s => s.value);
    this.statusChange.emit(selected);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.dropdownOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
