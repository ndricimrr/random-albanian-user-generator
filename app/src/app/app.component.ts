import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "app";
  GENERATE_BUTTON_ID = "generateButton";
  RANDOM_NAMES_RESULTS_PARAGRAPH = "resultsParagraph";
  NUMBER_OF_NAMES_DESIRED_INPUT = "numberOfNamesDesiredInputField";
  numberOfNamesDesired = 2;
  MAX_RANDOM_NAMES_ALLOWED = 4;
  genders = ["Female", "Male"];
  chosenGender = "Female";
  generatedRandomNames = ["test1"]
  randomNamesList = {
    female: [
      "Teuta",
      "Ana",
      "Besa",
      "Zamira"
    ],
    male: [
      "Agron",
      "Ilir",
      "Shpetim",
      "Festim",
    ]
  }

  ngOnInit() {
    this.generateRandomNames();
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
  isGenderFemale(){
    return this.chosenGender === "Female" ? true : false;
  }

  /**
   * Generates a desired number of random names from the given "randomNamesList" of names
   * provided a chosen gender
   */
  generateRandomNames(){
    let randomNamesTempList :string[] = [];
    for (let index = 0; index < this.numberOfNamesDesired; index++) {
      const randomIndex = this.getRandomArbitrary(0,3);
      this.isGenderFemale() ?
        randomNamesTempList.push(this.randomNamesList.female[randomIndex]) :
        randomNamesTempList.push(this.randomNamesList.male[randomIndex]);
    }
    this.generatedRandomNames = randomNamesTempList;
  }
  
}
