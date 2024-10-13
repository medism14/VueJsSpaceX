<!-- @format -->

<template>
  <!-- Card pour la section prochain lancmeent -->
  <div
    class="bg-[--color-secondary] shadow-2xl border-2 border-[#f0f0f0] p-[25px] mx-auto w-[100%] md:w-[80%] lg:w-[70%] flex flex-col items-center my-[20px] rounded-lg"
  >
    <!-- Image du lancement -->
    <img
      src="/spaceXRocket.jpg"
      alt="Fusée de SpaceX"
      class="md:w-[300px] lg:w-[380px] mx-auto"
    />

    <!-- Nom -->
    <h1 class="text-center text-lg md:text-xl font-bold mt-[20px]">{{ data.name }}</h1>

    <!-- Compte à rebours -->
    <div class="text-center text-sm md:text-base mt-[18px] md:mt-[25px]">
      <span class="font-bold">Compte à rebours:</span> <br />
      <p>{{ countdown }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Importation d'une bibliothèque
import { ref } from "vue";

// Définition des propriétés
const props = defineProps<{
  data: any;
}>();

// Initialisation des variables
const countdown = ref("");

// Fonction pour calculer le compte à rebours
const calculateCountdown = () => {
  // Initialisation des variables et formattage
  const launchDate = new Date(props.data.date_utc);
  launchDate.setHours(launchDate.getHours());
  launchDate.setFullYear(launchDate.getFullYear() + 2);
  const currentDate: any = new Date();

  // Difference de temps (en millisecondes entres les deux temps)
  const timeDiff = launchDate.getTime() - currentDate;

  // Repartition et calcul du temps restant
  let jours = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  let heures = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  let secondes = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Retour de la date
  countdown.value = `${jours} jours, ${heures} heures, ${minutes} minutes, ${secondes} secondes restantes`;
};

// Appel pour calculer voir le temps restant chaque seconde
calculateCountdown();
setInterval(() => {
  calculateCountdown();
}, 1000);
</script>
