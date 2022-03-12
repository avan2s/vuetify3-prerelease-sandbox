<template>
  <v-app>
    <v-navigation-drawer expand-on-hover rail app>
      <con-sidebar-content></con-sidebar-content>
    </v-navigation-drawer>
    <v-main>
      <h1>Lets drive a car</h1>
      <car-table></car-table>
      <h1>Statusverlauf Parent</h1>
      <v-timeline :direction="'horizontal'" density="compact">
        <v-timeline-item
          v-for="(state, stateIndex) in states"
          :key="stateIndex"
          align-dot="start"
          :dot-color="state.color"
        >
          <strong>{{ state.name }}</strong>
          <div class="text-caption mb-2">Hangouts</div>
        </v-timeline-item>
      </v-timeline>
      <v-container>
        <status-timeline
          title="Statusverlauf as child Own component"
          direction="horizontal"
          :states="states"
        ></status-timeline>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import StatusTimeline from "./components/timeline/StatusTimeline.vue";
import { MOCK_STATES } from "./model/mock-states.";
import CarTable from "./components/table/CarTable.vue";
import ConSidebarContent from "./components/ConSidebarContent.vue";

const states = ref(MOCK_STATES);
</script>
