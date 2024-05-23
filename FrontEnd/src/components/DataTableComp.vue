<template>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon @click="onEdit(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:tfoot>
        <tr>
          <td>
            <v-text-field
              v-model="nameFilter"
              class="ma-2"
              density="compact"
              placeholder="Search name..."
              hide-details
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="caloriesFilter"
              class="ma-2"
              density="compact"
              placeholder="Minimum calories"
              type="number"
              hide-details
            ></v-text-field>
          </td>
        </tr>
      </template>
    </v-data-table-server>
 
</template>

<script setup lang="ts">
import type {
  FetchDataParams,
  FetchDataResult,
  SearchCriteria,
  SortCriteria,
  TableHeader,
} from "@/İnterfaces/interface";
import { ref, watch, onMounted, defineProps } from "vue";

const props = defineProps<{
  fetchData: (
    params: FetchDataParams<SearchCriteria>,
  ) => Promise<FetchDataResult<any>>;
  headers: TableHeader[];
  onEdit: (item: any) => void;
}>();

const itemsPerPage = ref(5);
const items = ref<any[]>([]);
const loading = ref(true);
const totalItems = ref(0);
const nameFilter = ref<string>("");
const caloriesFilter = ref<number | undefined>(undefined);
const search = ref("");

const loadItems = ({
  page,
  itemsPerPage,
  sortBy,
}: {
  page: number;
  itemsPerPage: number;
  sortBy: SortCriteria[];
}) => {
  loading.value = true;
  props
    .fetchData({
      page,
      itemsPerPage,
      sortBy,
      search: { name: nameFilter.value, calories: caloriesFilter.value },
    })
    .then(({ items: fetchedItems, total }) => {
      items.value = fetchedItems;
      totalItems.value = total;
      loading.value = false;
    });
};

watch([nameFilter, caloriesFilter], () => {
  search.value = String(Date.now());
});

onMounted(() => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
});
</script>

<style scoped>
.data-table-container {
  margin-top: 16px;
}
</style>
