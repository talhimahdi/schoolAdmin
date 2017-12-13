import { Component, OnInit, transition } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    $.getScript('assets/theme-assets/js/lib/jquery.nanoscroller.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/menubar/sidebar.js', function () { });
    $.getScript('assets/theme-assets/js/lib/preloader/pace.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/bootstrap.min.js', function () { });
    /*$.getScript('assets/theme-assets/js/lib/weather/jquery.simpleWeather.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/weather/weather-init.js', function () { });*/
    $.getScript('assets/theme-assets/js/lib/circle-progress/circle-progress.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/circle-progress/circle-progress-init.js', function () { });
    /*$.getScript('assets/theme-assets/js/lib/chartist/chartist.min.js', function () { });*/
    $.getScript('assets/theme-assets/js/lib/chartist/chartist-init.js', function () { });
    $.getScript('assets/theme-assets/js/lib/sparklinechart/jquery.sparkline.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/sparklinechart/sparkline.init.js', function () { });
    $.getScript('assets/theme-assets/js/lib/owl-carousel/owl.carousel.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/owl-carousel/owl.carousel-init.js', function () { });

    $.getScript('assets/theme-assets/js/lib/calendar-2/moment.latest.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/calendar-2/semantic.ui.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/calendar-2/prism.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/calendar-2/pignose.calendar.min.js', function () { });
    $.getScript('assets/theme-assets/js/lib/calendar-2/pignose.init.js', function () { });
    $.getScript('assets/theme-assets/js/scripts.js', function () { });
  }

}
