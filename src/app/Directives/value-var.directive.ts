import {Directive, ElementRef, Renderer2, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appValueVar]',
  exportAs: 'valueVar'
})
export class ValueVarDirective  {
  @Input() public appValueVar:boolean = false
  
  constructor() {
  }
 

}
