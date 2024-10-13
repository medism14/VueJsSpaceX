<!-- @format -->

<template>
  <!-- Image de la page -->
  <img src="/spacex.jpg" alt="" class="w-[150px] md:w-[200px] mt-[20px] mx-auto" />
  <!-- Titre de la page -->
  <h1 class="text-[25px] md:text-[38px] lg:text-[42px] font-bold my-[30px] text-center">
    Lancements SpaceX
  </h1>

  <!-- Section pour afficher les futurs lancements (next pour futur et past pour avants pour une séparation) -->
  <Section title="Prochain lancement" typeSection="next" />

  <!-- Partie ou l'on présente les lancéments précédents -->
  <div class="flex justify-between items-center my-[30px] mt-[60px]">
    <h1 class="text-[22px] md:text-[30px] lg:text-[34px] font-bold">
      Lancements précédents
    </h1>
    <div class="select-wrapper">
      <select name="filter" id="selectFilter" v-model="filter" class="text-sm md:text-[15px] lg:text-base">
        <option value="all">Tous les lancements</option>
        <option value="success">Lancements réussis</option>
        <option value="fail">Lancements échoués</option>
      </select>
    </div>
  </div>

  <!-- Section où l'on affiche les lancement précédaents -->
  <Section typeSection="past" :filter="filter" />

  <!-- Spacer pour ne pas coller au bottom -->
  <div class="py-[30px]" />
</template>

<script setup lang="ts">
// Importation des bibliothèque, composant etc...
import { ref } from "vue";
import Section from "./components/Section.vue";

// Variable pour une mise à jour des composants enfants pour la selection
const filter = ref("all");
</script>

<style scoped>
/* Pour styliser la selection d'état pour les lancements */
#selectFilter {
  width: 300px;
  height: 40px;
  outline: none;
  border-radius: 20px;
  background-color: var(--color-tertiary);
  color: #ffffff;
}
@media (max-width: 1024px) {
  #selectFilter {
    width: 200px;
    height: 35px;
    border-radius: 15px;
  }
}
@media (max-width: 768px) {
  #selectFilter {
    width: 170px;
    height: 35px;
    border-radius: 15px;
  }
}
</style>
