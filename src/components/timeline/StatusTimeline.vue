<template>
  <v-main>
    <h1>{{ title }}</h1>
    <v-timeline single-side="after" :direction="direction" :density="'compact'">
      <v-timeline-item
        v-for="state in states"
        :key="state.name"
        align-dot="start"
        :dot-color="state.color"
      >
        <strong>{{ state.name }}</strong>
        <div class="text-caption mb-2">Hangouts</div>
      </v-timeline-item>
    </v-timeline>
  </v-main>
</template>
<script setup lang="ts">
import type { State } from "../../interfaces/state.interface";
defineProps<{
  title: string;
  direction: "horizontal" | "vertical";
  states: State[];
}>();
</script>
