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

const DealsMENUITEMS = [
    
    {
        state: 'deals-direct-deal',
        name: 'Direct Deal',
        type: 'link',
        icon: 'group_work'
    },
    
];

@Injectable()
export class DealsItems {
    getMenuitem(): Menu[] {
        return DealsMENUITEMS;
    }
}