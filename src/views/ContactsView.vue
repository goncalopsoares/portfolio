<template>
    <main v-if="width < 768" class="w-full m-0 uppercase" style="margin-top: 9.22rem;">
        <div>
            <div v-for="(contact, index) in contactPairs" :key="index"
                :class="index === 0 ? 'pt-4 pb-12 border-b-2 border-main-grey' : 'py-12 border-b-2 border-main-grey'">
                <a v-if="index === 0" class="underline mx-4" :href="`mailto:${contact.link}`">
                    {{ contact.link }}
                </a>
                <a v-else class="underline mx-4" :href="contact.link">
                    {{ contact.name }}
                </a>
            </div>
        </div>
        <div class="mt-12 mb-20 mx-4">
            <img :src="profilePictureRef" alt="photo" class="object-fill" />
        </div>
    </main>
    <main v-if="width >= 768 && width < 1024" class="w-full m-0 uppercase" style="margin-top: 9.22rem;">
        <div class="grid grid-cols-6">
            <div class="col-span-3" v-if="contactPairs[0]">
                <div v-for="(contact, index) in contactPairs" :key="index"
                    :class="index === 0 ? 'pt-4 pb-12 border-b-2 border-main-grey' : 'py-12 border-b-2 border-main-grey'">
                    <a v-if="index === 0" class="underline mx-16" :href="`mailto:${contact.link}`">
                        {{ contact.link }}
                    </a>
                    <a v-else class="underline mx-16" :href="contact.link">
                        {{ contact.name }}
                    </a>
                </div>
            </div>
            <div class="col-span-3">
                <div class="mt-16 mb-20 me-16">
                    <img :src="profilePictureRef" alt="photo" class="object-fill" />
                </div>
            </div>
        </div>
    </main>
    <main v-if="width >= 1024" class="w-full m-0 uppercase" style="margin-top: 9.22rem;">
        <div class="grid grid-cols-12">
            <div class="col-span-7" v-if="contactPairs[0]">
                <div v-for="(contact, index) in contactPairs" :key="index"
                    :class="index === 0 ? 'mt-20 pb-12 border-b-2 border-main-grey' : 'py-12 border-b-2 border-main-grey'">
                    <a v-if="index === 0" class="underline mx-32" :href="`mailto:${contact.link}`">
                        {{ contact.link }}
                    </a>
                    <a v-else class="underline mx-32" :href="contact.link">
                        {{ contact.name }}
                    </a>
                </div>
            </div>
            <div class="col-span-5">
                <div class="mt-16 mb-12 me-32">
                    <img :src="profilePictureRef" alt="photo" class="object-fill" />
                </div>
            </div>
        </div>
    </main>
    <div v-if="width < 768">
        <Footer />
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { db, storage } from '../utils/firebase.js';
import { getDoc, doc } from 'firebase/firestore';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { ref as vueRef, onMounted, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const contactsObject = vueRef({});
const profilePictureRef = vueRef('');
const { width } = useWindowSize();

onMounted(async () => {
    try {
        const docRef = doc(db, 'about', 'texts');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const contacts = docSnapshot.data().contacts;
            contactsObject.value = contacts;
        } else {
            console.error('No such document!');
        }
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
});

const contactPairs = computed(() => {

    if (!contactsObject.value) {
        return [];
    }

    const pairs = [];

    const links = {};
    const names = {};

    for (const [key, value] of Object.entries(contactsObject.value)) {
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

    console.log('Pairs:', pairs);

    return pairs;
});

onMounted(async () => {
    try {
        const imageStorageRef = storageRef(storage, 'images/about/CNV000016_1.jpg');
        const url = await getDownloadURL(imageStorageRef);
        profilePictureRef.value = url;

    } catch (error) {
        console.error("Error fetching image: ", error);
    }
});

</script>