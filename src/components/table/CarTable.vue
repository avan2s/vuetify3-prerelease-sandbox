<template>
  <v-text-field
    v-model="carFilter.name"
    label="Name"
    @keyup="search()"
  ></v-text-field>
  <v-select
    :items="carFilter.selectableBrands"
    label="Brand"
    :multiple="true"
    :chips="true"
    v-model="carFilter.selectedBrands"
    @select="onElementClick('select')"
  ></v-select>
  <v-btn color="primary" @click="search()">Search</v-btn>
  <v-btn color="secondary" @click="clearFilter()">Reset Filter</v-btn>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>
            <span>Name</span>
            <span>
              <v-icon large>mdi mdi-arrow-up</v-icon>
            </span>
          </th>
          <th>Brand</th>
          <th class="text-left">Power (PS)</th>
          <th class="text-left">Note</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, carIndex) in cars"
          :key="carIndex"
          @click="onElementClick('row')"
        >
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.brand }}</td>
          <td class="text-left">
            <v-chip
              v-if="item.power > 300"
              class="ma-2"
              color="red"
              text-color="white"
              >{{ item.power }}</v-chip
            >
            <v-chip v-else class="ma-2">{{ item.power }}</v-chip>
          </td>
          <td class="text-left">
            <v-text-field
              v-if="item.name === 'A4 Avant'"
              v-model="item.note"
            ></v-text-field>
            <div v-else>{{ item.note }}</div>
          </td>
          <td class="text-left">
            <span>
              <v-icon large color="black darken-2">mdi-note-plus</v-icon>
            </span>
            <span>
              <v-icon large color="green darken-2">mdi-check</v-icon>
            </span>
            <span>
              <v-icon large color="red darken-2">mdi-close</v-icon>
            </span>
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
</template>
<script setup lang="ts">
import type { Car } from "@/interfaces/car.interface";
import { CARS } from "@/model/cars";
import { ref, reactive, onMounted, type Ref } from "vue";

const cars: Ref<Car[]> = ref([]);

interface CarFilter {
  selectedBrands: string[];
  selectableBrands: string[];
  name?: string;
}

const carFilter: CarFilter = reactive({
  selectedBrands: [],
  selectableBrands: ["Audi", "BMW", "Ferrari", "Mercedes"],
  name: "",
});

onMounted(() => {
  CARS.forEach((car) => cars.value.push(car));
  carFilter.selectableBrands.forEach((i) => carFilter.selectedBrands.push(i));
});

const onElementClick = (elementName: string) => {
  console.log("clicked on " + elementName);
};

const search = () => {
  cars.value = [];
  CARS.forEach((car) => cars.value.push(car));
  cars.value = cars.value.filter((car) => {
    let isMatching = carFilter.selectedBrands.includes(car.brand);
    carFilter.name = carFilter.name ? carFilter.name : "";
    isMatching =
      isMatching &&
      car.name.toLowerCase().indexOf(carFilter.name.trim().toLowerCase()) > -1;
    return isMatching;
  });
};

const clearFilter = () => {
  cars.value = [];
  CARS.forEach((car) => cars.value.push(car));
  carFilter.name = "";
  carFilter.selectedBrands = [];
  carFilter.selectableBrands.forEach((i) => carFilter.selectedBrands.push(i));
};

const page = ref(1);
const pageCount = ref(5);
</script>
