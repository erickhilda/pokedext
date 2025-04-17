<script setup lang="ts">
import type { ChainLink, EvolutionChain } from "~/types/evolution";
import type { PokemonSpecies } from "~/types/pokemon";
import EvolutionNode from "./evolution-node.vue";

const props = defineProps<{
  name: string;
}>();

const pokemonName = computed(() => props.name);
const { data: pokemonSpecies } = await useFetch<PokemonSpecies>(
  () => `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.value}`,
  { watch: [pokemonName] },
);
const evolutionChainId = computed(() => {
  const ecArr = pokemonSpecies.value?.evolution_chain.url.split("/");
  if (!ecArr) {
    return 0;
  }
  return ecArr[ecArr?.length - 2];
});
const { data: evolutionChain } = await useFetch<EvolutionChain>(
  () => `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId.value}`,
  { watch: [evolutionChainId] },
);

/**
 * Extracts the sequence of Pokemon names from an evolution chain.
 *
 * @param evolutionChainData The evolution chain data.
 * @returns An array of Pokemon names in the order of evolution,
 * or an empty array if the chain is empty.
 */
function getEvolutionSequence(evolutionChainData: EvolutionChain): string[] {
  const evolutionSequence: string[] = [];

  let currentLink: ChainLink | undefined = evolutionChainData.chain;

  while (currentLink) {
    evolutionSequence.push(currentLink.species.name);
    if (currentLink.evolves_to && currentLink.evolves_to.length > 0) {
      currentLink = currentLink.evolves_to[0];
    } else {
      currentLink = undefined;
    }
  }

  return evolutionSequence;
}

const evolutionChainSpecies = computed(() =>
  getEvolutionSequence(evolutionChain.value ?? []),
);
</script>

<template>
  <div class="px-6 flex items-center justify-center">
    <UCarousel
      v-slot="{ item }"
      arrows
      :items="evolutionChainSpecies"
      class="w-full max-w-xs"
    >
      <EvolutionNode :name="item" />
    </UCarousel>
  </div>
</template>
