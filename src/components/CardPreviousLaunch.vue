<!-- @format -->

<template>
  <!-- Une card pour la section où sont affichés les lancements précédents -->
  <div
    class="bg-[--color-secondary] shadow-2xl border-2 border-[#f0f0f0] p-[20px] mx-auto w-[100%] md:w-[45%] flex flex-col justify-between my-[20px] rounded-lg"
  >
    <!-- Affichage des informations -->
    <div v-if="payloadNames" class="flex flex-col">
      <img
        :src="item.links.patch.small"
        alt=""
        class="md:w-[70%] lg:w-[60%] mx-auto"
      />
      <p class="mt-[25px] text-[15px] md:text-base">
        Nom:
        <span class="font-bold">{{ item.name }}</span>
      </p>

      <p class="mt-[4px] text-[15px] md:text-base">
        Date:
        <span class="font-bold">{{ date }}</span>
      </p>

      <p class="mt-[4px] text-[15px] md:text-base">
        Description:
        <span class="font-bold">{{ item.details }}</span>
      </p>

      <p class="mt-[4px] text-[15px] md:text-base">
        Lieu du lancement:
        <span class="font-bold">{{ launchPlace }}</span>
      </p>

      <p class="mt-[4px] text-[15px] md:text-base">
        Noms des chargements envoyés:
        <span class="font-bold">{{ payloadNames }}</span>
      </p>

      <p class="mt-[4px] text-[15px] md:text-base">
        Client(s):
        <span class="font-bold">{{ customerNames }}</span>
      </p>

      <a
        :href="item.links.article"
        target="_blank"
        class="font-bold text-[--color-tertiary] focus:text-[--color-tertiary] underline active:text-[--color-tertiary] pl-[0px] p-[7px]"
        >Cliquez ici pour voir l'article</a
      >
    </div>

    <!-- En attente de récupérer les variables -->
    <p v-else class="text-center text-xs md:text-sm lg:text-base mt-[30px]">
      Chargement des données...
    </p>

    <!-- Button pour voir la vidéo -->
    <div
      v-if="youtubeId"
      ref="buttonActivateModal"
      class="cursor-pointer text-center mt-[30px] font-bold py-[8px] md:py-[11px] lg:py-[14px] bg-[--color-tertiary] text-white rounded-md md:rounded-lg select-none"
      @click="openModal"
    >
      <span>Voir la vidéo du lancement</span>
    </div>

    <!-- Affichage du modal s'il clique sur le bouton au dessus -->
    <YoutubeModal
      :youtubeId="youtubeId"
      v-if="isModalOpen"
      @close="closeModal"
      :buttonActivateModal="buttonActivateModal"
    />
  </div>
</template>

<script setup lang="ts">
// Importation des bibliothèque, composant etc...
import { ref, onMounted } from "vue";
import axios from "axios";
import YoutubeModal from "./YoutubeModal.vue";

// Définition des propriétés
const props = defineProps<{
  item: any;
}>();

// Définition des variables
const date = ref<string>("");
const launchPlace = ref<string>("");
const payloadNames = ref<string>("");
const customerNames = ref<string>("");
const youtubeId = ref<string>("");
const isModalOpen = ref<boolean>(false);
const buttonActivateModal = ref<HTMLElement | null>(null);

// Fonction pour ouvrir le modal
const openModal = () => {
  isModalOpen.value = true;
};

// Fonction pour fermer le modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Fonction pour récupérér la date pour l'afficher
const getDate = (date: any) => {
  // Formattage de la date
  const formattingDate = new Date(date);

  // Décomposiiton de la date
  const jour = formattingDate.getDate().toString().padStart(2, "0");
  const mois = (formattingDate.getMonth() + 1).toString().padStart(2, "0");
  const ans = formattingDate.getFullYear();

  // Retour de la date sous format chaîne de caractère
  return `${jour}/${mois}/${ans}`;
};

// Récupérer la localisation du lancement
const getLaunchPlace = async (launchpadId: string) => {
  try {
    // Requête GET à l'API SpaceX pour récupérer les informations du launchpad
    const response = await axios.get(
      `https://api.spacexdata.com/v4/launchpads/${launchpadId}`
    );

    // Retour de la localisation
    return `${response.data.locality}, ${response.data.region}`;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations du launchpad:",
      error
    );
    return null;
  }
};

// Récupération des noms des chargements et des clients
const getPayloadDetails = async (payloadId: string) => {
  try {
    // Requête GET à l'API SpaceX pour récupérer les informations du payload
    const response = await axios.get(
      `https://api.spacexdata.com/v4/payloads/${payloadId}`
    );

    // Mettre à jour les informations des clients et des noms des chargements
    customerNames.value +=
      customerNames.value == ""
        ? response.data.customers[0]
        : `, ` + response.data.customers[0];
    payloadNames.value +=
      payloadNames.value == "" ? response.data.name : `, ` + response.data.name;
  } catch (error) {
    // Gestion d'erreur
    console.error(
      "Erreur lors de la récupération des informations du payload:",
      error
    );
    return null;
  }
};

onMounted(async () => {
  // Mise à jour des variables après que le composant soit monté
  launchPlace.value =
    (await getLaunchPlace(props.item.launchpad)) || "Lieu inconnu";
  date.value = getDate(props.item.date_utc);
  props.item.payloads.forEach((payload: any) => {
    getPayloadDetails(payload);
  });
  youtubeId.value = props.item.links.youtube_id;
});
</script>
