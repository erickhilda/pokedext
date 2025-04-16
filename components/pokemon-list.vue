<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";
import type { NamedAPIResourceList } from "~/types/utility";

const limit = ref(20);
const offset = ref(0);

const {
  data: pokemons,
  status,
  error,
} = await useFetch<NamedAPIResourceList>("https://pokeapi.co/api/v2/pokemon", {
  lazy: true,
  query: { limit, offset },
});

if (error.value) {
  console.error("Failed to fetch Pokemon data:", error.value);
}
const el = useTemplateRef<HTMLElement>("el-list");
useInfiniteScroll(
  el,
  () => {
    limit.value += 20;
  },
  {
    distance: 10,
    canLoadMore: () => {
      if (!pokemons.value?.next || status.value === "pending") {
        return false;
      }
      return true;
    },
  },
);
</script>

<template>
  <div v-if="error" class="text-red-500">
    {{ error }}
  </div>
  <div
    v-else
    ref="el-list"
    class="px-6 pb-6 grid grid-cols-2 gap-3 debug overflow-y-scroll"
    :style="{ maxHeight: 'calc(100vh - 84px)' }"
  >
    <PokemonCard
      v-for="pokemon in pokemons?.results"
      :key="pokemon.name"
      :name="pokemon.name"
      :url="pokemon.url"
    />
  </div>
  <div v-if="status === 'pending'" class="px-6 pb-6 grid grid-cols-2 gap-3">
    <USkeleton
      v-for="tel in 20"
      :key="`skeleton-item-${tel}`"
      class="h-26 w-full rounded-lg"
    />
  </div>
</template>
