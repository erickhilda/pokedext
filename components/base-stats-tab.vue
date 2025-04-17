<script setup lang="ts">
import type { PokemonStat } from "~/types/pokemon";
import { pokemonTypeBackgrounds } from "~/utils/get-pokemon-type-color";

const props = defineProps<{
  stats: PokemonStat[];
  name: string;
  type: string;
}>();
const baseStats = computed(() => props.stats);

const baseStatsText = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

const getPercentage = (value: number) => {
  return Math.min(100, (value / 260) * 100);
};

const total = computed(() => {
  let t = 0;
  const stats = props.stats;

  stats.forEach((s) => {
    t += s.base_stat;
  });

  return t;
});

const statColor = computed(() => pokemonTypeBackgrounds[props.type]);
</script>

<template>
  <div class="p-6">
    <div class="space-y-4">
      <div
        v-for="stat in baseStats"
        :key="`${name}-stat-${stat.stat.name}`"
        class="flex items-center"
      >
        <span class="text-gray-500 dark:text-gray-200 w-28 text-right pr-4">
          {{ baseStatsText[stat.stat.name] }}
        </span>
        <div
          class="flex-1 bg-gray-200 dark:bg-gray-600 h-3 rounded-full overflow-hidden"
        >
          <div
            class="h-full rounded-full"
            :class="statColor"
            :style="{
              width: `${getPercentage(stat.base_stat)}%`,
            }"
          />
        </div>
        <span
          class="text-gray-500 dark:text-gray-200 font-medium w-16 text-right"
        >
          {{ stat.base_stat }}
        </span>
      </div>

      <div
        class="flex items-center justify-end pt-2 border-t border-gray-800 dark:border-gray-500"
      >
        <span class="text-gray-500 dark:text-gray-200 font-medium mr-4">
          Total:
        </span>
        <span
          class="text-gray-500 dark:text-gray-200 font-bold w-16 text-right"
        >
          {{ total }}
        </span>
      </div>
    </div>
  </div>
</template>
