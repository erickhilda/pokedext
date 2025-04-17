<script setup lang="ts">
import type { Pokemon } from "~/types/pokemon";
import ElementBadge from "./element-badge.vue";

const props = defineProps<{ name: string }>();

const pokemonName = computed(() => props.name);
const { data: pokemon } = await useFetch<Pokemon>(
  () => `https://pokeapi.co/api/v2/pokemon/${pokemonName.value}`,
  { watch: [pokemonName] },
);

const pokemonTypes = computed(
  () => pokemon.value?.types.map((t) => t.type.name) ?? ["normal"],
);
</script>

<template>
  <div
    class="flex items-center justify-center"
    :style="{ minHeight: 'calc(50vh - 112px)' }"
  >
    <NuxtLink :to="`/pokemon/${name}`" class="group">
      <div
        class="flex flex-col items-center w-full justify-center transition-transform group-hover:scale-105"
      >
        <div class="relative">
          <div
            class="absolute inset-0 rounded-full blur-md opacity-30"
            :style="{ backgroundColor: `var(--color-${pokemonTypes[0]})` }"
          />
          <div
            class="relative z-30 rounded-full p-2 border border-step-4 bg-white dark:bg-slate-800 backdrop-blur-sm"
            :style="{ borderColor: `var(--color-${pokemonTypes[0]})` }"
          >
            <ElementBadge
              :types="pokemonTypes"
              :name="name"
              class="absolute bottom-0 left-10"
            />
            <NuxtImg
              :src="
                pokemon?.sprites.other?.['official-artwork']?.[
                  'front_default'
                ] ?? ''
              "
              :alt="name"
              width="160"
              height="160"
              class="w-40 h-40"
            />
          </div>
        </div>
        <span class="mt-2 font-medium capitalize">{{ pokemon?.name }}</span>
        <span class="text-sm">
          #{{ pokemon?.id.toString().padStart(4, "0") }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
