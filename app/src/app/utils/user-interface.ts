import {
  getRandomBirthday,
  getRandomEmail,
  getRandomPhoneNumber,
  getRandomCounty,
  getRandomAddress,
  getRandomAge,
  getRandomUsername,
  getRandomMaleName,
  getRandomFemaleName,
  getRandomSurname,
  getRandomFemaleImagePaths,
  getRandomGender,
  getRandomMaleImagePaths,
  getAgeGroupFromAge,
  getAssetsImagePath,
} from './functions';

export interface Address {
  number?: number;
  name?: string;
}

export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}

export interface PicturePath {
  large: string;
  medium: string;
  thumbnail: string;
}

export enum AgeGroup {
  G_18_25 = '18_25',
  G_26_30 = '26_30',
  G_31_35 = '31_35',
  G_36_40 = '36_40',
  G_41_50 = '41_50',
  G_51_60 = '51_60',
  G_61_70 = '61_70',
  G_71_80 = '71_80',
  G_81_90 = '81_90',
}

export class User {
  name?: string;
  surname?: string;
  gender?: Gender;
  age?: number;
  county?: string;
  username?: string;
  birthday?: string;
  address?: Address;
  email?: string;
  phone?: string;
  picturePath?: PicturePath;
  builtPicturePath?: string;
  ageGroup?: AgeGroup;

  constructor(gender?: Gender, age?: number, county?: string) {
    this.gender = gender ? gender : getRandomGender();
    this.age = age ? age : getRandomAge();
    this.county = county ? county : getRandomCounty();

    this.name =
      this.gender === Gender.FEMALE
        ? getRandomFemaleName()
        : getRandomMaleName();
    this.surname = getRandomSurname();
    this.username = getRandomUsername(this.name, this.surname);
    this.birthday = getRandomBirthday(this.age);
    this.address = getRandomAddress(this.county);
    this.email = getRandomEmail(this.name, this.surname);
    this.phone = getRandomPhoneNumber();
    this.picturePath =
      this.gender === Gender.FEMALE
        ? getRandomFemaleImagePaths(this.age)
        : getRandomMaleImagePaths(this.age);
    this.ageGroup = getAgeGroupFromAge(this.age);
    this.builtPicturePath = getAssetsImagePath(
      this.ageGroup,
      this.picturePath,
      this.gender
    );
  }
}
