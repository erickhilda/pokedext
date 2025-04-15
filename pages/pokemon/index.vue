<script lang="ts" setup>
const searchQuery = ref("");
</script>

<template>
  <Suspense>
    <PokemonList :search-query="searchQuery" />
    <template #fallback>
      <div class="grid grid-cols-2 gap-3">
        <USkeleton
          v-for="el in 20"
          :key="`skeleton-item-${el}`"
          class="h-26 w-full rounded-lg"
        />
      </div>
    </template>
  </Suspense>
</template>
