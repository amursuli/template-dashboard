import { Component, OnInit } from '@angular/core';

// Swiper Slider
import { TokenStorageService } from '../../../../core/services/token-storage.service';

import { projectList, document } from './data';
import { ProjectListModel, DocumentModel } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

/**
 * Profile Component
 */
export class ProfileComponent implements OnInit {
  projectList!: ProjectListModel[];
  document!: DocumentModel[];
  userData: any;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.userData = this.tokenStorageService.getUser();
    /**
     * Fetches the data
     */
    this.fetchData();
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.projectList = projectList;
    this.document = document;
  }

  /**
   * Swiper setting
   */
  config = {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 25,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  };
}
