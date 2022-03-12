<template>
  <v-icon v-on:click="onStateClick(state)">mdi-cancel</v-icon>
  <v-main>
    <h1>{{ title }}</h1>
    <v-timeline single-side="after" :direction="direction" :density="'compact'">
      <v-timeline-item
        v-for="(state, stateIndex) in states"
        :key="stateIndex"
        :dot-color="state.color"
        align-dot="start"
        fill-dot
        large
      >
        <template v-slot:icon>
          <v-btn
            class="ma-2"
            text
            icon
            :color="state.color"
            @click="onStateClick(state)"
          >
            <v-icon v-if="state.icon">{{ state.icon }}</v-icon>
          </v-btn>
        </template>
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

const onStateClick = (state: State) => {
  console.log("clicked on " + state.name);
};
</script>
