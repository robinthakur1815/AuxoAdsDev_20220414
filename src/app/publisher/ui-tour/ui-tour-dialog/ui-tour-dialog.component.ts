import { Component, OnInit, OnDestroy, Inject, forwardRef, ViewEncapsulation } from '@angular/core';
// import { matDialogAnimations } from '@angular/material';

import { UI_TOUR_STEP_DATA, UiTourStep } from '../steps';
import { UiTourDirective } from '../ui-tour.directive';
import { SafeTourService } from './ui-tour-dialog.service';
declare var $: any;

@Component({
  selector: 'app-ui-tour-dialog',
  templateUrl: './ui-tour-dialog.component.html',
  styleUrls: ['./ui-tour-dialog.component.css'],
  // animations: [matDialogAnimations.slideDialog],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-tour-dialog',
    '[@slideDialog]': '_state',
  },
})
export class UiTourDialogComponent implements OnInit, OnDestroy {
  _state: 'void' | 'enter' | 'exit' = 'enter';

  backdropElement;
  stepText: string;
  srcImage: string;
  gotit: boolean=false;
  nextit: boolean=true;
  /** */
  get stepEl(): HTMLElement {
    return this.step.el.nativeElement;
  }

  constructor(
    @Inject(UI_TOUR_STEP_DATA) public step: UiTourStep, 
    @Inject(forwardRef(() => UiTourDirective)) private uiTour: UiTourDirective,private _tourService:SafeTourService
  ) {}

  // TODO: add backdrop to step element to use same stacking context. Masks are unreliable.

  ngOnInit() {
    $("body").css('pointer-events', 'none');
    this.attachBackdrop();
    this.toggle();
  
    if(this.step.content == '1'){
      this.srcImage ="assets/images/users/tour1.png";
      this.stepText = "You can click on graphs for further drilldown analysis.";
    }
    if(this.step.content == '2'){
      this.srcImage ="assets/images/users/tour2.png";
      this.stepText = "Click the colored options below the graph to analyze specific segments.";
      
    }
    if(this.step.content == '3'){
      this.srcImage ="assets/images/users/tour3.png";
      this.stepText = "Download reports corresponding to the graphs.";
      this.nextit = false;
      this.gotit = true;
    }
  }

  ngOnDestroy() {
    this.detachBackdrop();
    this.toggle();
  }

  private toggle() {
    this.stepEl.classList.toggle('highlight')
  }

  /**
   * We create backdrop here so it uses correct stacking context. Otherwise highlighting step element is problwematic.
   */
  private attachBackdrop() {
    this.backdropElement = document.createElement('div');
    this.backdropElement.classList.add('cdk-overlay-backdrop', 'cdk-overlay-dark-backdrop', 'cdk-overlay-backdrop-showing');

    this.stepEl.parentElement.insertBefore(this.backdropElement, this.stepEl);

    


  }

  private detachBackdrop() {
    if (this.backdropElement && this.backdropElement.parentNode) {
      this.backdropElement.parentNode.removeChild(this.backdropElement);
    }
  }

  prev() {
    this.uiTour.prev();
  }

  next() {
   
    this.uiTour.next();
 }
  onNoClick() {
    //api
         this._tourService.updtTour(localStorage.getItem('uniq_id'))
            .subscribe(dataResult => {
             
                if(dataResult['status_code']=='200'){
                  $("body").css('pointer-events', '');
                    localStorage.setItem('tour_status', '1');
                }
                
            });
    this.uiTour.close();
  }
  onNoClick1() {
    $("body").css('pointer-events', '');
   this.uiTour.close();
  }

}