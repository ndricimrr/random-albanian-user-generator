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

  MAX_AGE_ALLOWED = MAX_AGE_ALLOWED;
  MAX_RANDOM_NAMES_ALLOWED = MAX_RANDOM_NAMES_ALLOWED;

  chosenGender: Gender = Gender.FEMALE;
  // @Output() chosenGenderChange = new EventEmitter<string>();

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

  numberOfNamesDesired = 2;
  // chosenGender = Gender.FEMALE;

  GENERATE_BUTTON_ID = 'generateButton';
  RANDOM_NAMES_RESULTS_PARAGRAPH = 'resultsParagraph';
  NUMBER_OF_NAMES_DESIRED_INPUT = 'numberOfNamesDesiredInputField';

  generatedRandomUsersString: string = '';
  randomUsersList: User[] = [];
  resultsParagraphReference: HTMLElement | null = null;

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

  ngOnInit() {
    this.resultsParagraphReference = document.getElementById(
      this.RANDOM_NAMES_RESULTS_PARAGRAPH
    );
    this.generateRandomUsers();
    this.translate.use('sq');
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
    this.randomUsersList = randomNamesTempList;
    this.generatedRandomUsersString = JSON.stringify(
      randomNamesTempList,
      undefined,
      4
    );
  }

  /**
   * Copies contents of the generated random users into a stringified json format
   */
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedRandomUsersString);
    const copiedMessageElement = document.getElementById('copiedMessage');
    if (!copiedMessageElement) {
      return;
    }
    copiedMessageElement.style.visibility = 'visible';
    setTimeout(() => {
      copiedMessageElement.style.visibility = 'hidden';
    }, 1000);
  }
}
