<template>
  <v-app>
    <v-main>
      <h1>Lets drive a car</h1>
      <v-container>
        <v-navigation-drawer app>
          <h1>Somesidebar</h1>
        </v-navigation-drawer>
        <v-text-field
          v-model="carFilter.name"
          label="Name"
          @keyup="search()"
        ></v-text-field>
        <v-select
          :items="selectItems"
          label="Brand"
          :multiple="true"
          :chips="true"
          v-model="carFilter.selectedBrands"
          v-on:select="onElementClick('select')"
        ></v-select>
        <v-btn v-on:click="search()">Search</v-btn>
        <v-btn v-on:click="clearFilter()">Clear Filter</v-btn>
        <v-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>
                  <span>Name</span>
                  <span><v-icon large> mdi mdi-arrow-up </v-icon></span>
                </th>
                <th>Brand</th>
                <th class="text-left">Power (PS)</th>
                <th class="text-left">Note</th>
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
                <td class="text-left">
                  <v-text-field
                    v-if="item.name === 'A4 Avant'"
                    v-model="item.note"
                  ></v-text-field>
                </td>
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

        <h1>Statusverlauf</h1>
        <v-timeline :direction="'vertical'" side="start">
          <v-timeline-item align-dot="start" color="teal-lighten-3">
            <strong>Eingegangen</strong>
            <div class="text-caption mb-2">Hangouts</div>
          </v-timeline-item>
          <v-timeline-item>
            <strong>Angelegt</strong>
            <div class="text-caption mb-2">Hangouts</div>
          </v-timeline-item>
          <v-timeline-item>
            <strong>Gepackt</strong>
            <div class="text-caption mb-2">Hangouts</div>
          </v-timeline-item>
          <v-timeline-item
            ><strong>Erledigt</strong>
            <div class="text-caption mb-2">Hangouts</div></v-timeline-item
          >
        </v-timeline>
        <h1>Timeline with icons</h1>
        <v-timeline>
          <v-timeline-item size="large">
            <template v-slot:icon>
              <v-avatar>
                <img src="https://i.pravatar.cc/64" />
              </v-avatar>
            </template>
            <template v-slot:opposite>
              <span>Tus eu perfecto</span>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="text-h5"> Lorem ipsum </v-card-title>
              <v-card-text
                >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an salutandi sententiae.</v-card-text
              >
            </v-card>
          </v-timeline-item>
          <v-timeline-item size="large">
            <template v-slot:icon>
              <v-avatar>
                <img src="https://i.pravatar.cc/63" />
              </v-avatar>
            </template>
            <template v-slot:opposite>
              <span>Tus eu perfecto</span>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="text-h5"> Lorem ipsum </v-card-title>
              <v-card-text
                >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an salutandi sententiae.</v-card-text
              >
            </v-card>
          </v-timeline-item>
          <v-timeline-item size="large">
            <template v-slot:icon>
              <v-avatar>
                <img src="https://i.pravatar.cc/62" />
              </v-avatar>
            </template>
            <template v-slot:opposite>
              <span>Tus eu perfecto</span>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="text-h5"> Lorem ipsum </v-card-title>
              <v-card-text
                >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an salutandi sententiae.</v-card-text
              >
            </v-card>
          </v-timeline-item>
        </v-timeline>
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
        selectedBrands: [],
        name: "",
      },
    };
  },

  created() {
    CARS.forEach((car) => this.cars.push(car));
    this.selectItems.forEach((i) => this.carFilter.selectedBrands.push(i));
  },

  methods: {
    onElementClick(clickedElement: string): void {
      console.log("clicked on " + clickedElement);
    },
    search(): void {
      this.cars = [];
      CARS.forEach((car) => this.cars.push(car));
      this.cars = this.cars.filter((car) => {
        let isMatching = this.carFilter.selectedBrands.includes(car.brand);
        this.carFilter.name = this.carFilter.name ? this.carFilter.name : "";
        isMatching =
          isMatching &&
          car.name
            .toLowerCase()
            .indexOf(this.carFilter.name.trim().toLowerCase()) > -1;
        return isMatching;
      });
    },
    clearFilter(): void {
      this.cars = [];
      CARS.forEach((car) => this.cars.push(car));
      this.carFilter.name = null;
      this.carFilter.selectedBrands = [];
      this.selectItems.forEach((i) => this.carFilter.selectedBrands.push(i));
    },
  },
});
</script>
