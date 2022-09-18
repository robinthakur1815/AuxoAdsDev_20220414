import { Component } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-publishertools-ads-txt',
  templateUrl: './publishertools-ads-txt.component.html',
  styleUrls: ['./publishertools-ads-txt.component.scss']
})

export class PublisherToolsAdsTxtComponent {

  hide = true;
  adsenseid: boolean = true;
  adsid: string;
  mcmid: boolean = true;
  valueText: any;
  constructor() {
    
  }
  ngOnInit() {


    if (localStorage.getItem('ads_id') != '' && localStorage.getItem('ads_id') != 'ca-' && localStorage.getItem('ads_id') != null) {
      this.adsenseid = true;
      this.adsid = localStorage.getItem('ads_id');
    }
    else {
      this.adsenseid = false;
    }
    if (localStorage.getItem('child_net_code') != '' && localStorage.getItem('child_net_code') != null) {
      this.mcmid = true;
    }
    else {
      this.mcmid = false;
    }


    if (this.mcmid == true && this.adsenseid == false) {
      this.valueText = 'yahoo.com, 59636, DIRECT, e1a5b5b6e3255540 #SSP' + '\n' + 'indexexchange.com , 175407, RESELLER, 50b1c356f2c5c8fc  #SSP O&O, 3P' + '\n' +
        'pubmatic.com, 156107, RESELLER, 5d62403b186f2ace  #Display' + '\n' + 'rubiconproject.com, 17250, RESELLER, 0bfd66d529a55807' + '\n' + 'appnexus.com, 11664, RESELLER';
    }
    if (this.adsenseid == true && this.mcmid == false) {
      this.valueText = 'google.com, ' + this.adsid.replace('ca-', '') + ' , DIRECT, f08c47fec0942fa0';
    }

    if (this.adsenseid == true && this.mcmid == true) {
      this.valueText = 'yahoo.com, 59636, DIRECT, e1a5b5b6e3255540 #SSP' + '\n' + 'indexexchange.com , 175407, RESELLER, 50b1c356f2c5c8fc  #SSP O&O, 3P' + '\n' +
        'pubmatic.com, 156107, RESELLER, 5d62403b186f2ace  #Display' + '\n' + 'rubiconproject.com, 17250, RESELLER, 0bfd66d529a55807' + '\n' + 'appnexus.com, 11664, RESELLER' + '\n' +
        'google.com, ' + this.adsid.replace('ca-', '') + ' , DIRECT, f08c47fec0942fa0';
    }
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

  }




}

