<template>
  <div class="flex justify-center min-h-screen bg-gray-50 p-4">
    <UContainer class="mx-auto debug max-w-[924px]">
      <!-- <header class="py-6"> -->
      <!--   <div class="flex justify-between items-center"> -->
      <!--     <h1 class="text-3xl font-bold">Pokédex</h1> -->
      <!--     <UButton -->
      <!--       :icon=" -->
      <!--         colorMode.value === 'dark' -->
      <!--           ? 'i-heroicons-moon' -->
      <!--           : 'i-heroicons-sun' -->
      <!--       " -->
      <!--       @click="toggleColorMode" -->
      <!--     /> -->
      <!--   </div> -->
      <!--   <div class="mt-4"> -->
      <!--     <UInput -->
      <!--       v-model="searchQuery" -->
      <!--       placeholder="Search Pokémon..." -->
      <!--       icon="i-heroicons-magnifying-glass" -->
      <!--       class="w-full md:w-64" -->
      <!--     /> -->
      <!--   </div> -->
      <!-- </header> -->

      <Suspense>
        <PokemonList :search-query="searchQuery" />
        <template #fallback>
          <div class="col-span-full flex justify-center items-center py-12">
            <USpinner />
          </div>
        </template>
      </Suspense>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const searchQuery = ref("");

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<style>
/* body { */
/*   @apply bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white; */
/* } */
</style>
