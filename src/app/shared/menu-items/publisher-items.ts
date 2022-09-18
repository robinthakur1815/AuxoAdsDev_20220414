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

const PUBLISHERMENUITEMS = [
    {
        state: '',
        name: 'Publishers',
        type: 'saperator',
        icon: 'av_timer'
    },
    // {
    //     state: 'dashboards',
    //     name: 'Dashboards',
    //     type: 'sub',
    //     icon: 'av_timer',
    //     children: [
    //         { state: 'dashboard1', name: 'Dashboard 1', type: 'link' },
    //         { state: 'dashboard2', name: 'Dashboard 2', type: 'link' }
    //     ]
    // },
    // {
    //     state: 'dashboards',
    //     name: 'Dashboard',
    //     type: 'childnetcodesub',
    //     icon: 'av_timer',
    //     children: [
    //         { state: 'dashboard1', name: 'Dashboard 1', type: 'link' },
    //         { state: 'dashboard2', name: 'Dashboard 2', type: 'link' }
    //     ]
       
    // },
    {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'sub',
        icon: 'av_timer'
    },
    {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'childnetcodesub',
        icon: 'av_timer'
    },
    {
        state: 'gam_invite',
        name: 'Add New Domain',
        type: 'childnetcodelink',
        icon: 'domain'
    },
     
    {
        state: 'auxo',
        name: 'Auxo Network',
        icon: 'widgets',
        type: 'subCyberDash',
        children: [
            // {
            //     state: 'Cyb_overview',
            //     name: 'CyberAds Dashboard',
            //     type: 'link'
            // },
            {
                state: 'display',
                name: 'Display',
                type: 'subchild',
                subchildren: [
                    // {
                    //     state: 'mcm-display-overview-publisher',
                    //     name: 'Overview',
                    //     type: 'link'
                    // },
                    {
                        state: 'adtypes',
                        name: 'Ad Types',
                        type: 'link'
                    },
                    {
                        state: 'ad-unit',
                        name: 'Ad Units',
                        type: 'link'
                    },
                    {
                        state: 'site',
                        name: 'Sites',
                        type: 'link'
                    },
                    {
                        state: 'device',
                        name: 'Device',
                        type: 'link'
                    },
                    {
                        state: 'geo',
                        name: 'Geo',
                        type: 'link'
                    },
                    // {
                    //     state: 'adx-content-mobileos',
                    //     name: 'Mobile / OS',
                    //     type: 'link'
                    // }
                ]
            },
            {
                state: 'app',
                name: 'Apps',
                type: 'subchild',
                subchildren: [
                    // {
                    //     state: 'mcm-display-overview-publisher',
                    //     name: 'Overview',
                    //     type: 'link'
                    // },
                    {
                        state: 'adtypes',
                        name: 'Ad Types',
                        type: 'link'
                    },
                    {
                        state: 'adunit',
                        name: 'Ad Units',
                        type: 'link'
                    },
                    {
                        state: 'site',
                        name: 'App-wise',
                        type: 'link'
                    },
                    {
                        state: 'device',
                        name: 'Device',
                        type: 'link'
                    },
                    {
                        state: 'geo',
                        name: 'Geo',
                        type: 'link'
                    },
                    // {
                    //     state: 'adx-content-mobileos',
                    //     name: 'Mobile / OS',
                    //     type: 'link'
                    // }
                ]
            },
            {
                state: 'video',
                name: 'Video',
                type: 'subchild',
                subchildren: [
                    // {
                    //     state: 'mcm-display-overview-publisher',
                    //     name: 'Overview',
                    //     type: 'link'
                    // },
                    {
                        state: 'adtypes',
                        name: 'Ad Types',
                        type: 'link'
                    },
                    {
                        state: 'adunit',
                        name: 'Ad Units',
                        type: 'link'
                    },
                    {
                        state: 'site',
                        name: 'Sites',
                        type: 'link'
                    },
                    {
                        state: 'device',
                        name: 'Device',
                        type: 'link'
                    },
                    {
                        state: 'geo',
                        name: 'Geo',
                        type: 'link'
                    },
                    // {
                    //     state: 'adx-content-mobileos',
                    //     name: 'Mobile / OS',
                    //     type: 'link'
                    // }
                ]
            }
            
        ]
    },

    {
        state: 'auxopro',
        name: 'Auxo Pro',
        icon: 'insert_chart',
        type: 'subCyberAdsPro',
        children: [
            // {
            //     state: 'pro-dashboard',
            //     name: 'Pro Dashboard',
            //     type: 'link'
            // },
            {
                state: 'display',
                name: 'Display',
                type: 'subchild',
                subchildren: [
                    {
                        state: 'adunit',
                        name: 'Ad Units',
                        type: 'link'
                    },
                    {
                        state: 'device',
                        name: 'Device',
                        type: 'link'
                    },
                    {
                        state: 'geo',
                        name: 'Geo',
                        type: 'link'
                    }
                ]
            }
        ]
    },

    

    {
        state: 'adsense',
        name: 'AdSense',
        type: 'subadsense',
        icon: 'apps',
        // badge: [{ type: 'warning', value: 'new' }],
        children: [
            // { state: 'ads-overview', name: 'Overview', type: 'link' },
            { state: 'ads-adtypes-new', name: 'Ad Types', type: 'link' },
            { state: 'ads-sites-new', name: 'Sites', type: 'link' },
            { state: 'ads-device-new', name: 'Device', type: 'link' },
        ]
    },

    // {
    //     state: 'keyinsights',
    //     name: 'KeyInsights',
    //     icon: 'view_week',
    //     type: 'subkeyinsights',
    //     children: [
    //         // {
    //         //     state: 'content-performance',
    //         //     name: 'Content Performance',
    //         //     type: 'link'
    //         // },
    //         {
    //             state: 'audience-overview',
    //             name: 'Audience Overview',
    //             type: 'subchild',
    //             subchildren: [
    //                 // {
    //                 //     state: 'audience',
    //                 //     name: 'Audience',
    //                 //     type: 'link'
    //                 // },
    //                 // {
    //                 //     state: 'return-vs-new',
    //                 //     name: 'New V/S Returning',
    //                 //     type: 'link'
    //                 // }
    //             ]
    //         },
            
    //         {
    //             state: 'trafic-analysis',
    //             name: 'Audience Analysis',
    //             type: 'subchild',
    //             subchildren: [
    //                 // {
    //                 //     state: 'trafic-source-comp',
    //                 //     name: 'Traffic Source Comparision',
    //                 //     type: 'link'
    //                 // },
    //                 // {
    //                 //     state: 'geo',
    //                 //     name: 'Traffic By Geo',
    //                 //     type: 'link'
    //                 // },
    //                 // {
    //                 //     state: 'landing',
    //                 //     name: 'Landing Page',
    //                 //     type: 'link'
    //                 // },
    //                 // {
    //                 //     state: 'exit',
    //                 //     name: 'Exit Page',
    //                 //     type: 'link'
    //                 // }
    //             ]
    //         }
    //     ]
    // },

    {
        state: 'keyinsights',
        name: 'Key Insights',
        type: 'subInsights',
        icon: 'view_week',
        children: [
            { state: 'content-performance', name: 'Content Insights', type: 'link' },
            { state: 'audience-overview', name: 'Audience Insights', type: 'link' },
            { state: 'trafic-analysis', name: 'Traffic Insights', type: 'link' }
        ]
    },

    {
        state: 'network-sites',
        name: 'Network Sites',
        type: 'network',
        icon: 'domain'
    },
    {
        state: 'gam_invite',
        name: 'Add New Domain',
        type: 'link',
        icon: 'domain'
    },
    {
        state: 'tools',
        name: 'Publisher Tools',
        type: 'subTools',
        icon: 'publish',
        // badge: [{ type: 'warning', value: 'new' }],
        children: [
            { state: 'publishertools-ads-txt', name: 'Ads.Txt', type: 'link' },
            { state: 'publisher-tools-api-doc', name: 'Api-Docs ', type: 'link' },
            // { state: 'publishertools-ads-txt1', name: 'Api-Docs', type: 'link' },
            // { state: 'publishertools-othertools', name: 'Other Tools', type: 'link' },
        ]
    },
    
    
   
];

@Injectable()
export class PublisherItems {
    getMenuitem(): Menu[] {
        return PUBLISHERMENUITEMS;
    }
}
