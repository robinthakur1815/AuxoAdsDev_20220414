import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router, } from '@angular/router';
import { map } from 'rxjs/operators';
import * as moment from 'moment-timezone';

@Injectable({
    providedIn: 'root'
})
export class ChildAuthGuard implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService,
        private router: Router,
    ) {

    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        /** for daterangerpicker */
        let checkstrtdate = moment(localStorage.getItem('startdate')).format("YYYY-MM-DD");
        let checkenddate = moment(localStorage.getItem('enddate')).format("YYYY-MM-DD");
        let checklast3monthstart =   moment().subtract(3, 'month').format("YYYY-MM-DD");
        let checkTodaydate = moment().format("YYYY-MM-DD");
        let checkrange = localStorage.getItem('range');
        if(checkstrtdate < checklast3monthstart || checkenddate < checklast3monthstart || checkstrtdate > checkTodaydate || checkenddate > checkTodaydate){
            if(checkrange == "today"){
                localStorage.setItem('startdate', moment().format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().format("YYYY-MM-DD"));
            }else if(checkrange == "yesterday"){
                localStorage.setItem('startdate', moment().subtract(1, 'days').format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().subtract(1, 'days').format("YYYY-MM-DD"));
            }else if(checkrange == "7days"){
                localStorage.setItem('startdate', moment().subtract(6, 'days').format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().format("YYYY-MM-DD"));
            }else if(checkrange == "10days"){
                localStorage.setItem('startdate', moment().subtract(9, 'days').format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().format("YYYY-MM-DD"));
            }else if(checkrange == "last30days"){
                localStorage.setItem('startdate', moment().subtract(29, 'days').format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().format("YYYY-MM-DD"));
            }else if(checkrange == "thismonth"){
                localStorage.setItem('startdate', moment().startOf('month').format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().format("YYYY-MM-DD"));
            }else if(checkrange == "lastmonth"){
                localStorage.setItem('startdate', moment().subtract(1, 'month').startOf('month').format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().subtract(1, 'month').endOf('month').format("YYYY-MM-DD"));
            }else if(checkrange == "3month"){
                localStorage.setItem('startdate',  moment().subtract(3, 'month').format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().format("YYYY-MM-DD"));
            }else{
                localStorage.setItem('startdate', moment().subtract(14, 'days').format("YYYY-MM-DD"));
                localStorage.setItem('enddate', moment().format("YYYY-MM-DD"));
            }
        }
        
        const allowedRoles = childRoute.data.childroles;
        if (localStorage.getItem('role') == null && localStorage.getItem('role') == '') {
            this.router.navigate(['authentication/404']);
            return false;
        } 
        else if (localStorage.getItem('role') == 'Publisher' || localStorage.getItem('role') == 'Network' || localStorage.getItem('role') == 'Adops Manager' || localStorage.getItem('role') == 'Adops Executive' || localStorage.getItem('role') == 'Editor' || localStorage.getItem('role') == 'ONB Manager' || localStorage.getItem('role') == 'Acc Manager' || localStorage.getItem('role') == 'Sales Admin' || localStorage.getItem('role') == 'Sales Users') {
            const index = allowedRoles.indexOf(localStorage.getItem('role'));
            if(index !== -1){
                return childRoute.data.childroles.some(ai => localStorage.getItem('role').includes(ai));
            }else{
                this.router.navigate(['authentication/404']);
                return false;
            }

        } else {
            this.router.navigate(['authentication/404']);
            return false;
        }
    }
    canActivate(route: ActivatedRouteSnapshot): boolean {

        if (localStorage.getItem('useremail') == null && localStorage.getItem('role_id') == null) {
            
            this.router.navigate(['login']);
            return false;
        } else {
            
            // return route.data.roles.some( ai => this.user.getRoles().includes(ai) ); 
            return route.data.roles.some(ai => localStorage.getItem('role').includes(ai));
            // return true;
        }

    }
}
