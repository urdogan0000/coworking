<template>
  <div class="container flex flex-col items-center ml-10">
    <div class="flex m-4 justify-end w-full border-2 p-2">
      <v-btn
        class="rounded-2xl"
        prepend-icon="$vuetify"
        @click="showForm = true"
      >
        <span>Add</span>
      </v-btn>
    </div>
    <div class="w-full">
      <DataTableComp
        :fetchData="fetchData"
        :headers="headers"
        :totalItems="totalItems"
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
      />
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
              :rules="[(v: any) => !!v || 'Name is required']"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newItem.description"
              label="Description"
              type="string"
              required
            ></v-text-field>
            <v-checkbox
              v-model="newItem.canRent"
              label="CanRent"
              type="checkbox"
            ></v-checkbox>
            <v-text-field
              v-model="newItem.type"
              label="Type"
              type="string"
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
import { reactive, ref } from "vue";
import { useResourceStore } from "@/stores/resourceStore";
import DataTableComp from "@/components/DataTableComp.vue";
import type { Resource, TableHeader } from "@/İnterfaces/interface";

const resourceStore = useResourceStore();

const showForm = ref(false);
const valid = ref(false);
const loading = ref(false);

let newItem = reactive<Resource>({
  name: "",
  description: "",
  canRent: true,
  type: "Space",
});

const items = ref<Resource[]>([]);
const totalItems = ref(0);

const resetNewItem = () => {
  newItem = {
    name: "",
    description: "",
    canRent: true,
    type: "Space",
  };
};
const handleEdit = (item:Resource) => {
  console.log("Edit item:", item);
};

const handleDelete = (item:Resource) => {
  console.log("Delete item:", item);
};

const submitForm = async () => {
  await resourceStore.addResource(newItem);
  resetNewItem();
  showForm.value = false;
};

const fetchData = async (options:any) => {
  loading.value = true;

  const response = await resourceStore.fetchResources();
  console.log(response);
  
  totalItems.value = 5;
  loading.value = false;
  return response;
};

const headers = ref<TableHeader[]>([
  {
    title: "Name",
    align: "start",
    sortable: true,
    key: "name",
  },
  { title: "Description", key: "description", align: "end" },
  { title: "CanRent", key: "canRent", align: "end" },
  { title: "Type", key: "type", align: "end" },
  { title: "Actions", key: "actions", align: "center", sortable: false },
]);

const editItem = (item: Resource) => {
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
