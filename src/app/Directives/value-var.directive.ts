import {Directive, ElementRef, Renderer2, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appValueVar]',
  exportAs: 'valueVar'
})
export class ValueVarDirective implements OnInit {
  @Input() public appValueVar:boolean = false
  
  constructor(private renderer: Renderer2,
              private elmRef: ElementRef) {
    
    
  }
  ngOnInit() {
  }

}
