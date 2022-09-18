
import { MediaMatcher } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy


} from '@angular/core';
import { AccManagerItems } from '../shared/menu-items/acc_mgr-items';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

/** @title Responsive sidenav */
@Component({
  selector: 'app-acc_mgr-layout',
  templateUrl: 'acc_mgr.component.html',
  styleUrls: []
})
export class AccManagerComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green = false;
  blue = false;
  dark = false;
  minisidebar = false; 
  boxed = false;
  danger = false;
  showHide = false;
  horizontal = false;
  url = '';
  sidebarOpened = false;
  status = false;

  public showSearch = false;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;
  pageInfo: Data = Object.create(null);
  clickEvent() {
    this.status = !this.status;
  }


  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: AccManagerItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1023px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);

    //header title
     this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });
    
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    
  }


  // Mini sidebar
}
