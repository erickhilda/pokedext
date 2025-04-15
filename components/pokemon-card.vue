<template>
  <NuxtLink
    :to="`/pokemon/${pokemonList.name}`"
    class="transition-transform hover:scale-105"
  >
    <UCard
      :ui="{ body: { padding: 'p-4' } }"
      class="pokemon-card"
      :style="typeClass"
    >
      <div class="flex justify-between">
        <div class="flex flex-col">
          <h3 class="font-semibold text-white">{{ pokemonList.name }}</h3>
          <h3 class="font-semibold text-white">
            #{{ pokemonList.id.padStart(4, "0") }}
          </h3>
          <div class="flex">
            <span
              v-for="t in pokemonTypes"
              :key="`${pokemonList.name}-tt-${t}`"
              class="text-xs font-light italic"
            >
              {{ t }},
            </span>
          </div>
          <div class="flex">
            <span
              v-for="t in pokemonTypes"
              :key="`${pokemonList.name}-tc-${t}`"
              class="inline-block rounded-full h-4 w-4 border"
              :style="{ background: typeColors[t] }"
            />
          </div>
        </div>
        <NuxtImg
          :src="pokemonList.official_artwork"
          :alt="pokemonList.name"
          width="96"
          height="96"
          class="relative z-10"
        />
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PokemonList } from "~/server/types/pokemon-list";
import { typeColors } from "~/utils/get-pokemon-type-color";

const props = defineProps<{
  pokemonList: PokemonList;
}>();

const pokemonTypes = computed(() =>
  props.pokemonList.types.replace("[", "").replace("]", "").split(" "),
);

const typeClass = computed(() => {
  if (pokemonTypes.value.length === 1) {
    return { backgroundColor: typeColors[pokemonTypes.value[0]] };
  } else if (pokemonTypes.value.length > 1) {
    const gradientColors = pokemonTypes.value.map((c) => typeColors[c]);
    return {
      backgroundImage: `radial-gradient(560px circle at 90% 110%, rgba(var(--el2) / .6), transparent 40%) ${gradientColors.join(", ")})`,
    };
  } else {
    return {}; // Or a default background class like 'bg-gray-100'
  }
});
</script>

<style scoped>
.pokemon-card {
  transition: transform 0.2s;
}

.pokemon-card:hover {
  transform: translateY(-4px);
}
</style>
