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

const AdminHorizontalMENUITEMS = [
    {
        state: 'admin-dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer' 
    },
    {
        state: 'admin-network-partner',
        name: 'Network Partner',
        type: 'link',
        icon: 'people'
    },
    {
        state: 'admin-account-users',
        name: 'Account Users',
        type: 'link',
        icon: 'people'
    },
    {
        state: 'admin-other-tools',
        name: 'Other Tools',
        type: 'link',
        icon: 'settings'
    },


    {
        state: 'admin-payments',
        name: 'Payments',
        type: 'link',
        icon: 'monetization_on'
    },


    // {
    //     state: 'admin-adx-for-content',
    //     name: 'AdX For Content',
    //     type: 'link',
    //     icon: 'text_fields'
    // },
    // {
    //     state: 'admin-adx-for-app',
    //     name: 'AdX For App',
    //     type: 'link',
    //     icon: 'important_devices'
    // },
    // {
    //     state: 'admin-adx-for-video',
    //     name: 'AdX For Video',
    //     type: 'link',
    //     icon: 'videocam'
    // },
    // {
    //     state: 'admin-bcr',
    //     name: 'BCR ( Months )',
    //     type: 'link',
    //     icon: 'attach_money'
    // },
    // {
    //     state: 'admin-website-search',
    //     name: 'Website Search',
    //     type: 'link',
    //     icon: 'find_in_page'
    // }
];

@Injectable()
export class AdminHorizontalItems {
    getMenuitem(): Menu[] {
        return AdminHorizontalMENUITEMS;
    }
}