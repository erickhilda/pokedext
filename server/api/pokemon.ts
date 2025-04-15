import fs from "node:fs";
import path from "node:path";
import csv from "csv-parser";
import type { EventHandler } from "h3";
import type { PokemonList } from "../types/pokemon-list";

const pokemonHandler: EventHandler<PokemonList[]> = async (event) => {
  const pokemonData: PokemonList[] = [];
  const filePath = path.resolve(process.cwd(), "server/data/pokemon_list.csv");

  return new Promise<PokemonList[]>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: any) => {
        if (+row.id < 20) {
          // Type assertion here, assuming your CSV columns match the Pokemon interface
          pokemonData.push(row as PokemonList);
        }
      })
      .on("end", () => {
        resolve(pokemonData);
      })
      .on("error", (error) => {
        console.error("Error reading CSV:", error);
        reject({ message: "Failed to read Pokemon data." });
      });
  });
};

export default defineEventHandler(pokemonHandler);
