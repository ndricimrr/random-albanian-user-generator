import { fullListCounties } from "lists/counties";
import { fullListFemaleNames } from "lists/female";
import { fullListFemalePaths } from "lists/female_image_paths";
import { fullListMaleNames } from "lists/male";
import { fullListSurnames } from "lists/surnames";
import { fullListMalePaths } from "lists/male_image_paths";
import { fullListStreetsByCity } from "lists/streets";
import { Address, AgeGroup, Gender, PicturePath } from "./user-interface";

/**
 * Generates and returns a random number between min (inclusive) and max (exclusive)
 * @param min Minimum number in range to generate
 * @param max Maximum number in range to generate
 * @returns Random number between "min" and "max"
 */
export function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * TODO: Specify limits for dates if birthday not arrived yet
 * Generate a random birthday date month and year based on a given current age
 * @param age current age
 * @returns birthday in format DD.MM.YYYY
 */
export function getRandomBirthday(age: number): string {
  const date = getRandomNumber(1, 30);
  const month = getRandomNumber(1, 12);
  const birthYear = new Date().getFullYear() - age;
  return date + "." + month + "." + birthYear;
}

/**
 * Generates a random phone number from the main phone operators in Albania
 *
 */
export function getRandomPhoneNumber(): string {
  const operators = ["7", "8", "9"];
  const operatorIndex = getRandomNumber(0, operators.length - 1);
  const firstTwo = getRandomNumber(10, 100);
  const secondTwo = getRandomNumber(11, 99);
  const thirdThree = getRandomNumber(100, 1000);
  return (
    "+355" + "6" + operators[operatorIndex] + firstTwo + secondTwo + thirdThree
  );
}

/**
 * Generates a random email address based on name and surname
 * @param name name base for generated email
 * @param surname surname base for generated email
 * @returns random email string
 */
export function getRandomEmail(name: string, surname: string): string {
  const separators = [".", "_", "", "-"];
  const separatorIndex = getRandomNumber(0, separators.length - 1);
  const nameSurname =
    name[0].toLowerCase() + separators[separatorIndex] + surname.toLowerCase();
  const surnameName =
    surname[0].toLowerCase() + separators[separatorIndex] + name.toLowerCase();
  const randomNumber = getRandomNumber(0, 20);
  const isRandomNumberAdded = !!getRandomNumber(0, 1);
  const isNameFirst = !!getRandomNumber(0, 1);
  const emailUsername = (isNameFirst ? nameSurname : surnameName).concat(
    isRandomNumberAdded ? randomNumber + "" : ""
  );
  return emailUsername + "@" + "example.com";
}

/**
 * Generates a random address given a county. Picks random county if none given
 * @param county county chosen
 * @returns random address from given county
 */
export function getRandomAddress(county: string): Address {
  const listOfStreetByCity = fullListStreetsByCity;
  const randomStreets: string[] =
    listOfStreetByCity[county as keyof typeof listOfStreetByCity];
  const maxIndex = randomStreets.length - 1;
  return {
    number: getRandomNumber(1, 20),
    name: randomStreets[getRandomNumber(0, maxIndex)],
  };
}

/**
 * Returns a random county from list of counties of Albania
 *
 */
export function getRandomCounty(): string {
  const maxIndex = fullListCounties.length - 1;
  if (maxIndex < 0) {
    console.error("Failed to get random county");
    return "";
  }
  return fullListCounties[getRandomNumber(0, maxIndex)];
}

export function getRandomGender(): Gender {
  return !!(getRandomNumber(0, 20) % 2) ? Gender.FEMALE : Gender.MALE;
}

/**
 * Returns a random female name from list of female names
 *
 */
export function getRandomFemaleName(): string {
  const maxIndex = fullListFemaleNames.length - 1;
  if (maxIndex < 0) {
    console.error("Failed to generate random male name");
    return "";
  }
  return fullListFemaleNames[getRandomNumber(0, maxIndex)];
}

/**
 * Returns a random male name from list of male names
 *
 */
export function getRandomMaleName(): string {
  const maxIndex = fullListMaleNames.length - 1;
  if (maxIndex < 0) {
    console.error("Failed to generate random male name");
    return "";
  }
  return fullListMaleNames[getRandomNumber(0, maxIndex)];
}

