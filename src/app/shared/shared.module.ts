import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AdminItems } from './menu-items/admin-items';
import { PublisherItems } from './menu-items/publisher-items';
import { HorizontalMenuItems } from './menu-items/horizontal-menu-items';

import {OnbManagerItems} from './menu-items/onb_mgr-items';
import {OnbHorizontalMenuItems} from './menu-items/onb_mgr-horizontal-menu-items';

import {AccManagerItems} from './menu-items/acc_mgr-items';
import {AccHorizontalMenuItems} from './menu-items/acc_mgr-horizontal-menu-items';

import {SalesItems} from './menu-items/sales-items';
import {SalesHorizontalMenuItems} from './menu-items/sales-horizontal-menu-items';

import {DealsItems} from './menu-items/deals-items';
import {DealsHorizontalMenuItems} from './menu-items/deals-horizontal-menu-items';

import {FinanceItems} from './menu-items/finance-items';
import {FinanceHorizontalMenuItems} from './menu-items/finance-horizontal-menu-items';

import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  providers: [MenuItems, HorizontalMenuItems,AdminItems,PublisherItems,OnbManagerItems,OnbHorizontalMenuItems,AccManagerItems,AccHorizontalMenuItems,SalesItems,SalesHorizontalMenuItems,DealsItems,DealsHorizontalMenuItems,FinanceItems,FinanceHorizontalMenuItems]
  // providers: [AdminItems]
})
export class SharedModule { }
