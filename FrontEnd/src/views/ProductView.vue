<template>
  <div class="container flex flex-col items-center ml-10">
    <div class="flex m-4 justify-end w-full  border-2 p-2 ">
      <v-btn class="rounded-2xl" prepend-icon="$vuetify" @click="showForm = true">
        <span>Add</span>
      </v-btn>
    </div>
    <div class="w-full ">
      <DataTable :fetchData="fetchData" :headers="headers" :onEdit="editItem" />
    </div>
    <v-dialog v-model="showForm" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Item</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="newItem.name"
              :rules="[(v) => !!v || 'Name is required']"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newItem.calories"
              :rules="[(v) => !!v || 'Calories is required']"
              label="Calories"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="newItem.fat"
              label="Fat"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="newItem.carbs"
              label="Carbs"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="newItem.protein"
              label="Protein"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="newItem.iron"
              label="Iron"
              type="number"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="showForm = false">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="submitForm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTable from "@/components/DataTableComp.vue";
import type {
  Dessert,
  FetchDataParams,
  FetchDataResult,
  SearchCriteria,
  TableHeader,
} from "@/İnterfaces/interface";

const showForm = ref(false);
const valid = ref(false);
const newItem = ref<Dessert>({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
  iron: "0",
});

const desserts = ref<Dessert[]>([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: "0",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: "6",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: "7",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: "16",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: "1",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: "2",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: "8",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: "45",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: "22",
  },
]);

const resetNewItem = () => {
  newItem.value = {
    name: "",
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    iron: "0",
  };
};

const submitForm = () => {
  const form = ref().value as unknown as { validate: () => boolean };
  if (form.validate()) {
    desserts.value.push({ ...newItem.value });
    resetNewItem();
    showForm.value = false;
  }
};

const fetchData = async ({
  page,
  itemsPerPage,
  sortBy,
  search,
}: FetchDataParams<SearchCriteria>): Promise<FetchDataResult<Dessert>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const filteredItems = desserts.value.filter((item) => {
        if (
          search.name &&
          !item.name.toLowerCase().includes(search.name.toLowerCase())
        ) {
          return false;
        }
        if (search.calories && !(item.calories >= Number(search.calories))) {
          return false;
        }
        return true;
      });

      if (sortBy.length) {
        const sortKey = sortBy[0].key;
        const sortOrder = sortBy[0].order;
        filteredItems.sort((a, b) => {
          const aValue = a[sortKey as keyof Dessert];
          const bValue = b[sortKey as keyof Dessert];
          return sortOrder === "desc"
            ? (bValue as number) - (aValue as number)
            : (aValue as number) - (bValue as number);
        });
      }

      const paginatedItems = filteredItems.slice(start, end);

      resolve({ items: paginatedItems, total: filteredItems.length });
    }, 500);
  });
};

const headers = ref<TableHeader[]>([
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories", align: "end" },
  { title: "Fat (g)", key: "fat", align: "end" },
  { title: "Carbs (g)", key: "carbs", align: "end" },
  { title: "Protein (g)", key: "protein", align: "end" },
  { title: "Iron (%)", key: "iron", align: "end" },
  { title: "Actions", key: "actions", align: "center", sortable: false },
]);

const editItem = (item: Dessert) => {
  alert(`Editing item: ${item.name}`);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.max-w-5xl {
  max-width: 80%;
  width: 100%;
}
</style>
