<template>
  <div class="flex min-h-screen">
    <Suspense>
      <div class="w-full overflow-hidden">
        <div class="">
          <div class="mt-4 flex justify-between items-start">
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
                />
              </div>
            </div>
            <div class="font-semibold">#001</div>
          </div>

          <div class="flex justify-center mt-4">
            <NuxtImg
              :src="pokemon?.sprites.other['official-artwork']['front_default']"
              alt="Bulbasaur"
              width="{200}"
              height="{200}"
              class-name="relative z-10"
            />
          </div>
        </div>

        <!-- <div class="bg-white rounded-t-3xl p-6"> -->
        <!--   <div class="flex border-b"> -->
        <!--     <button -->
        <!--       class={cn( -->
        <!--         "pb-2 px-4 text-sm font-medium", -->
        <!--         activeTab === "about" ? "text-emerald-500 border-b-2 border-emerald-500" : "text-gray-500", -->
        <!--       )} -->
        <!--       onClick={() => setActiveTab("about")} -->
        <!--     > -->
        <!--       About -->
        <!--     </button> -->
        <!--     <button -->
        <!--       class={cn( -->
        <!--         "pb-2 px-4 text-sm font-medium", -->
        <!--         activeTab === "stats" ? "text-emerald-500 border-b-2 border-emerald-500" : "text-gray-500", -->
        <!--       )} -->
        <!--       onClick={() => setActiveTab("stats")} -->
        <!--     > -->
        <!--       Base Stats -->
        <!--     </button> -->
        <!--     <button -->
        <!--       class={cn( -->
        <!--         "pb-2 px-4 text-sm font-medium", -->
        <!--         activeTab === "evolution" ? "text-emerald-500 border-b-2 border-emerald-500" : "text-gray-500", -->
        <!--       )} -->
        <!--       onClick={() => setActiveTab("evolution")} -->
        <!--     > -->
        <!--       Evolution -->
        <!--     </button> -->
        <!--     <button -->
        <!--       class={cn( -->
        <!--         "pb-2 px-4 text-sm font-medium", -->
        <!--         activeTab === "moves" ? "text-emerald-500 border-b-2 border-emerald-500" : "text-gray-500", -->
        <!--       )} -->
        <!--       onClick={() => setActiveTab("moves")} -->
        <!--     > -->
        <!--       Moves -->
        <!--     </button> -->
        <!--   </div> -->
        <!---->
        <!--   {activeTab === "about" && ( -->
        <!--     <div class="mt-4 space-y-4"> -->
        <!--       <div class="grid grid-cols-2 gap-4"> -->
        <!--         <div class="text-gray-500">Species</div> -->
        <!--         <div class="text-gray-700">Seed</div> -->
        <!---->
        <!--         <div class="text-gray-500">Height</div> -->
        <!--         <div class="text-gray-700">2'4" (0.70 cm)</div> -->
        <!---->
        <!--         <div class="text-gray-500">Weight</div> -->
        <!--         <div class="text-gray-700">15.2 lbs (6.9 kg)</div> -->
        <!---->
        <!--         <div class="text-gray-500">Abilities</div> -->
        <!--         <div class="text-gray-700">Overgrow, Chlorophyll</div> -->
        <!--       </div> -->
        <!---->
        <!--       <div class="pt-4"> -->
        <!--         <h3 class="font-bold text-gray-800 mb-2">Breeding</h3> -->
        <!--         <div class="grid grid-cols-2 gap-4"> -->
        <!--           <div class="text-gray-500">Gender</div> -->
        <!--           <div class="text-gray-700"> -->
        <!--             <span class="text-blue-500 mr-2">♂ 87.5%</span> -->
        <!--             <span class="text-pink-500">♀ 12.5%</span> -->
        <!--           </div> -->
        <!---->
        <!--           <div class="text-gray-500">Egg Groups</div> -->
        <!--           <div class="text-gray-700">Monster</div> -->
        <!---->
        <!--           <div class="text-gray-500">Egg Cycle</div> -->
        <!--           <div class="text-gray-700">Grass</div> -->
        <!--         </div> -->
        <!--       </div> -->
        <!--     </div> -->
        <!--   )} -->
        <!---->
        <!--   {activeTab === "stats" && <div class="mt-4 space-y-2 h-full">{/* Stats content would go here */}</div>} -->
        <!---->
        <!--   {activeTab === "evolution" && <div class="mt-4">{/* Evolution content would go here */}</div>} -->
        <!---->
        <!--   {activeTab === "moves" && <div class="mt-4">{/* Moves content would go here */}</div>} -->
        <!-- </div> -->
      </div>
      <template #fallback>
        <div>loading</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from "~/types/pokemon";

const route = useRoute();
const baseUrl = "https://pokeapi.co/api/v2";
const activeTab = ref("about");

const pokemonName = computed(() => route.params.name);
const { data: pokemon } = await useFetch<Pokemon>(
  () => `${baseUrl}/pokemon/${pokemonName.value}`,
  {
    watch: [pokemonName],
  },
);

console.log(pokemon.value);
</script>
