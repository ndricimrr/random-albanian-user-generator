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
  genders = ['gender.female', 'gender.male'];
  viewTypes = [
    ViewType.JSON,
    ViewType.GRAPHICAL_TABLE,
    ViewType.GRAPHICAL_LIST,
  ];

  @Input() chosenGender: string = Gender.FEMALE;
  @Output() chosenGenderChange = new EventEmitter<string>();

  @Input() chosenViewType: string = ViewType.JSON;
  @Output() chosenViewTypeChange = new EventEmitter<string>();

  @Input() chosenNumberOfUsers: number = 2;
  @Output() chosenNumberOfUsersChange = new EventEmitter<number>();

  @Input() chosenCounty: string = fullListCounties[0];
  @Output() chosenCountyChange = new EventEmitter<string>();

  @Input() ageDesired: number = 18;
  @Output() ageDesiredChange = new EventEmitter<number>();

  counties = fullListCounties;
  translate: TranslateService = TranslateService.prototype;

  constructor(translate: TranslateService) {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('sq');
    this.translate = translate;
  }

  onChosenGenderChange() {
    this.chosenGenderChange.emit(this.chosenGender);
  }

  onChosenViewTypeChange() {
    this.chosenViewTypeChange.emit(this.chosenViewType);
  }

  onChosenNumUsersChange() {
    this.chosenNumberOfUsersChange.emit(this.chosenNumberOfUsers);
  }

  onChosenCountyChange() {
    this.chosenCountyChange.emit(this.chosenCounty);
  }

  onDesiredAgeChange() {
    this.ageDesiredChange.emit(this.ageDesired);
  }
}
