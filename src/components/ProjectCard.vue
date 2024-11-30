<template>
    <main v-if="width >= 768" class="w-full m-0 uppercase" :style="index === 0 ? { marginTop: '9.22rem' } : {}">
        <div @click="isShowing = !isShowing"
            class=" flex items-center justify-between gap-16 py-6 border-b-2 border-main-grey text-base text-main-grey">
            <p class="ms-16 lg:ms-32">{{ formattedDate }}</p>
            <p class="uppercase flex-shrink-0 w-2/12"> {{ project.title }}</p>
            <p>{{ project.briefDescription }}</p>
            <icon-minus v-if="isShowing" class="ml-auto me-16 lg:me-32" :style="width <= 850
                ? { fontSize: '2.5rem' }
                : (width <= 1024 && width >= 851
                    ? { fontSize: '2rem' }
                    : (width >= 1025 && width <= 1280
                        ? { fontSize: '1.5rem' }
                        : { fontSize: '1.25rem' }))" />
            <icon-plus v-else class="ml-auto me-16 lg:me-32"
                :style="width <= 1024 ? { fontSize: '2.5rem' } : { fontSize: '1.25rem' }" />
        </div>
        <div v-if="isShowing" class="px-16 lg:px-32 py-6 border-b-2 border-main-grey">
            <div class="flex flex-col sm:flex-row items-center justify-between">
                <p class="font-semibold text-main-grey">Âmbito {{ project.scope }}</p>
                <div v-if="project.technologies && project.technologies.length"
                    class="flex flex-row gap-3 font-semibold">
                    <p v-for="(technology, index) in project.technologies" :key="index">
                        {{ technology }}
                    </p>
                </div>
            </div>
            <p class="mt-6">{{ project.description }}</p>
            <div class="mt-6">
                <p v-if="project.collaborators" class="font-semibold mb-4">O meu papel</p>
                <p v-else class="font-semibold mb-4">Características principais</p>
                <div v-if="project.role && project.role.length">
                    <p v-for="(role, index) in project.role" :key="index">
                        • {{ role }}
                    </p>
                </div>
            </div>
            <router-link :to="{ name: 'projectDetails', params: { projectId: project.projectId } }">
                <a class="block underline font-semibold text-salmon my-6">Ler mais</a>
            </router-link>
            <div v-if="project.collaborators && collaboratorPairs.length" class="mt-6">
                <p class="font-semibold">Em colaboração com</p>
                <div v-if="project.collaborators && collaboratorPairs.length" class="flex flex-row gap-2">
                    <a v-for="(collaborator, index) in collaboratorPairs" :key="index" :href="collaborator.link"
                        class="underline">
                        {{ collaborator.name }}
                    </a>
                </div>
            </div>
        </div>
    </main>
    <main v-if="width < 768" class="w-full m-0 uppercase ">
        <div @click="isShowing = !isShowing" class="p-4 flex flex-col gap-4 py-6 border-b-2 border-main-grey"
            :style="index === 0 ? { marginTop: '10.5rem' } : {}">
            <div class="flex flex-row justify-between">
                <p>{{ formattedDate }}</p>
                <p class="font-semibold"> {{ project.title }}</p>
            </div>
            <p>{{ project.briefDescription }}</p>
            <p v-if="isShowing" class="underline cursor-pointer">Esconder</p>
            <p v-else class="underline cursor-pointer">Ver Detalhes</p>
        </div>
        <div v-if="isShowing" class="px-4 py-6 border-b-2 border-main-grey flex flex-col gap-4">
            <div v-if="project.technologies && project.technologies.length"
                class="flex flex-row gap-3 font-semibold text-wrap">
                <p>
                    {{ project.technologies.join(', ') }}
                </p>
            </div>
            <p>{{ project.description }}</p>
            <router-link :to="{ name: 'projectDetails', params: { projectId: project.projectId } }">
                <a class="block underline font-semibold text-salmon">Ler mais</a>
            </router-link>
            <div class="mt-6">
                <p v-if="project.collaborators" class="font-semibold mb-4">O meu papel</p>
                <p v-else class="font-semibold mb-4">Características principais</p>
                <div v-if="project.role && project.role.length">
                    <div v-for="(role, index) in project.role" :key="index">
                        <p class="list-item mx-4 pb-2">{{ role }}</p>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <p  v-if="project.collaborators && collaboratorPairs.length" class="font-semibold mb-4">Em colaboração com</p>
                <div v-if="project.collaborators && collaboratorPairs.length" class="flex flex-row gap-2">
                    <a v-for="(collaborator, index) in collaboratorPairs" :key="index" :href="collaborator.link"
                        class="underline">
                        {{ collaborator.name }}
                    </a>
                </div>
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
    project: {
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

const formattedDate = computed(() => formatDate(props.project.date));

const collaboratorPairs = computed(() => {
    const collaborators = props.project.collaborators;
    const pairs = [];

    const links = {};
    const names = {};

    // Separate names and links into dictionaries by their index (e.g., 1, 2, 3)
    for (const [key, value] of Object.entries(collaborators)) {
        if (key.startsWith("link_")) {
            const index = key.split('_')[1]; // Extract the number (e.g., '1' from 'link_1')
            links[index] = value;
        } else if (key.startsWith("name_")) {
            const index = key.split('_')[1]; // Extract the number (e.g., '1' from 'name_1')
            names[index] = value;
        }
    }

    // Create pairs based on matching index
    for (const index in links) {
        if (names[index]) {  // Ensure a corresponding name exists for the link
            pairs.push({ link: links[index], name: names[index] });
        }
    }

    return pairs;
});


const isShowing = ref(false);

</script>