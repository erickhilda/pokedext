<script setup lang="ts">
import type { Pokemon } from "~/types/pokemon";
import type { TabsItem } from "@nuxt/ui";
import AboutTab from "~/components/about-tab.vue";

const route = useRoute();
const baseUrl = "https://pokeapi.co/api/v2";

const items = ref<TabsItem[]>([
  {
    label: "About",
    content: AboutTab,
  },
  {
    label: "Base Stats",
  },
  {
    label: "Evolution",
  },
  {
    label: "Moves",
  },
]);

const activeTab = ref("0");

const pokemonName = computed(() => route.params.name);
const { data: pokemon } = await useFetch<Pokemon>(
  () => `${baseUrl}/pokemon/${pokemonName.value}`,
  {
    watch: [pokemonName],
  },
);

const generateBackgroundColor = computed(() => {
  const type = pokemon.value?.types[0].type.name;
  if (!type) {
    return "";
  }
  return `bg-radial-[at_50%_75%] from-white ${pokemonTypeGradientBackgrounds[type]} to-90%`;
});
</script>

<template>
  <div
    class="flex flex-col w-full rounded-t-3xl"
    :class="generateBackgroundColor"
  >
    <Suspense>
      <div class="w-full overflow-hidden">
        <div class="flex pt-4 flex-col mx-6 relative over">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-bold capitalize">
                {{ pokemon?.name }}
              </h1>
              <div class="flex gap-2 mt-2">
                <NuxtImg
                  v-for="t in pokemon?.types"
                  :key="`${pokemon?.name}-timg-${t.type.name}`"
                  :src="`/icon/${t.type.name}.svg`"
                  :alt="t.type.name"
                  height="24"
                  width="24"
                  class="drop-shadow-md"
                />
              </div>
            </div>
            <div class="text-xl">
              #{{ pokemon?.id.toString().padStart(4, "0") }}
            </div>
          </div>

          <div class="flex justify-center mt-4">
            <NuxtImg
              :src="pokemon?.sprites.other['official-artwork']['front_default']"
              alt="Bulbasaur"
              width="{200}"
              height="{200}"
              class="relative z-10 drop-shadow-lg z-20"
            />
          </div>

          <Pokeball class="w-60 h-60 rotate-12 -bottom-1 -right-8" />
        </div>

        <div
          class="bg-white dark:bg-slate-800 rounded-t-3xl py-4 px-6 relative z-30"
        >
          <UTabs
            v-model="activeTab"
            color="neutral"
            variant="link"
            :items="items"
            class="w-full"
          >
            <template #content="{ item }">
              <component
                :is="item.content"
                :pokemon="pokemon"
                :name="pokemon?.name ?? ''"
              />
            </template>
          </UTabs>
        </div>
      </div>
      <template #fallback>
        <div>loading</div>
      </template>
    </Suspense>
  </div>
</template>
