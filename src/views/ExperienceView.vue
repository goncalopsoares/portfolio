<template>
    <SecundaryNavbar />
    <ExperienceCard v-for="(experience, index) in filteredExperiences" :key="experience.experienceId"
        :experience="experience" :index="index" />
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
import ExperienceCard from '../components/ExperienceCard.vue';
import SecundaryNavbar from '@/components/SecundaryNavbar.vue';
import Footer from '@/components/Footer.vue';

const { width } = useWindowSize();
const experiences = ref([]);

const selected = ref('tudo');
const setSelected = (optionName) => {
    selected.value = optionName;
};

provide('selected', selected);
provide('setSelected', setSelected);

onMounted(async () => {

    const querySnapshot = await getDocs(collection(db, 'experience'));
    querySnapshot.forEach((doc) => {
        experiences.value.push({ experienceId: doc.id, ...doc.data() });
    })
    console.log(experiences.value);
});

const filteredExperiences = computed(() => {
    if (selected.value === 'tudo') {
        return experiences.value.sort((a, b) => b.startingDate - a.startingDate);
    } else {
        return experiences.value.filter(experience => experience.type === selected.value).sort((a, b) => b.startingDate - a.startingDate);
    }
});

</script>