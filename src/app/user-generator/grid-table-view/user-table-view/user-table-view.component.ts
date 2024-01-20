import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/utils/user-interface';

@Component({
  selector: 'user-table-view',
  templateUrl: './user-table-view.component.html',
  styleUrls: ['./user-table-view.component.css'],
})
export class UserTableViewComponent {
  @Input() listOfUsers: User[] = [];

  constructor(translate: TranslateService) {}
}
