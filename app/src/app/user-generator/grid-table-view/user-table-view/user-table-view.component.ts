import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-table-view',
  templateUrl: './user-table-view.component.html',
  styleUrls: ['./user-table-view.component.css'],
})
export class UserTableViewComponent {
  @Input() listOfUsers: any[] = [];
}
