import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckboxItem, ViewType } from 'src/app/utils/component-interface';
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
  genders: string[] = Object.values(Gender);
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

  checkboxItems: CheckboxItem[] = [
    { id: 'name', label: 'UserData.name', isChecked: true },
    { id: 'surname', label: 'UserData.surname', isChecked: true },
    { id: 'gender', label: 'Common.gender', isChecked: true },
    { id: 'age', label: 'UserData.age', isChecked: true },
    { id: 'county', label: 'ControlPanel.county', isChecked: true },
    { id: 'username', label: 'UserData.username', isChecked: true },
    { id: 'birthday', label: 'UserData.birthday', isChecked: true },
    { id: 'address', label: 'UserData.address', isChecked: true },
    { id: 'email', label: 'UserData.email', isChecked: true },
    { id: 'phone', label: 'UserData.phone', isChecked: true },
  ];

  onCheckboxChange(item: CheckboxItem) {
    // console.log(`${item.label} checkbox state changed to ${item.isChecked}`);
    // You can perform additional logic here
  }

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
    const listOfPropertiesToRemove: string[] = this.checkboxItems
      .filter((item) => !item.isChecked)
      .map((item) => item.id);

    // filter out user data properties as needed
    const filteredPropertiesList = randomNamesTempList.map((user: User) => {
      listOfPropertiesToRemove.forEach((prop) => delete (user as any)[prop]);
      return user;
    });

    this.usersList = filteredPropertiesList;
    this.userListUpdated.emit(this.usersList);
  }

  /**
   * Resets the state of checkboxes by setting the 'isChecked' property to true for each item.
   *
   */
  resetCheckbox(): void {
    this.checkboxItems.forEach((item) => (item.isChecked = true));
  }
}
