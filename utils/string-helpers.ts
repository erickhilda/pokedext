/**
 * Converts a string to title case, replacing the specified separator with a space, without using regular expressions.
 *
 * @param inputString The string to convert.
 * @param separator The separator to replace (e.g., "-").
 * @returns The string in title case (e.g., "Swords Dance"). Returns an empty string if input is null or empty.
 */
export function toTitleCase(inputString: string, separator: string): string {
  if (!inputString) {
    return "";
  }

  let replacedString = "";
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === separator) {
      replacedString += " ";
    } else {
      replacedString += inputString[i];
    }
  }

  const words = replacedString.split(" ");
  const titleCaseWords = words.map((word) => {
    if (word) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    return "";
  });
  return titleCaseWords.join(" ");
}
