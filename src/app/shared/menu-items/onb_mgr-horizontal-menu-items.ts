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

const ONBMGRHorizontalMENUITEMS = [
    {
        state: '',
        name: 'Publishers',
        type: 'saperator',
        icon: 'av_timer'
    },
    {
        state: 'onb_mgr/dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer'
    },
    {
        state: 'onb_mgr/dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer'
    },
    {
        state: 'onb_mgr/invite',
        name: 'Ad Manager Invite',
        type: 'link',
        icon: 'publish'
    },
    {
        state: 'onb_mgr/domain',
        name: 'Ad Manager Domain',
        type: 'link',
        icon: 'domain'
    },
    {
        state: 'onb_mgr/app',
        name: 'Ad Manager App',
        type: 'link',
        icon: 'app'
    },
];

@Injectable()
export class OnbHorizontalMenuItems {
    getMenuitem(): Menu[] {
        return ONBMGRHorizontalMENUITEMS;
    }
}