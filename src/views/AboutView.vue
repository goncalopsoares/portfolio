<template>
    <div class="" v-if="width < 768">
        <div class="" v-if="aboutInfo[0]">
            <AboutCardBriefing class="mt-20 p-4 lg:border-b-2 lg:border-main-grey" :briefing="briefing"
                :isClapping="isClapping" />
            <div class="border-b-2 border-main-grey">
                <div class="m-4">
                    <img v-if="isClapping === false" :src="profilePictureRef" alt="photo"
                        class="object-fill pb-8 lg:mt-96 xl:mt-64" />
                    <img v-if="isClapping === true" :src="profilePictureRef2" alt="photo"
                        class="object-fill pb-8 lg:mt-96 xl:mt-64" />
                </div>
            </div>
            <AboutCardSocials class="mb-12 mt-16" :socials="socialsPairs" :isClapping="isClapping" />
        </div>
        <div class="w-full text-end fixed bottom-12 z-40 pe-8">
            <ClapButton :isClapping="isClapping" @click="toggleClap" />
        </div>
    </div>
    <div class="grid grid-cols-12 mt-28" v-if="width >= 768 && width < 1024">
        <div class="col-span-7 mt-8" v-if="aboutInfo[0]">
            <AboutCardBriefing
                :class="{ 'border-b-2': isClapping === false, 'border-main-grey': isClapping === false, 'ps-16': true }"
                :briefing="briefing" :isClapping="isClapping" />
        </div>
        <div class="col-span-5">
            <AboutCardSocials class="mt-20 mb-12 pe-16" :socials="socialsPairs" :isClapping="isClapping" />
            <div class="pe-16 pt-8 mb-8">
                <div :class="{
                    '-ms-4': true,
                    'pe-16': true,
                    'z-10': true,
                    'relative': true,
                    '-mb-8': isClapping === true,
                    '-mb-6': isClapping === false
                }">
                    <ClapButton :isClapping="isClapping" @click="toggleClap" />
                </div>
                <img v-if="isClapping === false" :src="profilePictureRef" alt="photo"
                    class="object-fill mb-24  lg:mt-96 xl:mt-64" />
                <img v-if="isClapping === true" :src="profilePictureRef2" alt="photo"
                    class="object-fill pb-8 lg:mt-96 xl:mt-64" />
            </div>
        </div>
    </div>
    <div class="grid grid-cols-12 mt-28 mb-10" v-if="width >= 1024">
        <div class="col-span-7 xl:col-span-7" v-if="aboutInfo[0]">
            <AboutCardBriefing class="border-main-grey border-b-2"
                :briefing="briefing" :isClapping="isClapping" />
            <AboutCardSocials :socials="socialsPairs" :isClapping="isClapping"/>
        </div>
        <div class="col-span-5 xl:col-span-5 lg:pe-32">
            <img v-if="isClapping === false" :src="profilePictureRef" alt="photo" class="lg:mt-72 xl:mt-64 mb-32" />
            <img v-if="isClapping === true" :src="profilePictureRef2" alt="photo" class="lg:mt-96 pt-72 xl:mt-64 mb-32" />
        </div>
        <div class="fixed w-full text-end mt-24 pe-32">
                <ClapButton :isClapping="isClapping" @click="toggleClap" />
            </div>
    </div>
    <div v-if="width < 768" class="mt-8">
        <Footer />
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { db, storage } from '../utils/firebase.js';
import { getDocs, collection } from 'firebase/firestore';
import AboutCardBriefing from '../components/AboutCardBriefing.vue';
import AboutCardSocials from '@/components/AboutCardSocials.vue';
import ClapButton from '@/components/ClapButton.vue';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { ref as vueRef, onMounted, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const aboutInfo = vueRef([]);
const briefing = vueRef([]);
const { width } = useWindowSize();
const isClapping = vueRef(false);

onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'about'));

    querySnapshot.forEach((doc) => {
        aboutInfo.value.push({ infoId: doc.id, ...doc.data() });
    })
    if (aboutInfo.value[0]) {

        const infoArray = aboutInfo.value[0];

        briefing.value = {
            briefingLI: infoArray.briefingLI,
            briefingPoints: infoArray.briefingShort
        };

    }

});

const toggleClap = () => {
    isClapping.value = !isClapping.value;
};

const socialsPairs = computed(() => {

    if (!aboutInfo.value[0]) {
        return [];
    }

    const socials = aboutInfo.value[0].socials;
    const pairs = [];

    const links = {};
    const names = {};

    for (const [key, value] of Object.entries(socials)) {
        if (key.startsWith("link_")) {
            const index = key.split('_')[1];
            links[index] = value;
        } else if (key.startsWith("name_")) {
            const index = key.split('_')[1];
            names[index] = value;
        }
    }

    for (const index in links) {
        if (names[index]) {
            pairs.push({ link: links[index], name: names[index] });
        }
    }

    return pairs;
});

const profilePictureRef = vueRef('');
const profilePictureRef2 = vueRef('');

onMounted(async () => {
    try {
        const imageStorageRef = storageRef(storage, 'images/about/CNV000015_1.jpg');
        const imageStorageRef2 = storageRef(storage, 'images/about/CNV000015_2.jpg');
        const url = await getDownloadURL(imageStorageRef);
        const url2 = await getDownloadURL(imageStorageRef2);
        profilePictureRef.value = url;
        profilePictureRef2.value = url2;

    } catch (error) {
        console.error("Error fetching image: ", error);
    }
});

</script>