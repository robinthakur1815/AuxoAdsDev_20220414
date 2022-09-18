import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    child?: SubChildren[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: '',
        name: 'Indiaresults.com 123',
        type: 'saperator',
        icon: 'av_timer'
    },
    {
        state: 'dashboards',
        name: 'Dashboards',
        type: 'sub',
        icon: 'av_timer',
        children: [
            { state: 'dashboard1', name: 'Dashboard 1', type: 'link' },
            { state: 'dashboard2', name: 'Dashboard 2', type: 'link' }
        ]
    },

    {
        state: 'cyberads',
        name: 'CyberAds',
        icon: 'widgets',
        type: 'sub',
        children: [
            {
                state: 'Cyb_overview',
                name: 'CyberAds Dashboard',
                type: 'link'
            },
            {
                state: 'display',
                name: 'Display',
                type: 'subchild',
                subchildren: [
                    {
                        state: 'adx-for-content-overview',
                        name: 'Overview',
                        type: 'link'
                    },
                    
                    {
                        state: 'adx-for-content-adtypes',
                        name: 'Ad Types',
                        type: 'link'
                    },
                    {
                        state: 'adx-content-ad-unit',
                        name: 'Ad Units',
                        type: 'link'
                    },
                    {
                        state: 'adx-for-content-site',
                        name: 'Sites',
                        type: 'link'
                    },
                    {
                        state: 'adx-for-content-device',
                        name: 'Device',
                        type: 'link'
                    },
                    {
                        state: 'adx-content-geo',
                        name: 'Geo',
                        type: 'link'
                    },
                    {
                        state: 'adx-content-mobileos',
                        name: 'Mobile / OS',
                        type: 'link'
                    }
                ]
            }
            
            // {
            //     state: 'third-level',
            //     name: 'aSecond Level',
            //     type: 'subchild',
            //     subchildren: [
            //         {
            //             state: 'athird-level',
            //             name: 'Third Level',
            //             type: 'link'
            //         }
            //     ]
            // }
        ]
    },

    {
        state: 'prorevenue',
        name: 'Pro Revenue',
        icon: 'insert_chart',
        type: 'sub',
        children: [
            {
                state: 'pro-dashboard',
                name: 'Pro Dashboard',
                type: 'link'
            },
            {
                state: 'display',
                name: 'Display',
                type: 'subchild',
                subchildren: [
                    {
                        state: 'header_bidder',
                        name: 'Overview',
                        type: 'link'
                    },
                    {
                        state: 'header-bidder-device',
                        name: 'Device',
                        type: 'link'
                    },
                    {
                        state: 'header-bidder-geo',
                        name: 'Geo',
                        type: 'link'
                    }
                ]
            }
        ]
    },

    {
        state: 'tools',
        name: 'Publisher Tools',
        type: 'sub',
        icon: 'publish',
        // badge: [{ type: 'warning', value: 'new' }],
        children: [
            { state: 'publishertools-ads-txt', name: 'Ads.Txt', type: 'link' },
            { state: 'publisher-tools-api-doc', name: 'Api-Docs ', type: 'link' },
            { state: 'publishertools-othertools', name: 'Other Tools', type: 'link' },
        ]
    },

    {
        state: 'adsense',
        name: 'Adsense',
        type: 'sub',
        icon: 'apps',
        // badge: [{ type: 'warning', value: 'new' }],
        children: [
            { state: 'ads-overview', name: 'Overview', type: 'link' },
            { state: 'ads-adtypes-new', name: 'AdTypes', type: 'link' },
            { state: 'ads-sites-new', name: 'Sites', type: 'link' },
            { state: 'ads-device-new', name: 'Device', type: 'link' },
        ]
    },

    {
        state: 'keyinsights',
        name: 'KeyInsights',
        icon: 'view_week',
        type: 'sub',
        children: [
            {
                state: 'content-performance',
                name: 'Content Performance',
                type: 'link'
            },
            {
                state: 'audience-overview',
                name: 'Audience Overview',
                type: 'subchild',
                subchildren: [
                    {
                        state: 'audience',
                        name: 'Audience',
                        type: 'link'
                    },
                    {
                        state: 'return-vs-new',
                        name: 'New V/S Returning',
                        type: 'link'
                    }
                ]
            },
            
            {
                state: 'trafic-analysis',
                name: 'Traffic Analysis',
                type: 'subchild',
                subchildren: [
                    {
                        state: 'trafic-source-comp',
                        name: 'Traffic Source Comparision',
                        type: 'link'
                    },
                    {
                        state: 'geo',
                        name: 'Traffic By Geo',
                        type: 'link'
                    },
                    {
                        state: 'landing',
                        name: 'Landing Page',
                        type: 'link'
                    },
                    {
                        state: 'exit',
                        name: 'Exit Page',
                        type: 'link'
                    }
                ]
            }
        ]
    },

    {
        state: 'gam_invite',
        name: 'Add New Domain',
        type: 'link',
        icon: 'domain'
    }
    ,

    {
        state: 'mcm-display-overview-publisher',
        name: 'MCM Overview Publisher',
        type: 'link',
        icon: 'domain'
    }
    ,

    {
        state: 'mcm-display-overview-admin',
        name: 'MCM Overview Admin',
        type: 'link',
        icon: 'domain'
    }
    
   
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
