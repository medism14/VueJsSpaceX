<!-- @format -->

<template>
  <div
    class="bg-[--color-secondary] shadow-2xl border-2 border-[#f0f0f0] p-[25px] mx-auto w-[45%] flex flex-col items-center my-[20px] rounded-lg"
  >
    <img
      src="/spaceXRocket.jpg"
      alt="Fusée de SpaceX"
      class="w-[320px] mx-auto"
    />
    <h1 class="text-center text-xl font-bold mt-[20px]">{{ data.name }}</h1>

    <div class="text-center mt-[25px]">
      <span class="font-bold">Compte à rebours:</span> <br />
      <p>{{ countdown }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  data: any;
}>();

const countdown = ref("");

const calculateCountdown = () => {
  const launchDate = new Date(props.data.date_utc);
  launchDate.setHours(launchDate.getHours());
  launchDate.setFullYear(launchDate.getFullYear() + 2);
  const currentDate: any = new Date();

  const timeDiff = launchDate.getTime() - currentDate;

  let jours = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  let heures = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  let secondes = Math.floor((timeDiff % (1000 * 60)) / 1000);

  countdown.value = `${jours} jours, ${heures} heures, ${minutes} minutes, ${secondes} secondes restantes`;
};

// Appel pour calculer le compte à rebours
calculateCountdown();
setInterval(() => {
  calculateCountdown();
}, 1000);
</script>
