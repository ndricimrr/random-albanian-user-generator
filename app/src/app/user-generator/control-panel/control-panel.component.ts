import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewType } from 'src/app/utils/component-interface';
import { Gender, User } from 'src/app/utils/user-interface';
import { fullListCounties } from 'lists/counties';
import { TranslateService } from '@ngx-translate/core';
import { MAX_AGE_ALLOWED, MAX_RANDOM_NAMES_ALLOWED } from '../constants';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent {
  usersList: User[] = [];
  @Output() userListUpdated = new EventEmitter<User[]>();
  chosenViewType: ViewType = ViewType.JSON;
  @Output() chosenViewTypeUpdated = new EventEmitter<ViewType>();
  onChosenViewTypeChange() {
    this.chosenViewTypeUpdated.emit(this.chosenViewType);
  }
  genders = ['gender.female', 'gender.male'];
  viewTypes = [
    ViewType.JSON,
    ViewType.GRAPHICAL_TABLE,
    ViewType.GRAPHICAL_LIST,
  ];
  MAX_AGE_ALLOWED = MAX_AGE_ALLOWED;
  MAX_RANDOM_NAMES_ALLOWED = MAX_RANDOM_NAMES_ALLOWED;
  chosenGender: Gender = Gender.FEMALE;
  chosenNumberOfUsers: number = 2;
  chosenCounty: string = fullListCounties[0];
  ageDesired: number = 18;
  counties = fullListCounties;
  numberOfNamesDesired = 2;

  checkboxItems = [
    { id: 1, label: 'Gender 1', isChecked: false },
    { id: 2, label: 'Option 2', isChecked: false },
    { id: 3, label: 'Option 3', isChecked: false },
  ];

  constructor(translate: TranslateService) {}

  ngOnInit() {
    this.generateRandomUsers();
  }

  /**
   * Generates a desired number of random names from the given "randomNamesList" of names
   * provided a chosen gender
   */
  generateRandomUsers() {
    if (this.numberOfNamesDesired > this.MAX_RANDOM_NAMES_ALLOWED) {
      alert('Maximum number of allowed random users allowed 10');
      return;
    }

    let randomNamesTempList: User[] = [];

    for (let index = 0; index < this.numberOfNamesDesired; index++) {
      const randomUser = new User(
        this.chosenGender,
        this.ageDesired,
        this.chosenCounty
      );
      randomNamesTempList.push(randomUser);
    }
    this.usersList = randomNamesTempList;
    this.userListUpdated.emit(this.usersList);
  }
}
