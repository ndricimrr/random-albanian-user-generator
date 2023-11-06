import { Component, Input } from '@angular/core';
import { User } from 'src/app/utils/user-interface';

@Component({
  selector: 'users-grid-table-view',
  templateUrl: './users-grid-table-view.component.html',
  styleUrls: ['./users-grid-table-view.component.css'],
})
export class GridTableViewComponent {
  @Input() listOfUsers: User[] = [];
}
