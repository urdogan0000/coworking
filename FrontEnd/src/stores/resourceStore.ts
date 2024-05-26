import axios from "axios";
import { defineStore } from "pinia";

export const useResourceStore = defineStore("resourceStore", {
  state: () => ({
    resources: [],
    isLoading: false,
  }),
  getters: {
    selectedResource: (state) => {
      return (id: string) =>
        state.resources.find((resources) => resources._id === id);
    },
  },
  actions: {
    async fetchResources() {
      this.isLoading = true;

      try {
        const response = await axios.get("http://localhost:3000/v1/resources");
        this.resources = response.data;
        return response.data
      } catch (error) {
        console.log("error fetching resources", error);
      } finally {
        this.isLoading = false;
      }
    },

    async addResource(addResourceDto: any) {
      try {
        const response = await axios.post(
          "http://localhost:3000/v1/resources",
          addResourceDto,
        );
        this.resources.push(response.data as never);
        return response.data;
      } catch (error) {
        console.log("error at at new resource", error);
      }
    },
  },
});
