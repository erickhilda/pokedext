export const typeColors: { [key: string]: string } = {
  normal: "#a8a878",
  fire: "#f08030",
  water: "#6890f0",
  grass: "#78c850",
  electric: "#f8d030",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038f8",
  steel: "#b8b8d0",
  fairy: "#f0b6bc",
};
/**
 * Returns the background color of a Pokemon based on its type(s).
 *
 * @param types A string or a list of strings representing the Pokemon's type(s).
 * If it's a list, the color of the first type in the list will be returned.
 * @returns A string representing the hexadecimal color code (e.g., "neutral-300"),
 * or null if the type is not found in the defined colors.
 */
export function getPokemonTypeColor(types: string | string[]): string | null {
  if (typeof types === "string") {
    const typeLower = types.toLowerCase();
    if (typeLower in typeColors) {
      return typeColors[typeLower];
    } else {
      return null;
    }
  } else if (Array.isArray(types) && types.length > 0) {
    const firstTypeLower = types[0].toLowerCase();
    if (firstTypeLower in typeColors) {
      return typeColors[firstTypeLower];
    } else {
      return null;
    }
  } else {
    return null;
  }
}
