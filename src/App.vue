<template>
  <v-app>
    <v-main>
      <h1>Lets drive a car</h1>
      <v-container>
        <v-navigation-drawer app>
          <h1>Somesidebar</h1>
        </v-navigation-drawer>
        <v-select
          :items="selectItems"
          label="Brand"
          v-model="carFilter.selectedBrand"
          v-on:select="onElementClick('select')"
        ></v-select>
        <v-btn>Search</v-btn>

        <v-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th class="text-center">Power (PS)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in desserts"
                :key="item.name"
                v-on:click="onElementClick('row')"
              >
                <td class="text-left">{{ item.name }}</td>
                <td class="text-left">{{ item.brand }}</td>
                <td class="text-left">{{ item.power }}</td>
              </tr>
            </tbody>
          </template>
        </v-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",

  components: {
    HelloWorld,
  },

  data() {
    return {
      selectItems: ["Audi", "BMW", "Ferrari", "Mercedes"],
      desserts: [
        {
          name: "A4 Avant",
          brand: "Audi",
          power: 200,
        },
        {
          name: "Q7 4M",
          brand: "Audi",
          power: 400,
        },
        {
          name: "M140i",
          brand: "BMW",
          power: 272,
        },
        {
          name: "M3e46",
          brand: "BMW",
          power: 305,
        },
        {
          name: "F40",
          brand: "Ferrari",
          power: 600,
        },
        {
          name: "Ferrari 512 BB",
          brand: "Ferrari",
          power: 500,
        },
        {
          name: "Mercedes Benz A 180",
          brand: "Mercedes",
          power: 116,
        },
        {
          name: "Mercedes-Benz E-Klasse Mercedes-AMG",
          brand: "Mercedes",
          power: 435,
        },
      ],
      carFilter: {
        selectedBrand: "Audi",
      },
    };
  },

  methods: {
    onElementClick(clickedElement) {
      console.log("clicked on " + clickedElement);
    },
  },
});
</script>
