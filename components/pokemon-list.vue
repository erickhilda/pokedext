<template>
  <div v-if="error" class="text-red-500">
    {{ error }}
  </div>
  <div v-else>
    <div class="grid grid-cols-2 gap-3">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon-list="pokemon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokemonList } from "~/server/types/pokemon-list";

const limit = ref(10);
const offset = ref(0);

const { data: pokemons, error } = await useFetch<PokemonList[]>("/api/pokemon");

if (error.value) {
  console.error("Failed to fetch Pokemon data:", error.value);
}
</script>
