import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  currentLanguage: string;

  constructor(private languageService: TranslateService) {
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
