<!-- @format -->

```src/components/Section.vue
<!-- @format -->

<template>
  <div class="my-[20px] bg-[--color-secondary] p-[20px] rounded-lg">
    <!-- Titre -->
    <div v-if="title" class="flex gap-[10px] items-center">
      <font-awesome-icon v-if="icon" :icon="icon" class="text-[30px]" />
      <h1 class="font-[800] text-[18px] md:text-[22px] lg:text-[25px]">{{ title }}</h1>
    </div>

    <!-- Contenu -->
    <div v-if="data">
      <!-- Contenu pour le lancement futur -->
      <div v-if="typeSection == 'next'">
        <h2 class="font-[500] text-[14px] md:text-[17px] lg:text-[18px]">
          <span class="font-[700]">Date : </span>{{ date }}
        </h2>

        <div v-if="typeSection === 'next'" class="flex justify-center">
          <CardNextLaunch :data="data" />
        </div>
      </div>

      <!-- Contenu pour les lancements passés -->
      <div v-else class="flex flex-col">
        <!-- Type de lancements passé -->
        <div
          v-if="filter == 'all'"
          class="flex flex-1 justify-center items-center gap-[4px] md:gap-[8px] mt-[15px] text-[--text-color] w-fit mx-auto border-b-2 border-[--text-color]"
        >
          <font-awesome-icon
            icon="globe"
            class="text-[15px] md:text-[22px] lg:text-[25px]"
          />
          <h2 class="md:text-[20px] lg:text-[23px] font-bold">
            Tout les lancements
          </h2>
        </div>

        <div
          v-if="filter == 'success'"
          class="flex flex-1 justify-center items-center gap-[4px] md:gap-[8px] mt-[15px] text-[#2ab315] w-fit mx-auto border-b-2 border-[#2ab315]"
        >
          <font-awesome-icon
            icon="check"
            class="text-[15px]md:text-[22px] lg:text-[25px]"
          />
          <h2 class="md:text-[20px] lg:text-[23px] font-bold">
            Lancements réussis
          </h2>
        </div>

        <div
          v-if="filter == 'fail'"
          class="flex flex-1 justify-center items-center gap-[4px] md:gap-[8px] mt-[15px] text-[#f5424b] w-fit mx-auto border-b-2 border-[#f5424b]"
        >
          <font-awesome-icon
            icon="times"
            class="text-[15px]md:text-[22px] lg:text-[25px]"
          />
          <h2 class="md:text-[20px] lg:text-[23px] font-bold">
            Lancements échoués
          </h2>
        </div>

        <!-- Affichage des autres contenus -->
        <div v-if="filteredData" class="flex flex-wrap mt-[20px]">
          <CardPreviousLaunch
            v-for="item in filteredData"
            :key="item.id"
            :item="item"
          />
        </div>

        <!-- Si aucun donnée filtré n'est arrivé -->
        <p v-else class="text-center text-xs md:text-sm lg:text-base mt-[30px]">
          Chargement des données...
        </p>
      </div>
    </div>

    <!-- Si aucun donnée n'est arrivé -->
    <p v-else class="text-center text-xs md:text-sm lg:text-base mt-[30px]">
      Chargement des données...
    </p>
  </div>
</template>

<script setup lang="ts">
// Importation des bibliothèque, composant etc...
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import CardNextLaunch from "./CardNextLaunch.vue";
import CardPreviousLaunch from "./CardPreviousLaunch.vue";

// Définition des propriétés
const props = defineProps<{
  title?: string;
  icon?: string;
  typeSection: string;
  filter?: string;
}>();

// Instanciation des variables
const data = ref<any>(null);
let filteredData = ref<any[]>([]);
let date = ref<string>("");

// Fonction pour récupérér tout les données
const fetchData = async () => {
  try {
    if (props.typeSection === "next") {
      // Récupération des données pour le prochain lancement
      const response = await axios.get(
        "https://api.spacexdata.com/v4/launches/next"
      );
      data.value = response.data;

      // Récupération de la date et formattage
      let formattingDate = new Date(data.value.date_utc);

      // Ajout de deu années car la date est en 2022
      formattingDate.setFullYear(formattingDate.getFullYear() + 2);

      // Passage en gmt + 2
      formattingDate.setHours(formattingDate.getHours() + 1);

      // Mise en place des options pour mieux écrire la date
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };

      // Mise à jour de la date
      date.value = formattingDate.toLocaleString("fr-FR", options);
    } else {
      // Récupération des données pour les anciens lancements
      const response = await axios.get(
        "https://api.spacexdata.com/v4/launches/past"
      );
      data.value = response.data;
      filterData();
    }
  } catch (error) {
    // Gestion d'erreur
    console.error(
      "Erreur lors de la récupération des données pour le lancement futur",
      error
    );
  }
};

// Executer le code lorsque le composant sera monté pour le mettre à jour
onMounted(fetchData);

// Fonction pour filtrer les données selon le prop filter
const filterData = async () => {
  switch (props.filter) {
    // Lancements réussit
    case "success":
      filteredData.value = data.value.filter(
        (data: any) => data.success === true
      );
      break;

    case "fail":
      // Lancements échoué
      filteredData.value = data.value.filter(
        (data: any) => data.success === false
      );
      break;

    default:
      // Lancements global
      filteredData.value = data.value;
      break;
  }

  // Réduire à 10 les nombres des lancements
  if (filteredData && filteredData.value.length > 10) {
    filteredData.value = filteredData.value.slice(0, 10);
  }

  // Inverser l'ordre pour que ça soit du plus récent au plus ancien
  filteredData.value = filteredData.value.reverse();
};

// Ecouter le prop filter pour réexcuter filtrer les lancements
watch(
  () => props.filter,
  () => {
    filterData();
  }
);
</script>
