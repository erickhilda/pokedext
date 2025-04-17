<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { PokemonMove } from "~/types/pokemon";
import { toTitleCase } from "~/utils/string-helpers";

interface GroupedMoves {
  [versionGroup: string]: {
    id: string;
    name: string;
    level_learned_at: number;
    learn_method: string;
  }[];
}

const props = defineProps<{ moves: PokemonMove[] }>();

function groupMovesByVersionGroup(moves: PokemonMove[]): GroupedMoves {
  const movesByVersion: GroupedMoves = {};

  for (const moveEntry of moves) {
    const moveName = moveEntry.move.name;
    for (const versionDetail of moveEntry.version_group_details) {
      const versionGroupName = versionDetail.version_group.name;
      const levelLearnedAt = versionDetail.level_learned_at;
      const moveLearnMethod = versionDetail.move_learn_method.name;

      if (!movesByVersion[versionGroupName]) {
        movesByVersion[versionGroupName] = [];
      }

      movesByVersion[versionGroupName].push({
        id: `${versionGroupName}-${moveName}`,
        name: moveName,
        level_learned_at: levelLearnedAt,
        learn_method: moveLearnMethod,
      });
    }
  }

  return movesByVersion;
}

const moveGroups = groupMovesByVersionGroup(props.moves);
const selectedGroup = ref("sun-moon");
const groupOption = computed(() => {
  return Object.keys(moveGroups).map((k) => ({
    label: toTitleCase(k, "-"),
    value: k,
  }));
});

const columns: TableColumn<GroupedMoves[string][number]>[] = [
  {
    accessorKey: "level_learned_at",
    header: "#",
    cell: ({ row }) => `Lv. ${row.getValue("level_learned_at")}`,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => toTitleCase(row.getValue("name"), "-"),
  },
  {
    accessorKey: "learn_method",
    header: "Learn Method",
    cell: ({ row }) => toTitleCase(row.getValue("learn_method"), "-"),
  },
];
</script>

<template>
  <div class="p-4">
    <USelect v-model="selectedGroup" :items="groupOption" class="w-full" />
    <UTable
      sticky
      :data="
        moveGroups[selectedGroup].sort(
          (a, b) => a.level_learned_at - b.level_learned_at,
        )
      "
      :columns="columns"
      class="flex-1 mt-2 border border-gray-300 dark:border-slate-600 rounded-md"
      :style="{ maxHeight: 'calc(50vh - 148px)' }"
    />
  </div>
</template>
