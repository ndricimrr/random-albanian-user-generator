import { Component, Input } from '@angular/core';
import { User } from 'src/app/utils/user-interface';

@Component({
  selector: 'users-grid-table-view',
  templateUrl: './users-grid-table-view.component.html',
  styleUrls: ['./users-grid-table-view.component.css'],
})
export class GridTableViewComponent {
  _listOfUsers: User[] = [];

  // Add input setter and getter to react upon list changing.
  // Intention is to keep the column filling left to right instead of the opposite
  @Input()
  set listOfUsers(value: User[]) {
    this._listOfUsers = value;
    this.increment = this._listOfUsers.length % 2 === 0 ? 0 : 1;
  }

  get listOfUsers(): User[] {
    return this._listOfUsers;
  }

  increment: number = 1;
}
