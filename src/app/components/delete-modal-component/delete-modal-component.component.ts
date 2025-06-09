import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal-component',
  imports: [],
  templateUrl: './delete-modal-component.component.html',
  styleUrl: './delete-modal-component.component.scss'
})
export class DeleteModalComponentComponent {
  @Input() invoiceId!: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
