import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/utils/user-interface';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent {
  @Input() userList: User[] = [];

  constructor(translate: TranslateService) {}
}
