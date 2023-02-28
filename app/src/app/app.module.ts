import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserGeneratorComponent } from './user-generator/user-generator.component';
import { NameGeneratorComponent } from './name-generator/name-generator.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { PageSwitcherComponent } from './page-switcher/page-switcher.component';

@NgModule({
  declarations: [AppComponent, UserGeneratorComponent, NameGeneratorComponent, PageSwitcherComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
