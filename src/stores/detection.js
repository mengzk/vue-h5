/**
 * Author: Meng
 * Date: 2024-04-16
 * Modify: 2024-04-16
 * Desc:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

const useDetection = defineStore("detection", () => {
  const pulse = ref({});
  const tongue = ref({});
  const notEmpty = ref(false);
  const notEmpty2 = ref(false);
  

  function setPulse(res) {
    pulse.value = res;
    if(res) {
      notEmpty.value = true;
    }
  }

  function getPulse() {
    return pulse.value;
  }

  function setTongue(res) {
    tongue.value = res;
    if(res) {
      notEmpty2.value = true;
    }
  }
  function getTongue() {
    return tongue.value;
  }

  function hasData() {
    return notEmpty.value;
  }

  function hasData2() {
    return notEmpty2.value;
  }

  function clear() {
    pulse.value = {};
    tongue.value = {};
  }

  return {
    setPulse,
    getPulse,
    setTongue,
    getTongue,
    hasData,
    hasData2,
    clear,
  };
});

export default useDetection;