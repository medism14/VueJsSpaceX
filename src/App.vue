<!-- @format -->

<template>
  <!-- Image de la page -->
  <img src="/spacex.jpg" alt="" class="w-[200px] mt-[20px] mx-auto" />
  <!-- Titre de la page -->
  <h1 class="text-[42px] font-bold my-[30px] text-center">Lancements SpaceX</h1>

  <!-- Section pour afficher les futurs lancements (next pour futur et past pour avants pour une séparation) -->
  <Section title="Prochain lancement" typeSection="next" />

  <div class="flex justify-between my-[30px]">
    <h1 class="text-[28px] font-bold">Lancements SpaceX</h1>
    <div class="select-wrapper">
      <select
        name="filter"
        id="selectFilter"
        v-model="filter"
      >
        <option value="all">Tous les lancements</option>
        <option value="success">Lancements réussis</option>
        <option value="fail">Lancements échoués</option>
      </select>
    </div>
  </div>

  <Section title="Prochain lancement" typeSection="past" :filter="filter" />

  <div class="py-[30px]" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Section from "./components/Section.vue";

const filter = ref("all");

</script>

<style scoped>
#selectFilter {
  width: 300px;
  height: 40px;
  outline: none;
  border-radius: 20px;
  background-color: var(--color-tertiary);
  color: #ffffff;
}
</style>
