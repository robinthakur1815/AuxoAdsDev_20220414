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

const SALESMENUITEMS = [
    
    {
        state: 'sales-dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'av_timer' 
    },
    // {
    //     state: 'sales-users-role',
    //     name: 'User Role',
    //     type: 'linkuser',
    //     icon: 'person' 
    // },
    {
        state: 'sales-publisher-list',
        name: 'Publisher List',
        type: 'link',
        icon: 'people_outline' 
    }
    
];

@Injectable()
export class SalesItems {
    getMenuitem(): Menu[] {
        return SALESMENUITEMS;
    }
}