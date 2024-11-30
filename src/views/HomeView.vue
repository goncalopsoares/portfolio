<template>
  <main v-if="width < 768" class="flex flex-col justify-between mx-4" :style="{ height: calculatedHeight + 'px' }">
    <div class="w-full flex justify-between mt-20">
      <div class="w-full flex flex-row justify-end ms-4 me-4 mt-4">
        <p class="uppercase text-end pt-1 pe-4 w-1/2 self-end">Clica no menu para saberes mais sobre mim</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
          class="text-main-grey scale-x-[-1] w-6 h-6 self-top">
          <path fill-rule="evenodd"
            d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
        </svg>
      </div>
    </div>
    <div class="mx-4 content-center">
      <h1 class="text-xl uppercase ">Olá, sou um {{ option }}</h1>
    </div>
    <div class="w-full flex flex-row mb-4">
      <p class="uppercase pt-1 pe-4 w-1/2 self-end text-end">Entra em contacto comigo através deste email</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="text-main-grey rotate-180 w-6 h-6 self-end ">
        <path fill-rule="evenodd"
          d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
      </svg>
    </div>
  </main>
  <Footer />
  <main v-if="width >= 768 && width < 1024" class="flex flex-col justify-between md:mx-16 lg:mx-32"
    :style="{ height: calculatedHeight + 'px' }">
    <div class="w-full flex justify-between">
      <div class="w-full flex flex-row justify-end ms-4 me-4 mt-4">
        <p class="uppercase text-end pt-1 pe-4 w-1/2 self-end">Explora as várias páginas para saberes mais sobre mim</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
          class="text-main-grey scale-x-[-1] w-6 h-6 self-top me-24">
          <path fill-rule="evenodd"
            d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
        </svg>
      </div>
    </div>
    <div class="mx-4 content-center">
      <h1 class="text-3xl uppercase ">Olá, sou um </h1>
    </div>
    <p v-for="letter in letters" :key="letter.id" class="text-3xl absolute w-fit interactive"
      :style="{ top: `${letter.top}px`, left: `${letter.left}px` }" draggable="true"
      @dragstart="startDrag($event, letter.id)">{{ letter.title }}
    </p>
    <div class="w-full flex flex-row">
      <p class="uppercase pt-1 pe-4 w-1/2 self-end text-end">Entra em contacto comigo através deste email</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="text-main-grey rotate-180 w-6 h-6 self-end">
        <path fill-rule="evenodd"
          d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
      </svg>
    </div>
  </main>
  <main v-if="width >= 1024" class="flex flex-col justify-between md:mx-16 lg:mx-32 relative" @drop="onDrop($event)"
    @draenter.prevent @dragover.prevent :style="{ height: calculatedHeight + 'px' }">
    <div class=" w-full flex justify-between">
      <div class="w-full flex flex-row justify-end ms-4 me-4 mt-4">
        <p class="uppercase text-end pt-1 pe-4 w-1/2 self-end">Explora as várias páginas para saberes mais sobre mim</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
          class="text-main-grey scale-x-[-1] w-6 h-6 self-top me-48">
          <path fill-rule="evenodd"
            d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
        </svg>
      </div>
    </div>
    <div class="mx-4 content-center">
      <h1 class="text-3xl uppercase ">Olá, sou um </h1>
    </div>
    <p v-for="letter in letters" :key="letter.id" class="text-3xl absolute w-fit interactive"
      :style="{ top: `${letter.top}px`, left: `${letter.left}px` }" draggable="true"
      @dragstart="startDrag($event, letter.id)">{{ letter.title }}
    </p>
    <p class="uppercase pt-1 ps-4 w-1/2 self-end"></p>
    <div class="w-full flex flex-row justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="text-main-grey scale-y-[-1] w-6 h-6 self-end">
        <path fill-rule="evenodd"
          d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
      </svg>
      <p class="uppercase pt-1 ps-4 w-1/2 self-end">Entra em contacto comigo através deste email</p>
    </div>
  </main>
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import { ref, onMounted, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const { height, width } = useWindowSize();

const calculatedHeight = computed(() => {
  const rem = 16;
  const offset = 10.5 * rem;
  return height.value - offset;
});

const options = ['web developer', 'ui/ux designer' ]
const index = ref(0);

onMounted(() => {
  setInterval(() => {
    index.value = (index.value + 1) % options.length;
  }, 2000);
});

const option = computed(() => options[index.value]);

const letters = ref([]);

const initialLetters = [
  { id: 0, title: 'W' },
  { id: 1, title: 'E' },
  { id: 2, title: 'B' },
  { id: 3, title: 'D' },
  { id: 4, title: 'E' },
  { id: 5, title: 'V' },
  { id: 6, title: 'E' },
  { id: 7, title: 'L' },
  { id: 8, title: 'O' },
  { id: 9, title: 'P' },
  { id: 10, title: 'E' },
  { id: 11, title: 'R' },
  { id: 12, title: 'U' },
  { id: 13, title: 'I' },
  { id: 14, title: 'U' },
  { id: 15, title: 'X' },
  { id: 16, title: '/' },
  { id: 17, title: 'D' },
  { id: 18, title: 'E' },
  { id: 19, title: 'S' },
  { id: 20, title: 'I' },
  { id: 21, title: 'G' },
  { id: 22, title: 'N' },
  { id: 23, title: 'E' },
  { id: 24, title: 'R' },

];

const generateRandomPositions = (lettersArray, containerHeight, containerWidth) => {
  return lettersArray.map((letter) => ({
    ...letter,
    top: Math.random() * (containerHeight - 100) + 50,
    left: Math.random() * (containerWidth - 32),

  }));
};

onMounted(() => {

  const container = document.querySelector('main');
  const containerHeight = container.offsetHeight;
  const containerWidth = container.offsetWidth;

  letters.value = generateRandomPositions(initialLetters, containerHeight, containerWidth);
  console.log(letters.value);
  console.log(containerHeight);
  return letters;

});

const startDrag = (event, itemId) => {
  console.log('Dragging', itemId);
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', itemId);
};

const onDrop = (event) => {
  event.preventDefault();

  const itemId = event.dataTransfer.getData('text/plain');
  const itemIndex = letters.value.findIndex((item) => item.id === parseInt(itemId));

  if (itemIndex !== -1) {

    const main = event.currentTarget;
    const rect = main.getBoundingClientRect();


    const newTop = event.clientY - rect.top;
    const newLeft = event.clientX - rect.left;


    letters.value[itemIndex].top = newTop;
    letters.value[itemIndex].left = newLeft;

    console.log(`Letter ${itemId} dropped at:`, { top: newTop, left: newLeft });
  }
};


</script>