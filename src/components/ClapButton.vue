<template>
    <button :class="{ 'bg-salmon': isClapping === false, 'bg-secundary-green':isClapping === true, 'rounded-full': true, ' p-2': true }"><img :src="clapIconRef"></button>
</template>

<script setup>
import { storage } from '../utils/firebase.js';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { ref as vueRef, onMounted } from 'vue';

const clapIconRef = vueRef('');

const props = defineProps({
    isClapping : {
        type: Boolean,
        required: true
    }
});

onMounted(async () => {
    try {
        const imageStorageRef = storageRef(storage, 'icons/clap.svg');
        const url = await getDownloadURL(imageStorageRef);
        clapIconRef.value = url;

    } catch (error) {
        console.error("Error fetching image: ", error);
    }
});
</script>