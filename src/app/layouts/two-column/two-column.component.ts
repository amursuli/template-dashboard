import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-two-column',
  templateUrl: './two-column.component.html',
  styleUrls: ['./two-column.component.scss'],
})

/**
 * TwoColumnComponent
 */
export class TwoColumnComponent implements OnInit {
  constructor(private eventService: EventService) {}
  isCondensed = false;

  ngOnInit(): void {
    if (document.documentElement.clientWidth <= 767) {
      document.documentElement.setAttribute('data-layout', 'vertical');
    } else {
      document.documentElement.setAttribute('data-layout', 'twocolumn');
    }
    document.body.classList.add('twocolumn-panel');
    document.documentElement.setAttribute('data-topbar', 'light');
    document.documentElement.setAttribute('data-sidebar', 'dark');
    document.documentElement.setAttribute('data-sidebar-size', 'lg');
    document.documentElement.setAttribute('data-layout-style', 'default');
    document.documentElement.setAttribute('data-layout-mode', 'light');
    document.documentElement.setAttribute('data-layout-width', 'fluid');
    document.documentElement.setAttribute('data-layout-position', 'fixed');
    document.documentElement.setAttribute('data-preloader', 'disable');

    window.addEventListener('resize', function () {
      if (document.documentElement.getAttribute('data-layout') == 'twocolumn') {
        if (document.documentElement.clientWidth <= 767) {
          document.documentElement.setAttribute('data-layout', 'vertical');
          document.getElementById('side-bar')?.classList.remove('d-none');
        } else {
          document.documentElement.setAttribute('data-layout', 'twocolumn');
          document.getElementById('side-bar')?.classList.add('d-none');
        }
      }
    });
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu(): void {
    if (document.documentElement.clientWidth <= 767) {
      document.body.classList.toggle('vertical-sidebar-enable');
    } else {
      document.body.classList.toggle('twocolumn-panel');
    }
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked(): void {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', 'visibility: visible;');
    }
  }

  onResize(event: any): void {
    if (document.body.getAttribute('layout') == 'twocolumn') {
      if (event.target.innerWidth <= 767) {
        this.eventService.broadcast('changeLayout', 'vertical');
        document.querySelector('.hamburger-icon')?.classList.remove('open');
      } else {
        this.eventService.broadcast('changeLayout', 'twocolumn');
        document.body.classList.remove('vertical-sidebar-enable');
      }
    }
  }

  isTwoColumnLayoutRequested(): boolean {
    return 'twocolumn' === document.documentElement.getAttribute('data-layout');
  }

  issemiboxLayoutRequested(): boolean {
    return 'semibox' === document.documentElement.getAttribute('data-layout');
  }
}
