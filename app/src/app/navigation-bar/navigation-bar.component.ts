import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  currentLanguage: string;
  activeLink: string = 'generate-users';

  constructor(private languageService: TranslateService) {
    const currentPageLink = window.location.pathname.substring(1) || '';
    this.activeLink = currentPageLink;

    const storedLanguage = sessionStorage.getItem('language');
    this.currentLanguage = storedLanguage || languageService.currentLang;
    this.languageService.use(this.currentLanguage);
  }

  changeLanguage(language: string): void {
    this.currentLanguage = language;
    this.languageService.use(language);
    sessionStorage.setItem('language', language);
  }
}
