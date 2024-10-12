<!-- @format -->

<template>
  <div
    class="bg-[--color-secondary] shadow-2xl border-2 border-[#f0f0f0] p-[20px] mx-auto w-[45%] flex flex-col justify-between my-[20px] rounded-lg"
  >
    <div class="flex flex-col">
      <img :src="item.links.patch.small" alt="" class="w-[60%] mx-auto" />
      <p class="mt-[25px]">
        Nom:
        <span class="font-bold">{{ item.name }}</span>
      </p>

      <p class="mt-[4px]">
        Date:
        <span class="font-bold">{{ date }}</span>
      </p>

      <p class="mt-[4px]">
        Description:
        <span class="font-bold">{{ item.details }}</span>
      </p>

      <p class="mt-[4px]">
        Lieu du lancement:
        <span class="font-bold">{{ launchPlace }}</span>
      </p>

      <p class="mt-[4px]">
        Noms des chargements envoyés:
        <span class="font-bold">{{ payloadNames }}</span>
      </p>

      <p class="mt-[4px]">
        Client(s):
        <span class="font-bold">{{ customerNames }}</span>
      </p>

      <p class="mt-[4px]">
        Lien:
        <a
          :href="item.links.article"
          taget="_blank"
          class="font-bold text-blue-600 focus:text-blue-600 active:text-blue-600"
          >Voir l'article</a
        >
      </p>
    </div>

    <p class="cursor-pointer text-center mt-[30px] font-bold underline">
      Voir la vidéo youtube
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
const props = defineProps<{
  item: any;
}>();

// Les varaibles
const date = ref<string>("");
const launchPlace = ref<string>("");
const payloadNames = ref<string>("");
const customerNames = ref<string>("");
const youtubeId = ref<string>("");

const getDate = (date: any) => {
  const formattingDate = new Date(date);

  const jour = formattingDate.getDate().toString().padStart(2, "0");
  const mois = (formattingDate.getMonth() + 1).toString().padStart(2, "0");
  const ans = formattingDate.getFullYear();

  return `${jour}/${mois}/${ans}`;
};

const getLaunchPlace = async (launchpadId: string) => {
  try {
    // Requête GET à l'API SpaceX pour récupérer les informations du launchpad
    const response = await axios.get(
      `https://api.spacexdata.com/v4/launchpads/${launchpadId}`
    );

    return `${response.data.locality}, ${response.data.region}`;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations du launchpad:",
      error
    );
    return null;
  }
};

const getPayloadDetails = async (payloadId: string) => {
  try {
    // Requête GET à l'API SpaceX pour récupérer les informations du launchpad
    const response = await axios.get(
      `https://api.spacexdata.com/v4/payloads/${payloadId}`
    );

    customerNames.value +=
      customerNames.value == ""
        ? response.data.customers[0]
        : `, ` + response.data.customers[0];
    payloadNames.value +=
      payloadNames.value == "" ? response.data.name : `, ` + response.data.name;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations du payload:",
      error
    );
    return null;
  }
};

onMounted(async () => {
  launchPlace.value =
    (await getLaunchPlace(props.item.launchpad)) || "Lieu inconnu";
  date.value = getDate(props.item.date_utc);
  props.item.payloads.forEach((payload: any) => {
    getPayloadDetails(payload);
  });
  youtubeId.value = props.item.links.youtube_id;
});
</script>
