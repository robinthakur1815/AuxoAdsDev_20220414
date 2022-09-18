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
import { PublisherItems } from '../../shared/menu-items/publisher-items';

@Component({
  selector: 'app-publisher-vertical-sidebar',
  templateUrl: './publisher-vertical-sidebar.component.html',
  styleUrls: []
})

export class PublisherSidebarComponent implements OnDestroy {
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
  display_status = localStorage.getItem('display_status');
  pro_status = localStorage.getItem('pro_status');
  role_id = localStorage.getItem('role_id');
  childnetmenu: boolean = false;
  childnetmenudash: boolean = false;
  ads_id = localStorage.getItem('ads_id');
  adsMenu: boolean = true;
  displayMenu: boolean = false;
  appMenu: boolean = false;
  videoMenu: boolean = false;
  roleMenu: boolean = false;
  roleExeMenu: boolean = false;
  roleEditiorMenu: boolean = false;
  keyIns_id = localStorage.getItem('anlytic_id');
  keyInsightsMenu: boolean = true;
  networkMenu: boolean = false;
  auxoNetworkMenu: boolean = true;
  auxoProMenu: boolean = false;
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
    public menuItems: PublisherItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  ngOnInit(): void {

    if ((this.child_net_code == null || this.child_net_code == "null")) {
      this.childnetmenu = true;
      if ((this.mcm_status == "invite" || this.mcm_status == "Invite")) {
        this.childnetmenudash = true;
      } else {
        this.childnetmenudash = false;
      }
    } else {
      this.childnetmenu = false;
    }
    
    if (this.ads_id == null || this.ads_id == "null" || this.ads_id == 'ca-') {
      this.adsMenu = false;
    }
    if (this.display_status == "1") {
      this.displayMenu = true;
    }
    if (this.app_status == "1") {
      this.appMenu = true;
    }
    if (this.video_status == "1") {
      this.videoMenu = true;
    }
    if (this.pro_status == "1") {
      
      this.auxoProMenu = true;
    }
    if(this.display_status == "0" && this.app_status == "0" && this.video_status == "0"){
      this.auxoNetworkMenu = false;
    }
    if (this.keyIns_id == null || this.keyIns_id == "null" || this.keyIns_id == "NULL" || this.keyIns_id == "") {

      this.keyInsightsMenu = false;

    }

    if (this.role_id == '12') {
      this.roleMenu = true;
    }
    if (this.role_id == '13') {
      this.roleExeMenu = true;
    }
    if (this.role_id == '14') {
      this.roleEditiorMenu = true;
    }
    if (this.role_id == '6') {
      this.networkMenu = true;
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
