<template>
    <main v-if="width >= 768" class="flex flex-row w-full mt-10 uppercase" style="margin-top: 9.22rem;">
        <div class="w-1/2 md:ms-16 lg:ms-32 pe-4 uppercase">
            <ProjectCarousel :projectVideos="videoRefs" :projectImages="imageRefs"
                :projectAltTexts="project.altTexts" />
        </div>
        <div class="w-1/2 flex flex-col gap-1 ps-6 md:me-16 lg:me-32">
            <p class="text-xs"> Âmbito {{ project.scope }}</p>
            <h2 class="uppercase text-xl font-semibold">{{ project.title }}</h2>
            <p class="text-sm font-semibold">{{ project.briefDescription }}</p>
            <div class="flex flex-row gap-6 font-semibold items-center my-3">
                <div v-for="(icon, index) in iconRefs" :key="index">
                    <img :src="icon" :alt="icon" class="w-full object-cover cursor-pointer relative"
                        @mouseover="hoverIndex = index" @mouseleave="hoverIndex = null" />
                    <p v-show="hoverIndex === index" class="text-xs pt-1"> {{ project.technologies[index] }}
                    </p>
                </div>
            </div>
            <p class="mt-2">{{ project.description }}</p>
            <p class="font-semibold uppercase mt-3">Links</p>
            <div v-if="project.links && linkPairs.length" class="flex flex-row gap-2">
                <a v-for="(link, index) in linkPairs" :key="index" :href="link.link" class="underline">
                    {{ link.name }}
                </a>
            </div>
        </div>
    </main>
    <main v-if="width < 768" class="w-full pt-10" style="margin-top: 6rem;">
        
        <div class="flex flex-col gap-1 px-4 uppercase">
            <a href="/projects" class="underline mb-6">
                Ver outros projetos
            </a>
            <div class="mb-6">
                <div v-if="hoverIndex !== null" class="fixed top-0 left-0 bg-transparent z-50 h-full w-full"
                    @click="hideIndex"></div>
                <p class="text-sm"> Âmbito {{ project.scope }}</p>
                <div class="flex flex-row justify-start items-center text-center gap-6 py-5">
                    <div v-for="(icon, index) in iconRefs" :key="index" class="">
                        <img :src="icon" :alt="icon" @click="toggleIndex(index)" />
                        <p v-show="hoverIndex === index" class="fixed text-xs pt-1 ms-0.5">
                            {{ project.technologies[index] }}
                        </p>
                    </div>
                    <div v-if="hoverIndex !== null" class="overlay" @click="hideIndex"></div>
                </div>
                <h2 class="uppercase text-xl font-semibold mb-1">{{ project.title }}</h2>
                <p>{{ project.briefDescription }}</p>
            </div>
            <div class="my-6">
                <ProjectCarousel :projectVideos="videoRefs" :projectImages="imageRefs"
                    :projectAltTexts="project.altTexts" />
            </div>
            <p class="mt-2">{{ project.description }}</p>
            <p class="font-semibold uppercase mt-6">Links</p>
            <div v-if="project.links && linkPairs.length" class="flex flex-row gap-2">
                <a v-for="(link, index) in linkPairs" :key="index" :href="link.link" class="underline">
                    {{ link.name }}
                </a>
            </div>
        </div>
        <div v-if="width <= 768" class="mt-14">
            <Footer />
        </div>
    </main>
</template>



<script setup>
import ProjectCarousel from '@/components/ProjectCarousel.vue';
import Footer from '@/components/Footer.vue';
import { db, storage } from '../utils/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { ref as vueRef, onMounted, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

const props = defineProps({
    projectId: {
        type: String,
        required: true
    }
});

const project = vueRef([]);

onMounted(async () => {
    const docSnap = await getDoc(doc(db, 'projects', props.projectId));
    if (docSnap.exists()) {
        project.value = docSnap.data();
    } else {
        console.log('No such document!');
    }
    console.log(project.value);
});

const hoverIndex = vueRef(null);

const videoRefs = vueRef([]);

onMounted(async () => {
    try {

        const refs = storageRef(storage, 'videos/' + props.projectId);


        const listRef = await listAll(refs);


        for (const itemRef of listRef.items) {
            const url = await getDownloadURL(itemRef);
            videoRefs.value.push(url);
        }
    } catch (error) {
        console.error("Error fetching videos: ", error);
    }
});

const imageRefs = vueRef([]);

onMounted(async () => {
    try {
        const refs = storageRef(storage, 'images/' + props.projectId);
        const listRef = await listAll(refs);
        for (const itemRef of listRef.items) {
            const url = await getDownloadURL(itemRef);
            imageRefs.value.push(url);
        }

    } catch (error) {
        console.error("Error fetching images: ", error);
    }
});

const iconRefs = vueRef([]);


onMounted(async () => {
    try {

        const refs = [storageRef(storage, 'icons/php.svg'), storageRef(storage, 'icons/laravel.svg'), storageRef(storage, 'icons/mysql.svg'), storageRef(storage, 'icons/react.svg'), storageRef(storage, 'icons/bootstrap.svg')];

        for (const ref of refs) {
            const url = await getDownloadURL(ref);
            iconRefs.value.push(url);
        }

    } catch (error) {
        console.error("Error fetching images: ", error);
    }
});

const linkPairs = computed(() => {

    const urls = project.value.links;
    const pairs = [];
    const links = [];
    const names = [];

    for (const [key, value] of Object.entries(urls)) {
        if (key.startsWith("link_")) {
            links.push(value);
        } else if (key.startsWith("name_")) {
            names.push(value);
        }
    }

    for (let i = 0; i < links.length; i++) {
        pairs.push({ link: links[i], name: names[i] });
    }

    return pairs;
});

const toggleIndex = (index) => {
    hoverIndex.value = hoverIndex.value === index ? null : index;
};

const hideIndex = () => {
    hoverIndex.value = null;
};

</script>