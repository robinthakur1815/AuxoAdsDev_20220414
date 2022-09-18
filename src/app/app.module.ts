
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular-highcharts';

import {  NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
//import { mailService, mailGlobalVariable } from './apps/mailbox/mail.service';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter, AlignJustify, AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown, ArrowDownCircle, ArrowDownLeft, ArrowDownRight, ArrowLeftCircle, ArrowLeft, ArrowRight, ArrowRightCircle, ArrowUp, ArrowUpCircle, ArrowUpLeft, ArrowUpRight, AtSign, Award, BarChart2, BarChart, BatteryCharging, Battery, BellOff, Bell, Bluetooth, Bold, BookOpen, Book, Bookmark, Box, Briefcase, Calendar, CameraOff, Cast, CheckCircle, CheckSquare, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Chrome, Circle, Clipboard, Clock, CloudDrizzle, CloudLightning, CloudOff, CloudRain, Cloud, CloudSnow, Code, Codepen, Codesandbox, Coffee, Columns, Command, Compass, Copy, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete, Disc, DollarSign, DownloadCloud, Download, Droplet, Edit, Edit2, Edit3, ExternalLink, EyeOff, Eye, Facebook, FastForward, Feather, Figma, FileMinus, FilePlus, FileText, File, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch, GitCommit, GitMerge, GitPullRequest, Gitlab, Globe, Grid, HardDrive, Hash, Headphones, HelpCircle, Hexagon, Home, MoreHorizontal, Image, Inbox, Info, Instagram, Italic, Key, Layers, Layout, LifeBuoy, Link, Link2, Linkedin, List, Loader, Lock, LogIn, LogOut, Mail, MapPin, Map, Maximize, Maximize2, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2, MinusCircle, MinusSquare, Minus, Monitor, Moon, MoreVertical, MousePointer, Move, Music, Navigation, Navigation2, Octagon, Package, Paperclip, PauseCircle, Pause, PenTool, Percent, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, Phone, PhoneOff, PhoneOutgoing, PieChart, Play, PlayCircle, Plus, PlusCircle, PlusSquare, Pocket, Power, Printer, Radio, RefreshCcw, RefreshCw, Repeat, Rewind, RotateCcw, RotateCw, Rss, Save, Scissors, Search, Send, Server, Settings, Share, Share2, Shield, ShieldOff, ShoppingBag, ShoppingCart, Shuffle, Sidebar, SkipBack, SkipForward, Slack, Slash, Sliders, Smartphone, Smile, Speaker, Square, Star, StopCircle, Sun, Sunrise, Sunset, Tablet, Tag, Target, Terminal, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight, Tool, Trash, Trash2, Trello, TrendingDown, TrendingUp, Triangle, Truck, Tv, Twitch, Twitter, Type, Umbrella, Underline, Unlock, Upload, UploadCloud, User, UserCheck, UserMinus, UserPlus, UserX, Users, Video, VideoOff, Voicemail, Volume, Volume1, Volume2, VolumeX, Watch, Wifi, WifiOff, Wind, XCircle, XOctagon, XSquare, X, Youtube, Zap, ZapOff, ZoomIn, ZoomOut } from 'angular-feather/icons';
// import { BankdetailComponent } from './bankdetail/bankdetail.component';
/****publisher Role*****/
import { DateRangePickerComponent } from './publisher/daterangepicker/daterangepicker.component';
import { AppBreadcrumbComponent } from './publisher/breadcrumb/breadcrumb.component';
import { PublisherComponent } from './publisher/publisher.component';
import {PublisherSidebarComponent} from './publisher/publisher-sidebar/publisher-vertical-sidebar.component';
import {PublisherHorizontalSidebarComponent} from './publisher/publisher-horizontal-sidebar/publisher-horizontal-sidebar.component';
import { PublisherAppHeaderComponent,PublisherAppHeaderDialogComponent } from './publisher/publisher-vertical-header/publisher-vertical-header.component';
/****publisher Role end*****/
/****ONB Manager Role*****/
import { OnbManagerComponent } from './onb_mgr/onb_mgr.component';
import {OnbManagerSidebarComponent} from './onb_mgr/onb_mgr-sidebar/onb_mgr-vertical-sidebar.component';
import {OnbManagerHorizontalSidebarComponent} from './onb_mgr/onb_mgr-horizontal-sidebar/onb_mgr-horizontal-sidebar.component';
import {OnbManagerAppHeaderComponent } from './onb_mgr/onb_mgr-vertical-header/onb_mgr-vertical-header.component';
/****ONB Manager Role end*****/

/****ACC Manager Role*****/
import { AccManagerComponent } from './acc_mgr/acc_mgr.component';
import { AccManagerSidebarComponent } from './acc_mgr/acc_mgr-sidebar/acc_mgr-vertical-sidebar.component';
import {AccManagerHorizontalSidebarComponent} from './acc_mgr/acc_mgr-horizontal-sidebar/acc_mgr-horizontal-sidebar.component';
import {AccManagerAppHeaderComponent } from './acc_mgr/acc_mgr-vertical-header/acc_mgr-vertical-header.component';
import { DialogDynamicAccComponent } from './acc_mgr/dialog-dynamic/dialog-dynamic.component';
import {DialogOverviewExampleGenerateTagComponent } from './acc_mgr/generate-tag/generate-tag.component';
/****ACC Manager Role end*****/

/****Admin Role*****/
import { AdminComponent } from './admin/admin.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-vertical-sidebar.component';
import {AdminHorizontalSidebarComponent} from './admin/admin-horizontal-sidebar/admin-horizontal-sidebar.component';
import {AdminAppHeaderComponent } from './admin/admin-vertical-header/admin-vertical-header.component';
import { AdminDialogDynamicComponent } from './admin/dialog-dynamic/admin-dialog-dynamic.component';
import {DialogOverviewExampleGenerateTagAdminComponent } from './admin/generate-tag/generate-tag.component';
import {DialogAddUsersAccountUsersAdminComponent } from './admin/account-users/account-users.component';
import {DialogEditUsersAccountUsersAdminComponent } from './admin/account-users/account-users.component';
import {DialogAddUsersBCRMonthsAdminComponent } from './admin/bcr-months/bcr-months.component';
import {DialogEditUsersBCRMonthsAdminComponent } from './admin/bcr-months/bcr-months.component';
import {DialogPaymentDoneAdminPaymentConfrmComponent} from './admin/payment-confirmation/payment-confirmation.component';
/****Admin Role end*****/



/****Sales Manager Role*****/
import { SalesDateRangePickerComponent } from './sales/sales-daterangepicker/sales-daterangepicker.component';
import {SalesComponent} from './sales/sales.component';
import { SalesSidebarComponent } from './sales/sales-sidebar/sales-vertical-sidebar.component';
import {SalesHorizontalSidebarComponent} from './sales/sales-horizontal-sidebar/sales-horizontal-sidebar.component';
import {SalesAppHeaderComponent } from './sales/sales-vertical-header/sales-vertical-header.component';
import { SalesDialogDynamicComponent } from './sales/sales-dialog-dynamic/sales-dialog-dynamic.component';
import {DialogOverviewExampleSalesUsersComponent } from './sales/users-role/users-role.component';
/****Sales Manager Role End*****/

/****Finance Manager Role*****/
import {FinanceComponent} from './finance/finance.component';
import { FinanceSidebarComponent } from './finance/finance-sidebar/finance-vertical-sidebar.component';
import {FinanceHorizontalSidebarComponent} from './finance/finance-horizontal-sidebar/finance-horizontal-sidebar.component';
import {FinanceAppHeaderComponent } from './finance/finance-vertical-header/finance-vertical-header.component';
import { FinanceDialogDynamicComponent } from './finance/finance-dialog-dynamic/finance-dialog-dynamic.component';
import {DialogPaymentDoneFinancePaymentConfrmComponent} from './finance/payment-confirmation/payment-confirmation.component';
/****Finance Manager Role End*****/
/****Deals Manager Role*****/
import {DealsComponent} from './deals/deals.component';
import { DealsSidebarComponent } from './deals/deals-sidebar/deals-vertical-sidebar.component';
import {DealsHorizontalSidebarComponent} from './deals/deals-horizontal-sidebar/deals-horizontal-sidebar.component';
import {DealsAppHeaderComponent } from './deals/deals-vertical-header/deals-vertical-header.component';
import { DealsDialogDynamicComponent } from './deals/deals-dialog-dynamic/deals-dialog-dynamic.component';
import {DialogUpdateDirectDirectDealComponent } from './deals/direct-deal/direct-deal.component';
import {DialogSelectAllDirectDealViewComponent } from './deals/direct-deal-view/direct-deal-view.component';
import {DialogEditAllDirectDealViewComponent } from './deals/direct-deal-view/direct-deal-view.component';
/****Deals Manager Role End*****/

import { DialogDynamicComponent } from './publisher/dialog-dynamic/dialog-dynamic.component';
import { PublisherToolsApiDocComponent } from './publisher/publisher-tools-api-doc/publisher-tools-api-doc.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

// Select some icons (use an object, not an array)
const icons = {
    Camera, Heart, Github, Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter, AlignJustify, AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown, ArrowDownCircle, ArrowDownLeft, ArrowDownRight, ArrowLeftCircle, ArrowLeft, ArrowRight, ArrowRightCircle, ArrowUp, ArrowUpCircle, ArrowUpLeft, ArrowUpRight, AtSign, Award, BarChart2, BarChart, BatteryCharging, Battery, BellOff, Bell, Bluetooth, Bold, BookOpen, Book, Bookmark, Box, Briefcase, Calendar, CameraOff, Cast, CheckCircle, CheckSquare, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Chrome, Circle, Clipboard, Clock, CloudDrizzle, CloudLightning, CloudOff, CloudRain, Cloud, CloudSnow, Code, Codepen, Codesandbox, Coffee, Columns, Command, Compass, Copy, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete, Disc, DollarSign, DownloadCloud, Download, Droplet, Edit, Edit2, Edit3, ExternalLink, EyeOff, Eye, Facebook, FastForward, Feather, Figma, FileMinus, FilePlus, FileText, File, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch, GitCommit, GitMerge, GitPullRequest, Gitlab, Globe, Grid, HardDrive, Hash, Headphones, HelpCircle, Hexagon, Home, MoreHorizontal, Image, Inbox, Info, Instagram, Italic, Key, Layers, Layout, LifeBuoy, Link, Link2, Linkedin, List, Loader, Lock, LogIn, LogOut, Mail, MapPin, Map, Maximize, Maximize2, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2, MinusCircle, MinusSquare, Minus, Monitor, Moon, MoreVertical, MousePointer, Move, Music, Navigation, Navigation2, Octagon, Package, Paperclip, PauseCircle, Pause, PenTool, Percent, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, Phone, PhoneOff, PhoneOutgoing, PieChart, Play, PlayCircle, Plus, PlusCircle, PlusSquare, Pocket, Power, Printer, Radio, RefreshCcw, RefreshCw, Repeat, Rewind, RotateCcw, RotateCw, Rss, Save, Scissors, Search, Send, Server, Settings, Share, Share2, Shield, ShieldOff, ShoppingBag, ShoppingCart, Shuffle, Sidebar, SkipBack, SkipForward, Slack, Slash, Sliders, Smartphone, Smile, Speaker, Square, Star, StopCircle, Sun, Sunrise, Sunset, Tablet, Tag, Target, Terminal, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight, Tool, Trash, Trash2, Trello, TrendingDown, TrendingUp, Triangle, Truck, Tv, Twitch, Twitter, Type, Umbrella, Underline, Unlock, Upload, UploadCloud, User, UserCheck, UserMinus, UserPlus, UserX, Users, Video, VideoOff, Voicemail, Volume, Volume1, Volume2, VolumeX, Watch, Wifi, WifiOff, Wind, XCircle, XOctagon, XSquare, X, Youtube, Zap, ZapOff, ZoomIn, ZoomOut
};

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        FullComponent,
        //VerticalAppHeaderComponent,
        //VerticalAppHeaderDialogComponent,
        PublisherAppHeaderComponent,
        PublisherAppHeaderDialogComponent,
        SpinnerComponent,
        DateRangePickerComponent,
        // ChartModule,
        AppBlankComponent,
        //VerticalAppSidebarComponent,
        AppBreadcrumbComponent,
        //HorizontalAppHeaderComponent,
        //HorizontalAppSidebarComponent,
        PublisherComponent,
        PublisherSidebarComponent,
        PublisherHorizontalSidebarComponent,
        DialogDynamicComponent,
        DialogDynamicAccComponent,
        OnbManagerComponent,
        OnbManagerSidebarComponent,
        OnbManagerHorizontalSidebarComponent,
        OnbManagerAppHeaderComponent,
        AccManagerComponent,
        AccManagerSidebarComponent,
        AccManagerHorizontalSidebarComponent,
        AccManagerAppHeaderComponent,
        DialogOverviewExampleGenerateTagComponent,
        SalesComponent,
        SalesSidebarComponent,
        SalesHorizontalSidebarComponent,
        SalesAppHeaderComponent,
        DialogOverviewExampleSalesUsersComponent,
        SalesDateRangePickerComponent,
        SalesDialogDynamicComponent,
        AdminComponent,
        AdminSidebarComponent,
        AdminHorizontalSidebarComponent,
        AdminAppHeaderComponent,
        AdminDialogDynamicComponent,
        DialogOverviewExampleGenerateTagAdminComponent,
        DialogAddUsersAccountUsersAdminComponent,
        DialogEditUsersAccountUsersAdminComponent,
        DialogAddUsersBCRMonthsAdminComponent,
        DialogEditUsersBCRMonthsAdminComponent,
        DialogPaymentDoneAdminPaymentConfrmComponent,
        FinanceComponent,
        FinanceSidebarComponent,
        FinanceHorizontalSidebarComponent,
        FinanceAppHeaderComponent,
        FinanceDialogDynamicComponent,
        DialogPaymentDoneFinancePaymentConfrmComponent,
        DealsComponent,
        DealsSidebarComponent,
        DealsHorizontalSidebarComponent,
        DealsAppHeaderComponent,
        DealsDialogDynamicComponent,
        DialogUpdateDirectDirectDealComponent,
        DialogSelectAllDirectDealViewComponent,
        DialogEditAllDirectDealViewComponent,
        PublisherToolsApiDocComponent,
    ],
    entryComponents: [DialogDynamicComponent,DialogDynamicAccComponent,SalesDialogDynamicComponent,AdminDialogDynamicComponent,FinanceDialogDynamicComponent,DealsDialogDynamicComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        ChartModule,
        PerfectScrollbarModule,
        SharedModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgxDaterangepickerMd.forRoot(),
        RouterModule.forRoot(AppRoutes, { relativeLinkResolution: 'legacy' }),
        HttpClientModule,
        FeatherModule.pick(icons),
        FeatherModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
