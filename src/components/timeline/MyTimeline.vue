<template>
  <v-main>
    <h1>{{ title }}</h1>
    <v-btn @click="removeFirstState()">Remove first</v-btn>
    <v-btn @click="removeLastState()">Remove Last</v-btn>

    <div v-for="(state, stateIndex) in states" :key="stateIndex">
      <span>{{ state.name }}</span>
      <span>{{ state.color }}</span>
      <v-icon v-if="state.icon">{{ state.icon }}</v-icon>
      <span>{{ state.icon }}</span>
    </div>

    <v-timeline
      single-side="after"
      :direction="direction"
      density="compact"
      truncate-line="both"
    >
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
        <div class="text-caption mb-2">{{ state.icon }}</div>
        <span>{{ state.color }}</span>
        <v-icon v-if="state.icon">{{ state.icon }}</v-icon>
      </v-timeline-item>
    </v-timeline>
  </v-main>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { State } from "../../interfaces/state.interface";
import { MOCK_STATES } from "../../model/mock-states.";

const props = defineProps<{
  title: string;
  direction: "horizontal" | "vertical";
  states: State[];
}>();

const states = ref<State[]>(MOCK_STATES);

const removeFirstState = () => {
  states.value[0].icon = states.value[1].icon;
  states.value.splice(0, 1);
};

const removeLastState = () => {
  states.value.pop();
};

const expandableState = reactive<State>({
  name: "Mehr",
  color: "grey",
  icon: "mdi-dots-horizontal",
});

const maxSize = ref(5);
const expandableStatePosition = 2;

const onStateClick = (state: State) => {
  if (state === expandableState) {
    console.log("expand");
    expandStateTimeline();
  } else {
    console.log("clicked on " + state.name);
  }
};

const expandStateTimeline = () => {
  maxSize.value = props.states.length;
};
</script>
<style>
div.v-timeline-divider__line {
  background-color: black;
  height: 3px !important;
}
</style>
