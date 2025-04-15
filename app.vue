<template>
  <div
    class="flex justify-center min-h-screen max-w-lg bg-slate-50 dark:bg-slate-700 mx-auto"
  >
    <UContainer :ui="{ body: 'p-0 debug' }">
      <header class="py-6 sticky">
        <div class="flex justify-between items-center">
          <h1 v-if="route.path === '/pokemon'" class="text-3xl font-bold">
            Pokédex
          </h1>
          <NuxtLink v-else to="/pokemon">
            <UButton
              icon="i-heroicons-chevron-left"
              variant="ghost"
              size="xl"
            />
          </NuxtLink>
          <UButton
            color="primary"
            size="xl"
            :icon="
              colorMode.value === 'dark'
                ? 'i-heroicons-moon'
                : 'i-heroicons-sun'
            "
            @click="toggleColorMode"
          />
        </div>
        <!-- <div class="mt-4"> -->
        <!--   <UInput -->
        <!--     v-model="searchQuery" -->
        <!--     placeholder="Search Pokémon..." -->
        <!--     icon="i-heroicons-magnifying-glass" -->
        <!--     class="w-full md:w-64" -->
        <!--   /> -->
        <!-- </div> -->
      </header>

      <NuxtPage />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { NuxtPage } from "#components";

const route = useRoute();
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
