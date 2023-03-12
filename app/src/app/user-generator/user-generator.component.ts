import { Component } from '@angular/core';
import { fullListCounties } from 'lists/counties';
import { ViewType } from '../utils/component-interface';
import { Gender, User } from '../utils/user-interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-generator',
  templateUrl: './user-generator.component.html',
  styleUrls: ['./user-generator.component.css'],
})
export class UserGeneratorComponent {
  title = 'app';
  GENERATE_BUTTON_ID = 'generateButton';
  RANDOM_NAMES_RESULTS_PARAGRAPH = 'resultsParagraph';
  NUMBER_OF_NAMES_DESIRED_INPUT = 'numberOfNamesDesiredInputField';
  numberOfNamesDesired = 2;
  MAX_RANDOM_NAMES_ALLOWED = 3;
  MAX_AGE_ALLOWED = 100;
  ageDesired = 18;
  genders = ['gender.f', 'gender.m'];
  counties = fullListCounties;
  chosenCounty = fullListCounties[0];
  chosenGender = Gender.FEMALE;
  chosenViewType: ViewType = ViewType.GRAPHICAL_TABLE;
  ViewType = ViewType;
  viewTypes = [
    ViewType.GRAPHICAL_TABLE,
    ViewType.JSON,
    ViewType.GRAPHICAL_LIST,
  ];
  generatedRandomUsersString: string = '';
  generatedRandomUsersObject: User[] = [];
  resultsParagraphReference: HTMLElement | null = null;
  paragraphLineHeight = '75px';
  translate: TranslateService = TranslateService.prototype;

  constructor(translate: TranslateService) {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('sq');
    this.translate = translate;
  }

  ngOnInit() {
    this.resultsParagraphReference = document.getElementById(
      this.RANDOM_NAMES_RESULTS_PARAGRAPH
    );
    this.generateRandomUsers();
    this.paragraphLineHeight = 150 / this.numberOfNamesDesired + 'px';
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
    this.generatedRandomUsersObject = randomNamesTempList;
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
