import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import {Router} from "@angular/router";

// import { MenuItems } from '../../shared/menu-items/menu-items';
//import { PublisherItems } from '../../shared/menu-items/publisher-items';
import { OnbManagerItems } from '../../shared/menu-items/onb_mgr-items';

@Component({
  selector: 'app-onb_mgr-vertical-sidebar',
  templateUrl: './onb_mgr-vertical-sidebar.component.html',
  styleUrls: []
})

export class OnbManagerSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;


  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>()


  private _mobileQueryListener: () => void;
  status = true;
  showMenu = '';
  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;
  acc_name = localStorage.getItem('acc_name');
  child_net_code = localStorage.getItem('child_net_code');
  mcm_status = localStorage.getItem('mcm_status');
  app_status = localStorage.getItem('app_status');
  video_status = localStorage.getItem('video_status');
  childnetmenu: boolean = false;
  childnetmenudash: boolean = false;
  ads_id = localStorage.getItem('ads_id');
  adsMenu: boolean = true;
  displayMenu: boolean = true;
  appMenu: boolean = false;
  videoMenu: boolean = false;
  keyIns_id = localStorage.getItem('anlytic_id');
  keyInsightsMenu: boolean = true;
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  subclickEvent(): void {
    this.status = true;
  }
  scrollToTop(): void {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: OnbManagerItems,
    private router : Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  getActiveDashboard(routePath: string) {
    if(this.router.url == routePath){
      return "selected";
    }
    return "";
  }

  getActiveInvite(routePath: string) {
    let url = this.router.url;
    const subUrlLink = url.split('/');

    if(this.router.url == routePath){
      return "selected";
    }

    if(subUrlLink[1] == "obm-admanager-invite-publisherdetails"){
      return "selected";
    }
    return "";
  }

  getActiveDomain(routePath: string) {
    let url = this.router.url;
    const subUrlLink = url.split('/');

    if(this.router.url == routePath){
      return "selected";
    }

    if(subUrlLink[1] == "obm-admanager-domain-publisherdetails"){
      return "selected";
    }
    return "";
  }

  getActiveApp(routePath: string) {
    let url = this.router.url;
    const subUrlLink = url.split('/');

    if(this.router.url == routePath){
      return "selected";
    }

    if(subUrlLink[1] == "obm-admanager-app-publisherdetails"){
      return "selected";
    }
    return "";
  }

  ngOnInit(): void {

    
  }
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  handleNotify(getCurrentURL: string) {

    if (window.innerWidth < 1024) {
      this.notify.emit(!this.showClass);
    }
  }
}
