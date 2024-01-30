import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.css"],
})
export class NavigationBarComponent {
  currentLanguage: string;
  activeLink: string = "generate-users";

  constructor(
    private languageService: TranslateService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the current page link after each navigation
        const currentPageLink = this.router.url.substring(1) || "";
        this.activeLink = currentPageLink;
      }
    });

    const storedLanguage = sessionStorage.getItem("language");
    this.currentLanguage = storedLanguage || languageService.currentLang;
    this.languageService.use(this.currentLanguage);
  }

  changeLanguage(language: string): void {
    this.currentLanguage = language;
    this.languageService.use(language);
    sessionStorage.setItem("language", language);
  }
}
