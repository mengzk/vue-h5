/**
 * Author: Meng
 * Date: 2024-04-16
 * Modify: 2024-04-16
 * Desc:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

const useCommons = defineStore("common-list", () => {
  const list = ref([]);

  function setList(data = []) {
    
    list.value = data;
  }
  function getList() {
    return list.value;
  }

  function clear() {
    list.value = [];
  }

  return {
    setList,
    getList,
    clear,
  };
});

export default useCommons;
