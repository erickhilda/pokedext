<script setup lang="ts">
const props = defineProps<{ name: string; types: string[] }>();
</script>

<template>
  <div class="flex mt-1">
    <span
      v-for="(t, idx) in types"
      :key="`${name}-tc-${t}`"
      class="inline-block rounded-full border"
      :class="{
        'w-4 h-4': idx === 0,
        'w-3 h-3 mt-1 -ml-2': idx === 1,
      }"
      :style="{ background: `var(--color-${t})` }"
    />
  </div>
</template>
