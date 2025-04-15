export function getGenderRatio(genderRateId: number): {
  male: number;
  female: number;
  genderless: boolean;
} {
  const gender = { male: 0, female: 0, genderless: false };
  switch (genderRateId) {
    case -1:
    case 7:
      gender.genderless = true;
      break;
    case 0:
      gender.male = 7;
      gender.female = 1;
      break;
    case 1:
      gender.male = 6;
      gender.female = 2;
      break;
    case 2:
      gender.male = 4;
      gender.female = 4;
      break;
    case 3:
      gender.male = 2;
      gender.female = 6;
      break;
    case 4:
      gender.male = 1;
      gender.female = 7;
      break;
    case 5:
    case 8:
      gender.male = 0;
      gender.female = 8;
      break;
    case 6:
      gender.male = 8;
      gender.female = 0;
      break;
    default:
      break;
  }

  return gender;
}
