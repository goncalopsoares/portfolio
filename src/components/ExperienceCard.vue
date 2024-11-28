<template>
    <main v-if="width >= 768" class="w-full uppercase" :style="index === 0 ? { marginTop: '9.22rem' } : {}">
        <div class="grid grid-cols-8 lg:ms-32 xl:ms-80">
            <div
                class="col-span-2 border-e-2 border-main-grey items-center gap-16 py-12 lg:py-16 xl:py-20 border-b-2 text-base text-main-grey">
                <p class="md:px-16 lg:px-0 xl:ms-24">{{ formattedStartingDate }} - {{ formattedEndDate }}</p>
            </div>
            <div @click="isShowing = !isShowing"
                class="col-span-6 flex items-center justify-between gap-16 py-6 border-b-2 border-main-grey text-base text-main-grey">
                <div>
                    <p class="uppercase flex-shrink-0 w-100 font-semibold ps-12"> {{ experience.company }}</p>
                </div>
                <div>
                    <p>{{ experience.area }}</p>
                </div>
                <div><icon-minus v-if="isShowing" class="ml-auto md:me-16 lg:me-32" style="font-size: 1.25rem;" />
                    <icon-plus v-else class="ml-auto md:me-16 lg:me-32" style="font-size: 1.25rem;" />
                </div>
            </div>
        </div>
        <div v-if="isShowing" class="grid grid-cols-8 lg:ms-32 xl:ms-80">
            <div class="col-span-2 py-6 border-b-2 border-main-grey">
            </div>
            <div class="col-span-6 py-6 border-b-2 border-main-grey">
                <div class="ps-16" v-for="(task, index) in experience.tasks" :key=index>
                    <p class="text-main-grey list-item"> {{ task }}</p>
                </div>
            </div>
        </div>
    </main>
    <main v-if="width < 768" class="w-full uppercase" :style="index === 0 ? { marginTop: '10.5rem' } : {}">
        <div @click="isShowing = !isShowing"
            class="p-4 flex flex-col gap-4 py-6 border-b-2 border-main-grey text-base text-main-grey">
            <p class="">{{ formattedStartingDate }} - {{ formattedEndDate }}</p>
            <p>{{ experience.area }}</p>
            <p class="font-semibold"> {{ experience.company }}</p>
            <p v-if="isShowing" class="underline cursor-pointer">Esconder</p>
            <p v-else class="underline cursor-pointer">Ver Detalhes</p>
        </div>
        <div v-if="isShowing" class="border-b-2 border-main-grey py-6">
            <div class="mx-4" v-for="(task, index) in experience.tasks" :key=index>
                <p class="list-item mx-4 pb-2">{{ task }}</p>
            </div>
        </div>
    </main>
</template>
<script setup>
import { computed, ref } from 'vue';
import IconPlus from '~icons/mdi/plus';
import IconMinus from '~icons/mdi/minus';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

const props = defineProps({
    experience: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});

const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    const month = date.toLocaleString('pt-PT', { month: 'short' }).slice(0, -1);
    const year = date.getFullYear().toString().slice(-2);
    return `${month} '${year}`;
};

const formattedStartingDate = computed(() => formatDate(props.experience.startingDate));
const formattedEndDate = computed(() => formatDate(props.experience.endDate));

const isShowing = ref(false);

</script>