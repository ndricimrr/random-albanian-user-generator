import { fullListCounties } from 'lists/counties';
import { ViewType } from '../utils/component-interface';
import { Gender, User } from '../utils/user-interface';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { MAX_AGE_ALLOWED, MAX_RANDOM_NAMES_ALLOWED } from './constants';

@Component({
  selector: 'app-user-generator',
  templateUrl: './user-generator.component.html',
  styleUrls: ['./user-generator.component.css'],
})
export class UserGeneratorComponent {
  ViewTypes = ViewType;
  chosenGender = Gender.FEMALE;
  chosenViewType: ViewType = ViewType.JSON;

  MAX_AGE_ALLOWED = MAX_AGE_ALLOWED;
  MAX_RANDOM_NAMES_ALLOWED = MAX_RANDOM_NAMES_ALLOWED;

  GENERATE_BUTTON_ID = 'generateButton';
  RANDOM_NAMES_RESULTS_PARAGRAPH = 'resultsParagraph';
  NUMBER_OF_NAMES_DESIRED_INPUT = 'numberOfNamesDesiredInputField';

  counties = fullListCounties;
  generatedRandomUsersString: string = '';
  randomUsersList: User[] = [];
  resultsParagraphReference: HTMLElement | null = null;
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