/**
 * Returns a random male name from list of male names
 *
 */
export function getRandomSurname(): string {
  const maxIndex = fullListSurnames.length - 1;
  if (maxIndex < 0) {
    console.error("Failed to generate random surnames");
    return "";
  }
  return fullListSurnames[getRandomNumber(0, maxIndex)];
}

/**
 * TODO: Update age boundaries when random images of older faces generated
 * Get random age starting from 18 till 70.
 * @returns random age of an adult
 */
export function getRandomAge(): number {
  return getRandomNumber(18, 70);
}

/**
 * Get random username from name and surname
 * @returns random username
 */
export function getRandomUsername(name: string, surname: string): string {
  const separators = [".", "_", "", "-"];
  const separatorIndex = getRandomNumber(0, separators.length - 1);
  const nameSurname =
    name.toLowerCase() + separators[separatorIndex] + surname.toLowerCase();
  const surnameName =
    surname.toLowerCase() + separators[separatorIndex] + name.toLowerCase();
  const randomNumber = getRandomNumber(0, 20);
  const isRandomNumberAdded = !!(getRandomNumber(0, 10) % 2);
  const isNameFirst = !!(getRandomNumber(0, 10) % 2);

  return (
    (isNameFirst ? nameSurname : surnameName) +
    (isRandomNumberAdded ? randomNumber + "" : "")
  );
}

/**
 * Returns age group from given age
 * @param age given age
 * @returns respective age group
 */
export function getAgeGroupFromAge(age: number): AgeGroup {
  if (age >= 18 && age <= 25) {
    return AgeGroup.G_18_25;
  } else if (age >= 26 && age <= 30) {
    return AgeGroup.G_26_30;
  } else if (age >= 31 && age <= 35) {
    return AgeGroup.G_31_35;
  } else if (age >= 36 && age <= 40) {
    return AgeGroup.G_36_40;
  } else if (age >= 41 && age <= 50) {
    return AgeGroup.G_41_50;
  } else if (age >= 51 && age <= 60) {
    return AgeGroup.G_51_60;
  } else if (age >= 61 && age <= 70) {
    return AgeGroup.G_61_70;
  } else if (age >= 71 && age <= 80) {
    return AgeGroup.G_71_80;
  } else if (age >= 81 && age <= 90) {
    return AgeGroup.G_81_90;
  } else {
    return AgeGroup.G_26_30;
  }
}

/**
 * Returns a random male image path from given age
 * @param age given age
 * @returns respective image path
 */
export function getRandomMaleImagePaths(age: number): PicturePath {
  const ageGroup: string = getAgeGroupFromAge(age);
  const picturePathsByAgeGroup: PicturePath[] =
    fullListMalePaths[ageGroup as keyof typeof fullListMalePaths];
  const maxIndex = picturePathsByAgeGroup.length - 1;
  if (maxIndex < 0) {
    console.error("Failed to get male image path from age");
  }
  return picturePathsByAgeGroup[getRandomNumber(0, maxIndex)];
}

/**
 * Returns a random female image path from given age
 * @param age given age
 * @returns respective image path
 */
export function getRandomFemaleImagePaths(age: number): PicturePath {
  const ageGroup: string = getAgeGroupFromAge(age);
  const picturePathsByAgeGroup: PicturePath[] =
    fullListFemalePaths[ageGroup as keyof typeof fullListFemalePaths];
  const maxIndex = picturePathsByAgeGroup.length - 1;
  if (maxIndex < 0) {
    console.error("Failed to get female image path from age");
  }
  return picturePathsByAgeGroup[getRandomNumber(0, maxIndex)];
}

/**
 * Generates the path of the corresponding image of the user given age group, picturePath and gender
 * @param ageGroup given age group of the user
 * @param picturePath given picture path object
 * @param gender given gender
 * @returns string with the path loation
 */
export function getAssetsImagePath(
  ageGroup: AgeGroup,
  picturePath: PicturePath,
  gender: Gender
): string {
  const imagesDir = "assets/images/";
  const genderFolder = gender === Gender.FEMALE ? "female/" : "male/";
  return imagesDir + genderFolder + ageGroup + "/" + picturePath.large + ".jpg";
}
