<template>
  <div
    class="flex flex-col min-h-screen max-w-lg bg-slate-100 dark:bg-slate-700 mx-auto"
  >
    <header class="p-6" :class="{ 'shadow-lg': route.path === '/' }">
      <div class="flex justify-between items-center">
        <h1 v-if="route.path === '/'" class="text-3xl font-bold">Pokédex</h1>
        <NuxtLink v-else to="/">
          <UButton icon="i-heroicons-chevron-left" variant="ghost" size="xl" />
        </NuxtLink>
        <UButton
          color="primary"
          variant="subtle"
          size="xl"
          :icon="
            colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'
          "
          @click="toggleColorMode"
        />
      </div>
    </header>

    <NuxtPage />
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
