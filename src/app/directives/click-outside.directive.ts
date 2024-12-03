import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() public clickedOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    this.clickedOutside.emit(event);
  }
}

