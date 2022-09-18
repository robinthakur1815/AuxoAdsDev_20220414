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

const DealsHorizntlMENUITEMS = [
    {
        state: 'deals-dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer'
    }
];

@Injectable()
export class DealsHorizontalMenuItems {
    getMenuitem(): Menu[] {
        return DealsHorizntlMENUITEMS;
    }
}