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

const ONBMGRMENUITEMS = [
    
    {
        state: 'obm-dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer'
    },
    {
        state: 'obm-admanager-invite',
        name: 'Ad Manager Invite',
        type: 'link',
        icon: 'insert_invitation'
    },
    {
        state: 'obm-admanager-domain',
        name: 'Ad Manager Domain',
        type: 'link',
        icon: 'domain'
    },
    {
        state: 'obm-admanager-app',
        name: 'Ad Manager App',
        type: 'link',
        icon: 'devices'
    },
];

@Injectable()
export class OnbManagerItems {
    getMenuitem(): Menu[] {
        return ONBMGRMENUITEMS;
    }
}