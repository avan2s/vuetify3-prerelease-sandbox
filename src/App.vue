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
        <v-btn v-on:click="search()">Search</v-btn>
        <v-btn v-on:click="clearFilter()">Clear Filter</v-btn>
        <v-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th class="text-left">Power (PS)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in cars"
                :key="item.name"
                v-on:click="onElementClick('row')"
              >
                <td class="text-left">{{ item.name }}</td>
                <td class="text-left">{{ item.brand }}</td>
                <td class="text-left">{{ item.power }}</td>
              </tr>
            </tbody>
          </template>
          <template v-slot:footer>sdsd</template>
        </v-table>
        <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-container class="max-width">
                  <v-pagination
                    v-model="page"
                    class="my-4"
                    :length="pageCount"
                  ></v-pagination>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { CARS } from "./model/cars";

export default defineComponent({
  name: "App",

  components: {
    HelloWorld,
  },

  data() {
    return {
      selectItems: ["Audi", "BMW", "Ferrari", "Mercedes"],
      cars: [],
      page: 1,
      pageCount: 5,
      carFilter: {
        selectedBrand: "Audi",
      },
    };
  },

  created() {
    CARS.forEach((car) => this.cars.push(car));
  },

  methods: {
    onElementClick(clickedElement: string): void {
      console.log("clicked on " + clickedElement);
    },
    search(): void {
      this.cars = [];
      CARS.forEach((car) => this.cars.push(car));
      this.cars = this.cars.filter(
        (car) => car.brand === this.carFilter.selectedBrand
      );
    },
    clearFilter(): void {
      this.cars = [];
      CARS.forEach((car) => this.cars.push(car));
    },
  },
});
</script>
