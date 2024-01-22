import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { UserGeneratorComponent } from "./user-generator/user-generator.component";
import { NameGeneratorComponent } from "./name-generator/name-generator.component";
import { AppRoutingModule } from "./modules/app-routing.module";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { FootNavComponent } from "./foot-nav/foot-nav.component";
import { GridTableViewComponent } from "./user-generator/grid-table-view/users-grid-table-view.component";
import { UserTableViewComponent } from "./user-generator/grid-table-view/user-table-view/user-table-view.component";
import { ControlPanelComponent } from "./user-generator/control-panel/control-panel.component";
import { ListViewComponent } from "./user-generator/list-view/list-view.component";
// import { CodeViewComponent } from "./user-generator/code-view/code-view.component";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { InjectionToken } from "@angular/core";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// export const BASE_HREF = new InjectionToken<string>("BASE_HREF");

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(
//     http,
//     "/random-albanian-user-generator/assets/i18n/",
//     ".json"
//   );
// }

// export function HttpLoaderFactory(http: HttpClient) {
//   const baseHref = document.getElementsByTagName("base")[0].href;

//   return new TranslateHttpLoader(http, `${baseHref}assets/i18n/`, ".json");
// }

@NgModule({
  declarations: [
    AppComponent,
    UserGeneratorComponent,
    NameGeneratorComponent,
    NavigationBarComponent,
    FootNavComponent,
    GridTableViewComponent,
    UserTableViewComponent,
    ControlPanelComponent,
    ListViewComponent,
    // CodeViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      defaultLanguage: "sq",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
