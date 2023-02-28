import { Component } from '@angular/core';
import { fullListMaleNames } from 'lists/male';
import { fullListFemaleNames } from 'lists/female';
import { MALE_NAMES_MAX_LENGTH } from 'lists/male';
import { FEMALE_NAMES_MAX_LENGTH } from 'lists/female';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.component.html',
  styleUrls: ['./name-generator.component.css'],
})
export class NameGeneratorComponent {
  title = 'app';
  GENERATE_BUTTON_ID = 'generateButton';
  RANDOM_NAMES_RESULTS_PARAGRAPH = 'resultsParagraph';
  NUMBER_OF_NAMES_DESIRED_INPUT = 'numberOfNamesDesiredInputField';
  numberOfNamesDesired = 2;
  MAX_RANDOM_NAMES_ALLOWED = 10;
  genders = ['Female', 'Male', 'Both'];
  chosenGender = 'Female';
  generatedRandomNames = [''];
  resultsParagraphReference: HTMLElement | null = null;
  paragraphLineHeight = '75px';

  ngOnInit() {
    this.resultsParagraphReference = document.getElementById(
      this.RANDOM_NAMES_RESULTS_PARAGRAPH
    );
    this.generateRandomNames();
    this.paragraphLineHeight = 150 / this.numberOfNamesDesired + 'px';
  }

  /**
   * Generates and returns a random number between min (inclusive) and max (exclusive)
   * @param min Minimum number in range to generate
   * @param max Maximum number in range to generate
   * @returns Random number between "min" and "max"
   */
  getRandomArbitrary(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Predicate to check gender is female
   * @returns if chosen gender is female or not
   */
  isGenderFemale() {
    return this.chosenGender === 'Female' ? true : false;
  }

  /**
   * Predicate to check gender is male
   * @returns if chosen gender is male or not
   */
  isGenderMale() {
    return this.chosenGender === 'Male' ? true : false;
  }

  /**
   * Generates a desired number of random names from the given "randomNamesList" of names
   * provided a chosen gender
   */
  generateRandomNames() {
    if (this.numberOfNamesDesired > this.MAX_RANDOM_NAMES_ALLOWED) {
      alert('Maximum number of allowed random names 10');
      return;
    }

    let randomNamesTempList: string[] = [];
    const maxIndex = this.isGenderFemale()
      ? FEMALE_NAMES_MAX_LENGTH - 1
      : MALE_NAMES_MAX_LENGTH - 1;
    if (this.isGenderFemale()) {
      for (let index = 0; index < this.numberOfNamesDesired; index++) {
        const randomIndex = this.getRandomArbitrary(0, maxIndex);
        randomNamesTempList.push(fullListFemaleNames[randomIndex]);
      }
    } else if (this.isGenderMale()) {
      for (let index = 0; index < this.numberOfNamesDesired; index++) {
        const randomIndex = this.getRandomArbitrary(0, maxIndex);
        randomNamesTempList.push(fullListMaleNames[randomIndex]);
      }
    } else {
      const maxIndex =
        FEMALE_NAMES_MAX_LENGTH < MALE_NAMES_MAX_LENGTH
          ? FEMALE_NAMES_MAX_LENGTH
          : MALE_NAMES_MAX_LENGTH;
      for (let index = 0; index < this.numberOfNamesDesired; index++) {
        const randomIndex = this.getRandomArbitrary(0, maxIndex);
        const isFemale = this.getRandomArbitrary(0, 1);
        isFemale
          ? randomNamesTempList.push(fullListFemaleNames[randomIndex])
          : randomNamesTempList.push(fullListMaleNames[randomIndex]);
      }
    }
    this.generatedRandomNames = randomNamesTempList;
  }

  copyToClipboard() {
    const listOfNames = this.generatedRandomNames.map((name) => name).join(' ');
    // Copy the text inside the text field
    if (!listOfNames) {
      return;
    }
    navigator.clipboard.writeText(listOfNames);
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
