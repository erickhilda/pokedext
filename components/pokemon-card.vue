<script setup lang="ts">
import type { Pokemon } from "~/types/pokemon";
import type { NamedAPIResource } from "~/types/utility";
import ElementBadge from "./element-badge.vue";

const props = defineProps<NamedAPIResource>();

const name = computed(() => props.name);

const { data: pokemon } = await useFetch<Pokemon>(
  () => `https://pokeapi.co/api/v2/pokemon/${name.value}`,
  { watch: [name] },
);

const pokemonTypes = computed(
  () => pokemon.value?.types.map((t) => t.type.name) ?? [],
);

const typeClass = computed(() => {
  if (!pokemonTypes.value) {
    return {};
  }
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
    return {};
  }
});
</script>

<template>
  <Suspense>
    <NuxtLink
      :to="`/pokemon/${name}`"
      class="transition-transform hover:-translate-y-1"
    >
      <UCard
        :ui="{ body: `!p-0 overflow-hidden rounded-lg` }"
        variant="subtle"
        :style="typeClass"
      >
        <div class="flex justify-between relative">
          <div class="flex flex-col pl-4 py-4">
            <h3 class="font-semibold capitalize">{{ pokemon?.name }}</h3>
            <p v-if="pokemon?.id" class="text-sm">
              #{{ pokemon?.id.toString().padStart(4, "0") }}
            </p>
            <span
              v-if="pokemonTypes && pokemonTypes?.length"
              class="text-xs font-light italic"
            >
              {{ pokemonTypes?.join(", ") }}
            </span>
            <div class="flex mt-1">
              <ElementBadge :types="pokemonTypes" :name="name" />
            </div>
          </div>
          <NuxtImg
            :src="
              pokemon?.sprites.other?.['official-artwork']?.['front_default'] ??
              ''
            "
            :alt="pokemon?.name"
            class="absolute right-2 bottom-2 z-20 aspect-square object-cover h-17 w-17 lg:w-20 lg:h-20"
          />
          <Pokeball />
        </div>
      </UCard>
    </NuxtLink>
    <template #fallback>
      <div>...loading</div>
    </template>
  </Suspense>
</template>
