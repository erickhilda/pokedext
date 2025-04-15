export const pokemonTypeBackgrounds: { [key: string]: string } = {
  normal: "bg-normal",
  fire: "bg-fire",
  water: "bg-water",
  grass: "bg-grass",
  electric: "bg-electric",
  ice: "bg-ice",
  fighting: "bg-fighting",
  poison: "bg-poison",
  ground: "bg-ground",
  flying: "bg-flying",
  psychic: "bg-psychic",
  bug: "bg-bug",
  rock: "bg-rock",
  ghost: "bg-ghost",
  dragon: "bg-dragon",
  steel: "bg-steel",
  dark: "bg-dark",
  fairy: "bg-fairy",
};

export const pokemonTypeGradientBackgrounds: { [key: string]: string } = {
  normal: "to-normal",
  fire: "to-fire",
  water: "to-water",
  grass: "to-grass",
  electric: "to-electric",
  ice: "to-ice",
  fighting: "to-fighting",
  poison: "to-poison",
  ground: "to-ground",
  flying: "to-flying",
  psychic: "to-psychic",
  bug: "to-bug",
  rock: "to-rock",
  ghost: "to-ghost",
  dragon: "to-dragon",
  steel: "to-steel",
  dark: "to-dark",
  fairy: "to-fairy",
};

export const typeColors: { [key: string]: string } = {
  bug: "#8fc23f",
  dark: "#5a5366",
  dragon: "#176cc5",
  electric: "#f4d23c",
  fairy: "#ed8ce5",
  fighting: "#ce406a",
  fire: "#ff9c54",
  flying: "#8fa8dd",
  ghost: "#5369ac",
  grass: "#60b953",
  ground: "#d97644",
  ice: "#73cec0",
  normal: "#9099a1",
  poison: "#a566c7",
  psychic: "#f86d74",
  rock: "#c7b68b",
  steel: "#53879c",
  water: "#4e90d6",
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
