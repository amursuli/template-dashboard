import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventService } from '../../core/services/event.service';

//Logout
import { AuthenticationService } from '../../core/services/auth.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { Router } from '@angular/router';

// Language
import { CartModel } from './topbar.model';
import { cartData } from './data';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  element: any;
  mode: string | undefined;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  cartData!: CartModel[];
  total = 0;
  cart_length: any = 0;
  userData: any;

  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private eventService: EventService,
    private authService: AuthenticationService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.userData = this.tokenStorageService.getUser();
    this.element = document.documentElement;

    //  Fetch Data
    this.cartData = cartData;
    this.cart_length = this.cartData.length;
    this.cartData.forEach((item) => {
      let item_price = item.quantity * item.price;
      this.total += item_price;
    });
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    if (document.documentElement.clientWidth > 767) {
      document.querySelector('.hamburger-icon')?.classList.toggle('open');
    }
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (!document.fullscreenElement && !this.element.mozFullScreenElement && !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.body.setAttribute('data-layout-mode', 'light');
        document.body.setAttribute('data-sidebar', 'light');
        break;
      case 'dark':
        document.body.setAttribute('data-layout-mode', 'dark');
        document.body.setAttribute('data-sidebar', 'dark');
        break;
      default:
        document.body.setAttribute('data-layout-mode', 'light');
        break;
    }
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  windowScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      (document.getElementById('back-to-top') as HTMLElement).style.display = 'block';
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      (document.getElementById('back-to-top') as HTMLElement).style.display = 'none';
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }

  // Delete Item
  deleteItem(event: Event, id: string) {
    const target = event.target as HTMLElement;
    const dropdownItem = target.closest('.dropdown-item');
    if (!dropdownItem) {
      return;
    }

    const priceElement = dropdownItem.querySelector('.item_price') as HTMLElement;
    if (!priceElement) {
      return;
    }

    const price = parseFloat(priceElement.innerHTML);
    const total_price = this.total - price;
    this.total = total_price;
    this.cart_length -= 1;

    const emptyCartElement = document.getElementById('empty-cart') as HTMLElement;
    emptyCartElement.style.display = this.total > 1 ? 'none' : 'block';

    const itemElement = document.getElementById('item_' + id);
    if (itemElement) {
      itemElement.remove();
    }
  }

  // Search Topbar
  Search() {
    const input = document.getElementById('search-options') as HTMLInputElement;
    const filter = input.value.toUpperCase();
    const dropdown = document.getElementById('search-dropdown') as HTMLElement;
    const searchOptions = document.getElementById('search-close-options') as HTMLElement;

    if (filter.length > 0) {
      dropdown.classList.add('show');
      searchOptions.classList.remove('d-none');

      const notifyItems = document.getElementsByClassName('notify-item');

      Array.from(notifyItems).forEach((element: any) => {
        let notifiTxt = '';

        if (element.querySelector('h6')) {
          const spanText = element.getElementsByTagName('span')[0].innerText.toLowerCase();
          const name = element.querySelector('h6')?.innerText.toLowerCase();
          notifiTxt = name?.includes(filter) ? name : spanText;
        } else if (element.getElementsByTagName('span')) {
          notifiTxt = element.getElementsByTagName('span')[0].innerText.toLowerCase();
        }

        element.style.display = notifiTxt.includes(filter) ? 'block' : 'none';
      });
    } else {
      dropdown.classList.remove('show');
      searchOptions.classList.add('d-none');
    }
  }

  /**
   * Search Close Btn
   */
  closeBtn() {
    const searchOptions = document.getElementById('search-close-options') as HTMLAreaElement;
    const dropdown = document.getElementById('search-dropdown') as HTMLAreaElement;
    const searchInputReponsive = document.getElementById('search-options') as HTMLInputElement;
    dropdown.classList.remove('show');
    searchOptions.classList.add('d-none');
    searchInputReponsive.value = '';
  }
}
