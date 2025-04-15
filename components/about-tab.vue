<script setup lang="ts">
import type { Pokemon, PokemonSpecies } from "~/types/pokemon";

const props = defineProps<{
  pokemon: Pokemon;
  name: string;
}>();

const pokemonName = computed(() => props.name);
const { data: pokemonSpecies } = await useFetch<PokemonSpecies>(
  () => `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.value}`,
  { watch: [pokemonName] },
);

const abilities = computed(() => props.pokemon.abilities);

const genderRatio = computed(() => {
  if (!pokemonSpecies.value) {
    return null;
  }
  return getGenderRatio(pokemonSpecies.value?.gender_rate);
});
</script>

<template>
  <div class="mt-4 space-y-4 h-full">
    <div class="grid grid-cols-2 gap-4">
      <div class="text-gray-500 dark:text-gray-200">Species</div>
      <div class="text-gray-700 dark:text-gray-500 capitalize">
        {{ pokemonSpecies?.name }}
      </div>
      <div class="text-gray-500 dark:text-gray-200">Height</div>
      <div class="text-gray-700 dark:text-gray-500">
        {{ convertDecimeterToMeter(pokemon.height) }}m
      </div>

      <div class="text-gray-500 dark:text-gray-200">Weight</div>
      <div class="text-gray-700 dark:text-gray-500">
        {{ convertHectogramsToKilograms(pokemon.weight) }}kg
      </div>

      <div class="text-gray-500 dark:text-gray-200">Abilities</div>
      <div class="text-gray-700 capitalize dark:text-gray-500">
        {{ abilities.map((a) => a.ability.name).join(", ") }}
      </div>
    </div>

    <div class="pt-4">
      <h3 class="font-bold text-gray-800 dark:text-white mb-2">Breeding</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="text-gray-500 dark:text-gray-200">Gender</div>
        <div v-if="genderRatio" class="text-gray-700 dark:text-gray-500">
          <span class="text-blue-500 mr-2"
            >♂ {{ (genderRatio.male / 8) * 100 }}%</span
          >
          <span class="text-pink-500"
            >♀ {{ (genderRatio.female / 8) * 100 }}%</span
          >
        </div>

        <div class="text-gray-500 dark:text-gray-200">Egg Groups</div>
        <div class="text-gray-700 capitalize dark:text-gray-500">
          {{ pokemonSpecies?.egg_groups.map((eg) => eg.name).join(", ") }}
        </div>

        <div class="text-gray-500 dark:text-gray-200">Egg Cycle</div>
        <div class="text-gray-700 dark:text-gray-500">
          {{ pokemonSpecies?.hatch_counter }}
        </div>
      </div>
    </div>
  </div>
</template>
