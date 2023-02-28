import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { NameGeneratorComponent } from '../name-generator/name-generator.component';
import { UserGeneratorComponent } from '../user-generator/user-generator.component';

const routes: Routes = [
  { path: 'generate-names', component: NameGeneratorComponent },
  { path: 'generate-users', component: UserGeneratorComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
