<template>
  <NuxtLink
    :to="`/pokemon/${pokemonList.name}`"
    class="transition-transform hover:-translate-y-1"
  >
    <UCard
      :ui="{ body: `!p-0 overflow-hidden rounded-lg` }"
      variant="subtle"
      :style="typeClass"
    >
      <div class="flex justify-between relative">
        <div class="flex flex-col pl-4 py-4">
          <h3 class="font-semibold capitalize">{{ pokemonList.name }}</h3>
          <p class="text-sm">#{{ pokemonList.id.padStart(4, "0") }}</p>
          <span class="text-xs font-light italic">
            {{ pokemonTypes.join(", ") }}
          </span>
          <div class="flex mt-1">
            <span
              v-for="(t, idx) in pokemonTypes"
              :key="`${pokemonList.name}-tc-${t}`"
              class="inline-block rounded-full border"
              :class="{ 'w-4 h-4': idx === 0, 'w-3 h-3 mt-1 -ml-2': idx === 1 }"
              :style="{ background: `var(--color-${t})` }"
            />
          </div>
        </div>
        <NuxtImg
          :src="pokemonList.official_artwork"
          :alt="pokemonList.name"
          class="absolute right-2 bottom-2 z-20 aspect-square object-cover h-17 w-17 lg:w-20 lg:h-20"
        />
        <Pokeball />
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PokemonList } from "~/server/types/pokemon-list";
import { pokemonTypeBackgrounds } from "~/utils/get-pokemon-type-color";

const props = defineProps<{
  pokemonList: PokemonList;
}>();

const pokemonTypes = computed(() =>
  props.pokemonList.types.replace("[", "").replace("]", "").split(" "),
);

const typeClass = computed(() => {
  const types = pokemonTypes.value;
  if (types.length === 1) {
    return {
      backgroundImage: `linear-gradient(150deg, var(--color-${types[0]}), transparent)`,
    };
  } else if (pokemonTypes.value.length > 1) {
    return {
      backgroundImage: `linear-gradient(150deg, var(--color-${types[0]}), var(--color-${types[1]}))`,
    };
  } else {
    return {}; // Or a default background class like 'bg-gray-100'
  }
});
</script>
