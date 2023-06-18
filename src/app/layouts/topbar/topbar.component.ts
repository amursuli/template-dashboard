import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventService } from '../../core/services/event.service';

//Logout
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
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
    private authFackservice: AuthfakeauthenticationService,
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

  /***
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: '', lang: 'en' },
    { text: 'Española', flag: '', lang: 'es' },
    { text: 'Deutsche', flag: '', lang: 'de' },
    { text: 'Italiana', flag: '', lang: 'it' },
    { text: 'русский', flag: '', lang: 'ru' },
    { text: '中国人', flag: '', lang: 'ch' },
    { text: 'français', flag: '', lang: 'fr' },
    { text: 'Arabic', flag: '', lang: 'ar' },
  ];

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
  deleteItem(event: any, id: any) {
    let price = event.target.closest('.dropdown-item').querySelector('.item_price').innerHTML;
    let Total_price = this.total - price;
    this.total = Total_price;
    this.cart_length = this.cart_length - 1;
    this.total > 1
      ? ((document.getElementById('empty-cart') as HTMLElement).style.display = 'none')
      : ((document.getElementById('empty-cart') as HTMLElement).style.display = 'block');
    document.getElementById('item_' + id)?.remove();
  }

  // Search Topbar
  Search() {
    const searchOptions = document.getElementById('search-close-options') as HTMLAreaElement;
    const dropdown = document.getElementById('search-dropdown') as HTMLAreaElement;
    let input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById('search-options') as HTMLAreaElement;
    filter = input.value.toUpperCase();
    let inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add('show');
      searchOptions.classList.remove('d-none');
      let inputVal = input.value.toUpperCase();
      let notifyItem = document.getElementsByClassName('notify-item');

      Array.from(notifyItem).forEach(function (element: any) {
        let notifiTxt = '';
        if (element.querySelector('h6')) {
          let spantext = element.getElementsByTagName('span')[0].innerText.toLowerCase();
          let name = element.querySelector('h6').innerText.toLowerCase();
          if (name.includes(inputVal)) {
            notifiTxt = name;
          } else {
            notifiTxt = spantext;
          }
        } else if (element.getElementsByTagName('span')) {
          notifiTxt = element.getElementsByTagName('span')[0].innerText.toLowerCase();
        }
        if (notifiTxt) element.style.display = notifiTxt.includes(inputVal) ? 'block' : 'none';
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
