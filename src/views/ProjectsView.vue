<template>
    <SecundaryNavbar />
    <ProjectCard v-for="(project, index) in filteredProjects" :key="project.projectId" :project="project" :index="index" />
    <router-view></router-view>
    <div v-if="width < 768">
        <Footer />
    </div>
</template>

<script setup>
import { db } from '../utils/firebase.js';
import { getDocs, collection } from 'firebase/firestore';
import { ref, onMounted, computed, provide } from 'vue';
import { useWindowSize } from '@vueuse/core';
import ProjectCard from '../components/ProjectCard.vue';
import SecundaryNavbar from '@/components/SecundaryNavbar.vue';
import Footer from '@/components/Footer.vue';

const { width } = useWindowSize();
const projects = ref([]);


const selected = ref('tudo');
const setSelected = (optionName) => {
    selected.value = optionName;
};

provide('selected', selected);
provide('setSelected', setSelected);

onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    querySnapshot.forEach((doc) => {
        projects.value.push({ projectId: doc.id, ...doc.data() });
    })
    console.log(projects.value);
});

const filteredProjects = computed(() => {
    if (selected.value === 'tudo') {
        return projects.value;
    } else {
        return projects.value.filter(project => project.type === selected.value);
    }
});

</script>