import {Component, Inject, Input, OnInit} from '@angular/core';
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
  @Input('position') public position:string = 'top';

  constructor(@Inject(DOCUMENT) public document: Document) { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log('position', this.position)
      const parent = document.getElementById(this.idParent);
      const tooltip = document.getElementById(this.idTooltip);
      
      if (parent && tooltip) {
        
        // Add with styles
        tooltip.style.width = `${this.width}px`;
        tooltip.style.maxWidth = `${this.maxWidth}px`;
        tooltip.style.minWidth = `${this.minWidth}px`;
        
        const coordsParent = parent.getBoundingClientRect();
        const coordsTooltip = tooltip.getBoundingClientRect();
        console.log('coordsParent', coordsParent);
        console.log('coordsTooltip', coordsTooltip);
        
        //Set left coordonate in order to center tooltip inside parent
        const widthParent = coordsParent.width
        let left = ((widthParent - this.width) / 2) + coordsParent.left;

        // Set top coordonate in order to center tooltip inside parent
        const heightTooltip = tooltip.clientHeight;
        console.log('heightTooltip', heightTooltip);
        const heightParent = coordsParent.height
        let top;
        if (heightParent > heightTooltip) {
          top = ((heightParent - heightTooltip) / 2) + coordsParent.top;
        } else {
          console.log('AA')
          top = (coordsParent.top - ((heightTooltip - heightParent) / 2));
        }

        // Set basic position
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.border = '2px red solid';
  
        // const tooltipTransform = document.getElementById(this.idTooltip);
        // console.log('tooltipTransform', tooltipTransform);
        // const coordsTooltipTransform = tooltip.getBoundingClientRect();
        // console.log('coordsTooltipTransform', coordsTooltipTransform);
        
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
            console.log('left', left);
            left = coordsParent.left - coordsTooltip.width - 30;
            tooltip.style.left = `${left}px`;
            console.log('position left');
            break;
          case 'right':
            left = coordsParent.left + widthParent + 30;
            tooltip.style.left = `${left}px`;
            console.log('position right');
            break;
        }
      }
    }, 100)
  }

}
