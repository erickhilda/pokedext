export function getGenderRatio(rate: number): {
  male: number;
  female: number;
  genderless: boolean;
} {
  const gender = { male: 0, female: 0, genderless: false };
  if (rate === -1) {
    gender.genderless = true;
  } else {
    gender.male = calculateGenderRate(8 - rate);
    gender.female = calculateGenderRate(rate);
  }
  return gender;
}

function calculateGenderRate(rate: number): number {
  return (rate / 8) * 100;
}
