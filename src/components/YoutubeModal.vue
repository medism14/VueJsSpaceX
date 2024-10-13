<!-- @format -->

<template>
  <!-- Occuper toute l'espace disponible en donnant un petit fond noir -->
  <div
    class="inset-0 fixed z-30 bg-[rgba(0,0,0,0.3)] flex justify-center items-center"
  >
    <!-- Le pop-up en question -->
    <div
      ref="modalRef"
      class="md:w-[80%] md:h-[70%] lg:w-[50%] lg:h-[50%] bg-[#FFFFFF] flex flex-col p-[40px] pt-[25px] rounded-lg border-[#F2F2F2]"
    >
      <!-- Pour fermer le modal -->
      <div class="flex justify-end">
        <font-awesome-icon
          icon="times"
          class="text-[34px] font-bold mb-[20px] cursor-pointer p-[5px]"
          @click="$emit('close')"
        />
      </div>
      <!-- La vidéo youtube -->
      <iframe
        class="w-full h-full"
        :src="`https://www.youtube.com/embed/${youtubeId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
// Importation des bibliothèque
import { ref, onMounted, onUnmounted } from "vue";

// Définition des propriété
const props = defineProps<{
  youtubeId: string;
  buttonActivateModal: any;
}>();

// Definition des fonctions
const emit = defineEmits(["close"]);

// Récupérer l'element modal
const modalRef = ref<HTMLElement | null>(null);

// Vérfier si l'on clique à l'exterieur du modal
const verifyClick = (event: any) => {
  if (
    modalRef.value &&
    !modalRef.value.contains(event.target) &&
    event.target != props.buttonActivateModal
  ) {
    emit("close");
  }
};

// Désactiver le scroll
const disableScroll = () => {
  document.body.style.overflow = "hidden";
};

// Activer le scroll
const enableScroll = () => {
  document.body.style.overflow = "";
};

// Instructions à executer lorsque le composant est monté
onMounted(() => {
  document.addEventListener("click", verifyClick);
  disableScroll();
});

// Instructions à executer lorsque le composant est demonté
onUnmounted(() => {
  document.addEventListener("click", verifyClick);
  enableScroll();
});
</script>
