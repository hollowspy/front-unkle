import {Component, Inject, Input, OnInit, SimpleChanges} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements OnInit {
  
  @Input('idParent') public idParent:string = '';
  @Input('idTooltip') public idTooltip:string = '';
  @Input('width') public width:number = 0;
  @Input('minWidth') public minWidth:number = 0;
  @Input('maxWidth') public maxWidth:number = 0;
  @Input('content') public content:string = '';
  @Input('position') public position:string = '';
  @Input('display') public display:boolean = false

  constructor(@Inject(DOCUMENT) public document: Document) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(simple:SimpleChanges) {
    if (simple && simple['display'] && !simple['display'].currentValue) {
      const tooltip = document.getElementById(this.idTooltip);
      if (tooltip) {
        tooltip.remove()
      }
    } else {
      const wrapperTooltip = document.createElement('div');
      wrapperTooltip.classList.add('wrapper-tooltip');
      wrapperTooltip.setAttribute('id', this.idTooltip);
      wrapperTooltip.innerHTML = this.content;
      wrapperTooltip.style.backgroundColor = '#575656';
      wrapperTooltip.style.padding = '5px';
      wrapperTooltip.style.color = 'white';
      wrapperTooltip.style.borderRadius = '3px';
      wrapperTooltip.style.display = 'none';
      document.body.appendChild(wrapperTooltip);
      this.initTooltip()
    }
  }
  
  
  private initTooltip() {
    setTimeout(() => {
      const parent = document.getElementById(this.idParent);
      const tooltip = document.getElementById(this.idTooltip);
    
      if (parent && tooltip) {
        // Add with styles
        tooltip.style.display = (this.display) ? 'block' : 'none';
        // tooltip.style.display = 'block'
        tooltip.style.width = `${this.width}px`;
        tooltip.style.maxWidth = `${this.maxWidth}px`;
        tooltip.style.minWidth = `${this.minWidth}px`;
      
        const bodyRect = document.body.getBoundingClientRect();
        const coordsParent = parent.getBoundingClientRect();
      
        const coordsTooltip = tooltip.getBoundingClientRect();
      
      
        //Set left coordonate in order to center tooltip inside parent
        const widthParent = coordsParent.width
        let left = ((widthParent - this.width) / 2) + coordsParent.left;
      
      
        // Set top coordonate in order to center tooltip inside parent
        const heightTooltip = tooltip.clientHeight;
        const heightParent = coordsParent.height
        let top;
        if (heightParent > heightTooltip) {
          top = ((heightParent - heightTooltip) / 2) + ((coordsParent.top - bodyRect.top) - bodyRect.top);
        } else {
          top = ((coordsParent.top - bodyRect.top) - ((heightTooltip - heightParent) / 2));
        }
      
        // Set basic position
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      
      
        //Set good position thanks position attribute
        switch (this.position) {
          case 'top':
            if (heightParent > heightTooltip) {
              top = top - heightParent - 10;
            } else {
              top = top - coordsTooltip.height;
            }
            tooltip.style.top = `${top}px`;
            break;
          case 'bottom':
            if (heightParent > heightTooltip) {
              top = top + heightParent + 10;
            } else {
              top = top + coordsTooltip.height;
            }
            tooltip.style.top = `${top}px`;
            break;
          case 'left':
            left = coordsParent.left - coordsTooltip.width - 30;
            tooltip.style.left = `${left}px`;
            break;
          case 'right':
            left = coordsParent.left + widthParent + 30;
            tooltip.style.left = `${left}px`;
            break;
        }
      }
    }, 0)
  }

}
