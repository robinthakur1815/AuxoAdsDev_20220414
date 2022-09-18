import { Component, Inject, forwardRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { UiTourDirective } from '../ui-tour.directive';

@Component({
  selector: 'app-start-ui-tour',
  templateUrl: './start-ui-tour.component.html',
  styleUrls: ['./start-ui-tour.component.css']
})
export class StartUiTourComponent {
    tour_status = localStorage.getItem('tour_status');
    
  constructor(
    @Inject(forwardRef(() => UiTourDirective)) public tour: UiTourDirective,
    private overlayRef: OverlayRef
  ) {}
ngOnInit() : void { 
   // setTimeout(()=>{                           
   //                 this.start();
   //                 }, 3000); 
   //Tour status
            if(this.tour_status == '0'){
                 this.start();
            }else{
                 
            }
}
  start() {
    this.tour.start();
    this.overlayRef.dispose();
  }
}