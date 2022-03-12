<template>
  <v-app>
    <v-navigation-drawer expand-on-hover rail app>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="Maximilian Mustermann"
          subtitle="maximilian_mustermann88@gmail.com"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder"
            title="My Files"
            value="myfiles"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            value="shared"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Starred"
            value="starred"
          ></v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <h1>Lets drive a car</h1>
      <v-container>
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
                v-for="item in cars"
                :key="item.name"
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
                  >
                    {{ item.power }}
                  </v-chip>
                  <v-chip v-else class="ma-2"> {{ item.power }}</v-chip>
                </td>
                <td class="text-left">
                  <v-text-field
                    v-if="item.name === 'A4 Avant'"
                    v-model="item.note"
                  ></v-text-field>
                  <div v-else>
                    {{ item.note }}
                  </div>
                </td>
                <td class="text-left">
                  <span
                    ><v-icon large color="green darken-2">
                      mdi-check
                    </v-icon></span
                  >
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

        <v-expansion-panels>
          <v-expansion-panel title="Statusverlauf" text="adfsddfsdfdsdsfsdfds">
          </v-expansion-panel>
        </v-expansion-panels>

        <h1>Statusverlauf</h1>
        <v-timeline :direction="'horizontal'" side="start">
          <v-timeline-item align-dot="start" color="teal-lighten-3">
            <strong>Eingegangen</strong>
            <div class="text-caption mb-2">Hangouts</div>
          </v-timeline-item>
          <v-timeline-item dot-color="green">
            <strong>Angelegt</strong>
            <div class="text-caption mb-2">Hangouts</div>
          </v-timeline-item>
          <v-timeline-item dot-color="yellow">
            <strong>Gepackt</strong>
            <div class="text-caption mb-2">Hangouts</div>
          </v-timeline-item>
          <v-timeline-item dot-color="blue">
            <strong>Erledigt</strong>
            <div class="text-caption mb-2">Hangouts</div>
          </v-timeline-item>
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
              <v-card-title class="text-h5">Lorem ipsum</v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an salutandi sententiae.
              </v-card-text>
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
              <v-card-title class="text-h5">Lorem ipsum</v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an salutandi sententiae.
              </v-card-text>
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
              <v-card-title class="text-h5">Lorem ipsum</v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an askdfjsdifdj sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { CARS } from "./model/cars";

const cars = ref([]);
const carFilter = reactive({
  selectedBrands: [],
  selectableBrands: ["Audi", "BMW", "Ferrari", "Mercedes"],
  name: "",
});

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

onMounted(() => {
  CARS.forEach((car) => cars.value.push(car));
  carFilter.selectableBrands.forEach((i) => carFilter.selectedBrands.push(i));
});

const page = ref(1);
const pageCount = ref(5);

const onElementClick = (elementName: string) => {
  console.log("clicked on " + elementName);
};
</script>
