import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  
  constructor() { 
    $(function() {
    var header = $("#navs");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 200) {
            header.addClass("hd");
        } else {
            header.removeClass("hd");
        }
    });
  });
  }

  ngOnInit() {

  }

  scroll(el) {
	    el.scrollIntoView({ 
		    behavior: 'smooth', 
		    block: 'start'
		  },
		);
  }

}
