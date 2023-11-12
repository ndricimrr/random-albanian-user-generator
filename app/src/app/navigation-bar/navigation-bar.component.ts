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
    this.currentLanguage = languageService.currentLang;
  }

  changeLanguage(language: string): void {
    this.languageService.use(language);
    this.currentLanguage = this.languageService.currentLang;
  }
}
