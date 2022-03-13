<template>
  <v-main>
    <h1>{{ title }}</h1>
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
import { computed, ref, toRefs, reactive } from "vue";
import type { State } from "../../interfaces/state.interface";

const props = defineProps<{
  title: string;
  direction: "horizontal" | "vertical";
  states: State[];
}>();

const expandableState = reactive<State>({
  name: "Mehr",
  color: "grey",
  icon: "mdi-dots-horizontal",
});

// const expandableState: State = {
//   name: "Mehr",
//   color: "grey",
//   icon: "mdi-dots-horizontal",
// };

const maxSize = ref(5);
const expandableStatePosition = 2;

const visibleStates = computed(() => {
  if (props.states.length > maxSize.value) {
    const fromStartToExpandableStates = props.states
      .slice(0, expandableStatePosition)
      .concat([expandableState]);

    const remainingStatesToShow =
      maxSize.value - fromStartToExpandableStates.length;

    const x = fromStartToExpandableStates.concat(
      props.states.slice(-remainingStatesToShow)
    );
    console.log(x);
    return x;
  } else {
    let x = props.states.slice(0, props.states.length);
    // console.log(x.map((i) => i.name + " => " + i.icon));
    console.log(x);
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
