<script lang="ts" setup>
const searchQuery = ref("");
</script>

<template>
  <div class="overflow-hidden" :style="{ maxHeight: 'calc(100vh - 84px)' }">
    <Suspense>
      <PokemonList :search-query="searchQuery" />
      <template #fallback>
        <div class="px-6 pb-6 grid grid-cols-2 gap-3">
          <USkeleton
            v-for="el in 20"
            :key="`skeleton-item-${el}`"
            class="h-26 w-full rounded-lg"
          />
        </div>
      </template>
    </Suspense>
  </div>
</template>
