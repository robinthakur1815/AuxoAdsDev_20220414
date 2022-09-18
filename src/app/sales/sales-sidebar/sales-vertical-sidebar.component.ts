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


// import { MenuItems } from '../../shared/menu-items/menu-items';
//import { PublisherItems } from '../../shared/menu-items/publisher-items';
import { SalesItems } from '../../shared/menu-items/sales-items';
import {Router} from "@angular/router";
@Component({
  selector: 'app-sales-vertical-sidebar',
  templateUrl: './sales-vertical-sidebar.component.html',
  styleUrls: []
})

export class SalesSidebarComponent implements OnDestroy {
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
  child_net_code = localStorage.getItem('child_net_code');
  childnetmenu: boolean = false;
  childnetmenudash: boolean = false;
  role_id = localStorage.getItem('role_id');
  salesuserMenu: boolean = false;
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
    private router : Router,
    public menuItems: SalesItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  getActiveUserRole(routePath: string) {
    let url = this.router.url;
    const subUrlLink = url.split('/');

    if(this.router.url == routePath){
      return "selected";
    }

    if(subUrlLink[2] == "central-detailed-dashboard"){
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

    if(subUrlLink[1] == "admanager-invite-publisherdetails"){
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

    if(subUrlLink[1] == "admanager-domain-publisherdetails"){
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

    if(subUrlLink[1] == "admanager-app-publisherdetails"){
      return "selected";
    }
    return "";
  }
  ngOnInit(): void {
    if(this.role_id == "7"){
      
      this.salesuserMenu = true;
    }
    
  }
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  handleNotify() {
    if (window.innerWidth < 1024) {
      this.notify.emit(!this.showClass);
    }
  }
}
