import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [NgStyle, CommonModule],
  templateUrl: './button-component.component.html',
  styleUrl: './button-component.component.scss'
})
export class ButtonComponentComponent {
  @Input() text: string = 'Click';
  @Input() icon?: string;
  @Input() bgColor: string = '#6c63ff';
}
