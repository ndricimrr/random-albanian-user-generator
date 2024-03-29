import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CheckboxItem, ViewType } from 'src/app/utils/component-interface';
import { Gender, User } from 'src/app/utils/user-interface';
import { fullListCounties } from 'lists/counties';
import { TranslateService } from '@ngx-translate/core';
import { MAX_AGE_ALLOWED, MAX_RANDOM_NAMES_ALLOWED } from '../constants';
import { getRandomAge, getRandomCounty } from 'src/app/utils/functions';

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

  // booleans to save if any of the chosen options should be random numbers
  isGenderRandom: boolean = false;
  isQuantityRandom: boolean = false;
  isCountyRandom: boolean = false;
  isAgeRandom: boolean = false;
  areAllRandom: boolean | undefined;

  counties = fullListCounties;
  numberOfNamesDesired = 2;

  checkboxItems: CheckboxItem[] = [
    { id: 'name', label: 'UserData.name', isChecked: true },
    { id: 'email', label: 'UserData.email', isChecked: true },
    { id: 'surname', label: 'UserData.surname', isChecked: true },
    { id: 'birthday', label: 'UserData.birthday', isChecked: true },
    { id: 'username', label: 'UserData.username', isChecked: true },
    { id: 'county', label: 'ControlPanel.county', isChecked: true },
    { id: 'gender', label: 'Common.gender', isChecked: true },
    { id: 'address', label: 'UserData.address', isChecked: true },
    { id: 'age', label: 'UserData.age', isChecked: true },
    { id: 'phone', label: 'UserData.phone', isChecked: true },
  ];

  onCheckboxChange(item: CheckboxItem) {
    // console.log(`${item.label} checkbox state changed to ${item.isChecked}`);
  }

  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  ngOnInit() {
    this.generateRandomUsers();
  }

  /**
   * Generates a desired number of random names from the given "randomNamesList" of names
   * provided a chosen gender
   */
  generateRandomUsers() {
    if (this.numberOfNamesDesired > this.MAX_RANDOM_NAMES_ALLOWED) {
      alert(
        this.translate.instant('ControlPanel.alertMaxQuantityExceeded', {
          maxUsers: this.MAX_RANDOM_NAMES_ALLOWED,
        })
      );
      return;
    }
    if (this.numberOfNamesDesired < 0) {
      alert(this.translate.instant('ControlPanel.negativeQuantityAlert'));
      return;
    }
    let randomNamesTempList: User[] = [];
    for (let index = 0; index < this.numberOfNamesDesired; index++) {
      const randomUser = new User(
        !this.isGenderRandom ? this.chosenGender : Gender.RANDOM,
        !this.isAgeRandom ? this.ageDesired : getRandomAge(),
        !this.isCountyRandom ? this.chosenCounty : getRandomCounty()
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

  /**
   * Handles toggling of all sliders
   * @param event event of the slider clicked
   */
  onToggleChange(event: any) {
    if (event.srcElement?.id === 'isGenderRandom') {
      this.isGenderRandom = this.isGenderRandom ? false : true;
    } else if (event.srcElement?.id === 'isQuantityRandom') {
      this.isQuantityRandom = this.isQuantityRandom ? false : true;
    } else if (event.srcElement?.id === 'isCountyRandom') {
      this.isCountyRandom = this.isCountyRandom ? false : true;
    } else if (event.srcElement?.id === 'isAgeRandom') {
      this.isAgeRandom = this.isAgeRandom ? false : true;
    } else if (event.srcElement?.id === 'areAllRandom') {
      this.isGenderRandom = this.isGenderRandom ? false : true;
      this.isQuantityRandom = this.isGenderRandom;
      this.isCountyRandom = this.isGenderRandom;
      this.isAgeRandom = this.isGenderRandom;
      (
        (document.getElementById('isGenderRandom') as HTMLInputElement) ?? {}
      ).checked = this.isGenderRandom;
      (
        (document.getElementById('isQuantityRandom') as HTMLInputElement) ?? {}
      ).checked = this.isGenderRandom;
      (
        (document.getElementById('isCountyRandom') as HTMLInputElement) ?? {}
      ).checked = this.isGenderRandom;
      (
        (document.getElementById('isAgeRandom') as HTMLInputElement) ?? {}
      ).checked = this.isGenderRandom;
    } else {
      console.error('Random selection sliders not working properly', event);
    }
  }
}
