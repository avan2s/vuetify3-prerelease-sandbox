<template>
  <v-main>
    <h1>{{ title }}</h1>
    <!-- <v-btn @click="changeIcon()">ChangeIcon</v-btn> -->
    <v-timeline
      single-side="after"
      :direction="direction"
      density="compact"
      truncate-line="both"
    >
      <v-timeline-item
        v-for="(state, stateIndex) in visibleStates"
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
import { computed, ref, toRefs } from "vue";
import type { State } from "../../interfaces/state.interface";

const props = defineProps<{
  title: string;
  direction: "horizontal" | "vertical";
  states: State[];
}>();

const expandableState: State = {
  name: "Mehr",
  color: "grey",
  icon: "mdi-dots-horizontal",
};

const maxSize = ref(5);
const expandableStatePosition = 2;
const { states } = toRefs(props);

const visibleStates = computed(() => {
  if (states.value.length > maxSize.value) {
    const fromStartToExpandableStates = states.value
      .slice(0, expandableStatePosition)
      .concat([expandableState]);

    const remainingStatesToShow =
      maxSize.value - fromStartToExpandableStates.length;

    return fromStartToExpandableStates.concat(
      states.value.slice(-remainingStatesToShow)
    );
  } else {
    console.log();
    let x = states.value.slice(0, states.value.length);
    console.log(x.map((i) => i.name + " => " + i.icon));
    return x;
  }
});

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
