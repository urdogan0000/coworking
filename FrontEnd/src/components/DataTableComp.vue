<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :server-items-length="totalItems"
    :loading="loading"
    :options.sync="options"
    @update:options="handleOptionsUpdate"
  >
    <template v-slot:[`item.actions`]="{ item }">
      
    </template>
  </v-data-table>
</template>


<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  fetchData: {
    type: Function,
    required: true
  },
  headers: {
    type: Array,
    required: true
  },
  totalItems: {
    type: Number,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['edit', 'delete']);

const items = ref([]);
const options = ref({});

watch(options, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    items.value = await props.fetchData(newVal);
  }
});

const handleOptionsUpdate = async (newOptions) => {
  options.value = newOptions;
};

</script>
