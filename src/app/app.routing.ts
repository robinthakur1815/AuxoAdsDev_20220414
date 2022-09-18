import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
// import { AuthGuard } from './authentication/login/auth.guard';
import { AuthGuard } from './authentication/registerlogin/auth.guard';
import { ChildAuthGuard } from './authentication/registerlogin/childauth.guard';
import { LogoutComponents } from './authentication/logout/logout.component';
import { RegisterLpComponent } from './authentication/registerlp/registerlp.component';

import { PublisherComponent } from './publisher/publisher.component';
import { AdminComponent } from './admin/admin.component';
import { OnbManagerComponent } from './onb_mgr/onb_mgr.component';
import { AccManagerComponent } from './acc_mgr/acc_mgr.component';
import { SalesComponent } from './sales/sales.component';
import { FinanceComponent } from './finance/finance.component';
import { DealsComponent } from './deals/deals.component';
export const AppRoutes: Routes = [

    {
        path: '',
        component: RegisterLpComponent,
        children: [
            {
                path: '',
                redirectTo: '/',
                pathMatch: 'full',
            },
            {
                path: '',
                loadChildren:
                    () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            }
        ]
    },
    {
        path: '',
        component: LogoutComponents,
        children: [{
            path: 'logout',
            loadChildren:
                () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
        }]
    },
    {
        path: '',
        component: PublisherComponent,
        children: [

            {
                path: 'dashboard',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network'] },
                loadChildren: () => import('./publisher/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'publisher/dashboard-admin',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network'] },
                loadChildren: () => import('./publisher/dashboard-benchmark-admin/dashboard-benchmark-admin.module').then(m => m.DashboardBenchmarkAdminModule)
            },
            {
                path: 'bankdetails',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network'] },
                loadChildren: () => import('./publisher/bankdetails/bankdetails.module').then(m => m.BankDetailsModule)
            },
            {
                path: 'manageusers',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network'] },
                loadChildren: () => import('./publisher/manageusers/manageusers.module').then(m => m.ManageUsersModule)
            },

            {
                path: 'invoice-list',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/invoice/invoice.module').then(m => m.InvoiceModule)
            },
            {
                path: 'auxo',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/auxodashboard/auxodashboard.module').then(m => m.AuxoDashboardModule)
            },
            {
                path: 'auxo/display',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-display-overview/safe-display-overview.module').then(m => m.mcmDisplayOverviewModule)
            },
            {
                path: 'auxo/display/adtypes',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-display-adtypes/safe-display-adtypes.module').then(m => m.SafeRevenueDisplayAdtypesModule)
            },
            {
                path: 'auxo/display/ad-unit',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-display-adunits/safe-display-adunits.module').then(m => m.SafeRevenueDisplayUnitsModule)
            },
            {
                path: 'auxo/display/geo',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-display-geo/safe-display-geo.module').then(m => m.SafeRevenueDisplayGeoModule)
            },
            {
                path: 'auxo/display/device',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-display-device/safe-display-device.module').then(m => m.SafeRevenueDisplayDeviceModule)
            },
            {
                path: 'auxo/display/site',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-display-sites/safe-display-sites.module').then(m => m.SafeRevenueDisplaySitesModule)
            },
            {
                path: 'auxo/display/adx-content-mobileos',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/network-revenue-display-mobileos/network-revenue-display-mobileos.module').then(m => m.NetworkRevenueDisplayMobileOsModule)
            },
            {
                path: 'auxo/app',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-app-overview/safe-app-overview.module').then(m => m.SafeAppOverviewModule)
            },
            {
                path: 'auxo/app/adtypes',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-app-adtypes/safe-app-adtypes.module').then(m => m.SafeRevenueAppAdtypesModule)
            },
            {
                path: 'auxo/app/adunit',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-app-adunits/safe-app-adunits.module').then(m => m.SafeRevenueAppUnitsModule)
            },
            {
                path: 'auxo/app/site',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-app-sites/safe-app-sites.module').then(m => m.SafeRevenueAppSitesModule)
            },
            {
                path: 'auxo/app/device',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-app-device/safe-app-device.module').then(m => m.SafeRevenueAppDeviceModule)
            },
            {
                path: 'auxo/app/geo',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-app-geo/safe-app-geo.module').then(m => m.SafeRevenueAppGeoModule)
            },
            {
                path: 'auxo/video',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-video-overview/safe-video-overview.module').then(m => m.SafeVideoOverviewModule)
            },
            {
                path: 'auxo/video/adtypes',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-video-adtypes/safe-video-adtypes.module').then(m => m.SafeRevenueVideoAdtypesModule)
            },
            {
                path: 'auxo/video/adunit',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-video-adunits/safe-video-adunits.module').then(m => m.SafeRevenueVideoUnitsModule)
            },
            {
                path: 'auxo/video/site',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-video-sites/safe-video-sites.module').then(m => m.SafeRevenueVideoSitesModule)
            },
            {
                path: 'auxo/video/device',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-video-device/safe-video-device.module').then(m => m.SafeRevenueVideoDeviceModule)
            },
            {
                path: 'auxo/video/geo',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/safe-video-geo/safe-video-geo.module').then(m => m.SafeRevenueVideoGeoModule)
            },
            {
                path: 'auxopro/pro-dashboard',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/prodashboard/prodashboard.module').then(m => m.ProDashboardModule)
            },
            {
                path: 'auxopro/display',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/prodashboard-display-overview/prodashboard-display-overview.module').then(m => m.ProDashboardDisplayOverviewModule)
            },
            {
                path: 'auxopro/display/adunit',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/prodashboard-display-adunit/prodashboard-display-adunit.module').then(m => m.ProDashboardDisplayAdunitModule)
            },
            {
                path: 'auxopro/display/device',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/prodashboard-display-device/prodashboard-display-device.module').then(m => m.ProDashboardDisplayDeviceModule)
            },
            {
                path: 'auxopro/display/geo',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/prodashboard-display-geo/prodashboard-display-geo.module').then(m => m.ProDashboardDisplayGeoModule)
            },
            {
                path: 'tools/publishertools-ads-txt',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-ads-txt/publishertools-ads-txt.module').then(m => m.PublisherToolsAdsTxtModule)
            },
            {
                path: 'tools/publisher-tools-api-doc',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publisher-tools-api-doc/publisher-tools-api-doc.module').then(m => m.PublisherToolsApiDocModule)
            },
            {
                path: 'tools/publishertools-ads-txt1',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-ads-txt1/publishertools-ads-txt.module').then(m => m.PublisherToolsAdsTxtModule)
            },
            {
                path: 'tools/publishertools-othertools',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-othertools/publishertools-othertools.module').then(m => m.PublisherToolsOtherToolsModule)
            },
            {
                path: 'tools/app-sticky-ads',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-othertools-stickyads/publishertools-othertools-stickyads.module').then(m => m.PublisherToolsOtherToolsStickyAdsModule)
            },
            {
                path: 'tools/app-advance-responsive',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-othertools-adx-and-adsense-advance/publishertools-othertools-adx-and-adsense-advance.module').then(m => m.PublisherToolsOtherToolsAdxAndAdsenseAdvanceModule)
            },
            {
                path: 'tools/app-DFP-responsive-tag-generator',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-othertools-dfp-responsive-tag/publishertools-othertools-dfp-responsive-tag.module').then(m => m.PublisherToolsOtherToolsDfpResponsiveTagModule)
            },
            {
                path: 'tools/app-DFP-refresh-tag-generator',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-othertools-dfp-refresh-tag/publishertools-othertools-dfp-refresh-tag.module').then(m => m.PublisherToolsOtherToolsDfpRefreshTagModule)
            },
            {
                path: 'tools/app-DFP-responsive-and-refresh',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-othertools-dfp-responsive-refresh/publishertools-othertools-dfp-responsive-refresh.module').then(m => m.PublisherToolsOtherToolsDfpResponsiveRefreshModule)
            },
            {
                path: 'tools/app-DFP-Sticky-ads',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/publishertools-othertools-dfp-sticky-ads/publishertools-othertools-dfp-sticky-ads.module').then(m => m.PublisherToolsOtherToolsDfpStickyAdsModule)
            },
            {
                path: 'adsense/ads-overview',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/adsense-overview/adsense-overview.module').then(m => m.AdsenseOverviewModule)
            },
            {
                path: 'adsense/ads-adtypes-new',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/adsense-adtypes/adsense-adtypes.module').then(m => m.AdsenseAdtypesModule)
            },
            {
                path: 'adsense/ads-sites-new',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/adsense-sites/adsense-sites.module').then(m => m.AdsenseSitesModule)
            },
            {
                path: 'adsense/ads-device-new',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Adops Executive', 'Adops Manager'] },
                loadChildren: () => import('./publisher/adsense-device/adsense-device.module').then(m => m.AdsenseDeviceModule)
            },
            {
                path: 'keyinsights/content-performance',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Editor', 'Adops Manager'] },
                loadChildren: () => import('./publisher/keyinsights-content-performance/keyinsights-content-performance.module').then(m => m.KeyinsightsContentPerformanceModule)
            },
            {
                path: 'keyinsights/audience-overview',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Editor', 'Adops Manager'] },
                loadChildren: () => import('./publisher/keyinsights-audience-overview/keyinsights-audience-overview.module').then(m => m.KeyinsightsAudienceOverviewModule)
            },
            {
                path: 'keyinsights/trafic-analysis',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Editor', 'Adops Manager'] },
                loadChildren: () => import('./publisher/keyinsights-traffic-source-comparision/keyinsights-traffic-source-comparision.module').then(m => m.keyinsightsTrafficSourceComparisionModule)
            },
            {
                path: 'gam_invite',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher', 'Network'] },
                loadChildren: () => import('./publisher/add-new-domain/add-new-domain.module').then(m => m.AddNewDomainModule)
            },

            {
                path: 'network-sites',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Network'] },
                loadChildren: () => import('./publisher/network-sites/network-sites.module').then(m => m.NetworkSiteswModule)
            },
            {
                path: 'test',
                canActivateChild: [ChildAuthGuard],
                data: { childroles: ['Publisher'] },
                loadChildren: () => import('./publisher/test/test.module').then(m => m.TestModule)
            }
        ],
        canActivate: [AuthGuard],
        data: { roles: ['Publisher', 'Network', 'Adops Manager', 'Adops Executive', 'Editor'] }
    },

    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'admin-dashboard',
                loadChildren:
                    () => import('./admin/dashboard-overview/dashboard-overview.module').then(m => m.DashboardOverviewModule)
            },
            {
                path: 'admin-network-partner',
                loadChildren: () => import('./admin/network-partner/network-partner.module').then(m => m.NetworkPartnerModule)
            },
            {
                path: 'admin/network-partner-profile/:id',
                loadChildren: () => import('./admin/network-partner-profile/network-partner-profile.module').then(m => m.NetworkPartnerProfileModule)
            },
            {
                path: 'admin/generate-tag',
                loadChildren: () => import('./admin/generate-tag/generate-tag.module').then(m => m.GenerateTagModule)
            },
            {
                path: 'admin/bank-details/:id',
                loadChildren: () => import('./admin/bankdetails/bankdetails.module').then(m => m.BankDetailsModule)
            },
            {
                path: 'admin-account-users',
                loadChildren: () => import('./admin/account-users/account-users.module').then(m => m.AccountUsersModule)
            },
            {
                path: 'admin-payments',
                loadChildren: () => import('./admin/payment-confirmation/payment-confirmation.module').then(m => m.PaymentConfirmationModule)
            },
            {
                path: 'admin-payment-history',
                loadChildren: () => import('./admin/payment-history/payment-history.module').then(m => m.PaymentHistoryModule)
            },
            {
                path: 'admin-payment-history-status/:uniqId',
                loadChildren: () => import('./admin/payment-history-status/payment-history-status.module').then(m => m.PaymentHistoryStatusModule)
            },
            {
                path: 'admin-bcr',
                loadChildren: () => import('./admin/bcr-months/bcr-months.module').then(m => m.BCRMonthsModule)
            },
            {
                path: 'admin-website-search',
                loadChildren: () => import('./admin/website-search/website-search.module').then(m => m.WebsiteSearchModule)
            },
            {
                path: 'admin-adx-for-content',
                loadChildren: () => import('./admin/automated-invoice-content/automated-invoice-content.module').then(m => m.AutomatedInvoiceContentModule)
            },
            {
                path: 'admin-adx-for-app',
                loadChildren: () => import('./admin/automated-invoice-app/automated-invoice-app.module').then(m => m.AutomatedInvoiceAppModule)
            },
            {
                path: 'admin-adx-for-video',
                loadChildren: () => import('./admin/automated-invoice-video/automated-invoice-video.module').then(m => m.AutomatedInvoiceVideoModule)
            },

            {
                path: 'admin-other-tools',
                loadChildren: () => import('./admin/publishertools-othertools/publishertools-othertools.module').then(m => m.PublisherToolsOtherToolsModule)
            },
            {
                path: 'admin-other-tools-app-sticky-ads',
                loadChildren: () => import('./admin/publishertools-othertools-stickyads/publishertools-othertools-stickyads.module').then(m => m.PublisherToolsOtherToolsStickyAdsModule)
            },
            {
                path: 'admin-other-tools-app-advance-responsive',
                loadChildren: () => import('./admin/publishertools-othertools-adx-and-adsense-advance/publishertools-othertools-adx-and-adsense-advance.module').then(m => m.PublisherToolsOtherToolsAdxAndAdsenseAdvanceModule)
            },
            {
                path: 'admin-other-tools-app-DFP-responsive-tag-generator',
                loadChildren: () => import('./admin/publishertools-othertools-dfp-responsive-tag/publishertools-othertools-dfp-responsive-tag.module').then(m => m.PublisherToolsOtherToolsDfpResponsiveTagModule)
            },
            {
                path: 'admin-other-tools-app-DFP-refresh-tag-generator',
                loadChildren: () => import('./admin/publishertools-othertools-dfp-refresh-tag/publishertools-othertools-dfp-refresh-tag.module').then(m => m.PublisherToolsOtherToolsDfpRefreshTagModule)
            },
            {
                path: 'admin-other-tools-app-DFP-responsive-and-refresh',
                loadChildren: () => import('./admin/publishertools-othertools-dfp-responsive-refresh/publishertools-othertools-dfp-responsive-refresh.module').then(m => m.PublisherToolsOtherToolsDfpResponsiveRefreshModule)
            },
            {
                path: 'admin-other-tools-app-DFP-Sticky-ads',
                loadChildren: () => import('./admin/publishertools-othertools-dfp-sticky-ads/publishertools-othertools-dfp-sticky-ads.module').then(m => m.PublisherToolsOtherToolsDfpStickyAdsModule)
            },
        ],
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: '',
        component: OnbManagerComponent,
        children: [
            {
                path: 'obm-dashboard',
                loadChildren: () => import('./onb_mgr/obm-dashboard/obm-dashboard.module').then(m => m.OBMDashboardModule)
            },
            {
                path: 'obm-admanager-invite',
                loadChildren: () => import('./onb_mgr/obm-admanager-invite/obm-admanager-invite.module').then(m => m.OBMAdmanagerModule)
            },
            {
                path: 'obm-admanager-invite-publisherdetails/:pub_id',
                loadChildren: () => import('./onb_mgr/obm-admanager-invite-publisherdetails/obm-admanager-invite-publisherdetails.module').then(m => m.OBMAdManagerPublisherDetailsModule)
            },
            {
                path: 'obm-admanager-domain',
                loadChildren: () => import('./onb_mgr/obm-admanager-domain/obm-admanager-domain.module').then(m => m.OBMAdmanagerDomainModule)
            },
            {
                path: 'obm-admanager-domain-publisherdetails/:pub_id/:domain_id',
                loadChildren: () => import('./onb_mgr/obm-admanager-domain-publisherdetails/obm-admanager-domain-publisherdetails.module').then(m => m.OBMAdManagerPublisherDetailsModule)
            },
            {
                path: 'obm-admanager-app',
                loadChildren: () => import('./onb_mgr/obm-admanager-app/obm-admanager-app.module').then(m => m.OBMAdmanagerAppModule)
            },
            {
                path: 'obm-admanager-app-publisherdetails/:pub_id/:app_id',
                loadChildren: () => import('./onb_mgr/obm-admanager-app-publisherdetails/obm-admanager-app-publisherdetails.module').then(m => m.OBMAdManagerAppPublisherDetailsModule)
            },
        ],
        canActivate: [AuthGuard],
        data: { roles: ['ONB Manager'] }
    },
    {
        path: '',
        component: AccManagerComponent,
        children: [
            {
                path: 'acc-dashboard',
                loadChildren: () => import('./acc_mgr/dashboard-overview/dashboard-overview.module').then(m => m.DashboardOverviewModule)
            },
            {
                path: 'network-partner',
                loadChildren: () => import('./acc_mgr/network-partner/network-partner.module').then(m => m.NetworkPartnerModule)
            },
            {
                path: 'acc_mgr/acc-bank-details/:id',
                loadChildren: () => import('./acc_mgr/bankdetails/bankdetails.module').then(m => m.BankDetailsModule)
            },
            {
                path: 'acc_mgr/network-partner-profile/:id',
                loadChildren: () => import('./acc_mgr/network-partner-profile/network-partner-profile.module').then(m => m.NetworkPartnerProfileModule)
            },
            {
                path: 'acc_mgr/pixel-tracking-tag/:uniq_id',
                loadChildren: () => import('./acc_mgr/pexel-tracking-tag/pexel-tracking-tag.module').then(m => m.PixelTrackingTagModule)
            },
            {
                path: 'acc_mgr/generate-tag/:uniq_id/:pub_id',
                loadChildren: () => import('./acc_mgr/generate-tag/generate-tag.module').then(m => m.GenerateTagModule)
            }

        ],
        canActivate: [AuthGuard],
        data: { roles: ['Acc Manager'] }
    },
    {
        path: '',
        component: SalesComponent,
        children: [
            {
                path: 'sales-dashboard',
                loadChildren: () => import('./sales/dashboard-sales/dashboard-sales.module').then(m => m.DashboardSalesModule)
            },
            {
                path: 'sales-users-role',
                loadChildren: () => import('./sales/users-role/users-role.module').then(m => m.SalesUsersModule)
            },
            {
                path: 'sales-publisher-list',
                loadChildren: () => import('./sales/sales-publisher-list/sales-publisher-list.module').then(m => m.SalesNetworkPartnerModule)
            },
            {
                path: 'sales/central-detailed-dashboard/:id',
                loadChildren: () => import('./sales/sales-users-detailed-dashboard/sales-users-detailed-dashboard.module').then(m => m.SalesUsersDetailedDashboardModule)
            },
            {
                path: 'admanager-invite',
                loadChildren: () => import('./sales/obm-admanager-invite/obm-admanager-invite.module').then(m => m.OBMAdmanagerModule)
            },
            {
                path: 'admanager-invite-publisherdetails/:pub_id',
                loadChildren: () => import('./sales/obm-admanager-invite-publisherdetails/obm-admanager-invite-publisherdetails.module').then(m => m.OBMAdManagerPublisherDetailsModule)
            },
            {
                path: 'admanager-domain',
                loadChildren: () => import('./sales/obm-admanager-domain/obm-admanager-domain.module').then(m => m.OBMAdmanagerDomainModule)
            },
            {
                path: 'admanager-domain-publisherdetails/:pub_id/:domain_id',
                loadChildren: () => import('./sales/obm-admanager-domain-publisherdetails/obm-admanager-domain-publisherdetails.module').then(m => m.OBMAdManagerPublisherDetailsModule)
            },
            {
                path: 'admanager-app',
                loadChildren: () => import('./sales/obm-admanager-app/obm-admanager-app.module').then(m => m.OBMAdmanagerAppModule)
            },
            {
                path: 'admanager-app-publisherdetails/:pub_id/:app_id',
                loadChildren: () => import('./sales/obm-admanager-app-publisherdetails/obm-admanager-app-publisherdetails.module').then(m => m.OBMAdManagerAppPublisherDetailsModule)
            },
        ],
        canActivate: [AuthGuard],
        data: { roles: ['Sales Admin', 'Sales Users'] }
    },
    {
        path: '',
        component: FinanceComponent,
        children: [
            {
                path: 'finance-dashboard',
                loadChildren: () => import('./finance/dashboard-finance/dashboard-finance.module').then(m => m.DashboardFinanceModule)
            },
            {
                path: 'finance-network-partner',
                loadChildren: () => import('./finance/network-partner/network-partner.module').then(m => m.NetworkPartnerModule)
            },
            {
                path: 'finance/network-partner-profile/:id',
                loadChildren: () => import('./finance/network-partner-profile/network-partner-profile.module').then(m => m.NetworkPartnerProfileModule)
            },
            {
                path: 'finance/bank-details/:uniqId',
                loadChildren: () => import('./finance/bankdetails/bankdetails.module').then(m => m.BankDetailsModule)
            },
            {
                path: 'finance-payments',
                loadChildren: () => import('./finance/payment-confirmation/payment-confirmation.module').then(m => m.PaymentConfirmationModule)
            },
            {
                path: 'finance-payment-history',
                loadChildren: () => import('./finance/payment-history/payment-history.module').then(m => m.PaymentHistoryModule)
            },
            {
                path: 'finance-payment-history-status/:uniqId',
                loadChildren: () => import('./finance/payment-history-status/payment-history-status.module').then(m => m.PaymentHistoryStatusModule)
            },
            {
                path: 'finance/notification-hub',
                loadChildren: () => import('./finance/notification/notification.module').then(m => m.NotificationsModule)
            }
        ],
        canActivate: [AuthGuard],
        data: { roles: ['Finance'] }
    },
    {
        path: '',
        component: DealsComponent,
        children: [
            {
                path: 'deals-direct-deal',
                loadChildren: () => import('./deals/direct-deal/direct-deal.module').then(m => m.DirectDealModule)
            },
            {
                path: 'deals-direct-deal-view/:orderId',
                loadChildren: () => import('./deals/direct-deal-view/direct-deal-view.module').then(m => m.DirectDealViewModule)
            },
        ],
        canActivate: [AuthGuard],
        data: { roles: ['Deals Manager'] }
    },

    {
        path: '',
        component: AppBlankComponent,
        children: [
            {
                path: 'authentication',
                loadChildren:
                    () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'authentication/404'
    }
];
