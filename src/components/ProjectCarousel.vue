<template>
  <div v-if="width >= 768" class="flex flex-col sm:flex-row">
    <div class="w-full sm:w-1/4">
      <div class="flex flex-col space-y-2 overflow-y-scroll pe-3 h-2/3">
        <div class="space-y-6">
          <div v-for="(image, index) in props.projectImages" :key="image"
            :class="{ 'opacity-50': index !== activeIndex }">
            <img @click="setActiveMedia(index)" :src="image" :alt="image" class="w-full object-cover cursor-pointer" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full sm:w-3/4 ms-8">
      <div class="lightbox">
        <div v-if="activeIndex !== null && props.projectVideos[activeIndex]">
          <video :src="props.projectVideos[activeIndex]" controls class="w-full object-cover"></video>
          <p v-if="activeIndex !== null && props.projectAltTexts[activeIndex]" class="text-sm mt-5">{{
            props.projectAltTexts[activeIndex] }}</p>
        </div>

        <div v-else-if="props.projectVideos[0]">
          <video :src="props.projectVideos[0]" controls class="w-full object-cover"></video>
          <div class="mt-5">
            <p class="text-sm"><span class="font-semibold">{{ 1 }}/{{ props.projectAltTexts.length }}. </span>{{
              props.projectAltTexts[0] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="width < 768" class="flex flex-col">
    <div class="w-full">
      <div class="lightbox">
        <div v-if="activeIndex !== null && props.projectVideos[activeIndex]">
          <video :src="props.projectVideos[activeIndex]" controls class="w-full object-cover"></video>
          <div class="mt-5">
            <p v-if="activeIndex !== null && props.projectAltTexts[activeIndex]" class="text-sm"><span class="font-semibold">{{ activeIndex + 1 }}/{{ props.projectAltTexts.length }}. </span>{{
              props.projectAltTexts[activeIndex] }}</p>
          </div>
        </div>
        <div v-else-if="props.projectVideos[0]">
          <video :src="props.projectVideos[0]" controls class="w-full object-cover"></video>
          <div class="mt-5">
            <p class="text-sm"><span class="font-semibold">{{ 1 }}/{{ props.projectAltTexts.length }}. </span>{{
              props.projectAltTexts[0] }}</p>
          </div>
        </div>
        <div class="flex flex-row gap-6 mt-4 justify-center">
          <IconPageFirst class="text-4xl" @click="firstMedia" />
          <IconChevronLeft class="text-4xl" @click="previousMedia" />
          <IconChevronRight class="text-4xl" @click="nextMedia" />
          <IconPageLast class="text-4xl" @click="lastMedia" />	
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useWindowSize } from '@vueuse/core';
import IconChevronRight from '~icons/mdi/chevron-right';
import IconChevronLeft from '~icons/mdi/chevron-left';
import IconPageFirst from '~icons/mdi/page-first';
import IconPageLast from '~icons/mdi/page-last';

const { width } = useWindowSize();

const props = defineProps({
  projectVideos: {
    type: Array,
    required: true
  },
  projectImages: {
    type: Array,
    required: true
  },
  projectAltTexts: {
    type: Array,
    required: true
  }
});

const activeIndex = ref(null);

const setActiveMedia = (index) => {
  activeIndex.value = index;
};

const nextMedia = () => {
  if (activeIndex.value === props.projectVideos.length - 1) {

  } else {
    activeIndex.value++;
  }
};

const previousMedia = () => {
  if (activeIndex.value === 0) {

  } else {
    activeIndex.value--;
  }
};

const firstMedia = () => {
  activeIndex.value = 0;
};

const lastMedia = () => {
  activeIndex.value = props.projectVideos.length - 1;
};

</script>

<style>
::-webkit-scrollbar {
  width: 0.35rem;
}

::-webkit-scrollbar-track {
  background: #bababa;
}

::-webkit-scrollbar-thumb {
  background: #505050;
}

::-webkit-scrollbar-thumb:hover {
  background: #505050;
}
</style>