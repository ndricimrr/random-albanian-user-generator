import { Component } from '@angular/core';
import { ViewType } from 'src/app/utils/component-interface';
import { Gender, User } from 'src/app/utils/user-interface';
import { fullListCounties } from 'lists/counties';
import { TranslateService } from '@ngx-translate/core';

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
  chosenGender = Gender.FEMALE;
  chosenViewType: ViewType = ViewType.JSON;
  numberOfNamesDesired = 2;
  MAX_RANDOM_NAMES_ALLOWED = 10;
  MAX_AGE_ALLOWED = 100;
  ageDesired = 18;
  chosenCounty = fullListCounties[0];
  counties = fullListCounties;
  translate: TranslateService = TranslateService.prototype;

  constructor(translate: TranslateService) {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('sq');
    this.translate = translate;
  }
}
