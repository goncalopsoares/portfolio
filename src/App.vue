<template>
    <div class="flex flex-col min-h-screen font-SpaceMono bg-background">
        <Navbar />
        <div class="flex-grow">
            <router-view />
        </div>
        <div v-if="width >= 768" class="sticky bottom-0 bg-main-grey border-main-grey border-b-2">
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();
</script>


<style>

body {
  cursor: url('/cursor.svg'), auto;
}

button, a, .interactive {
  cursor: url('/pointer.svg'), pointer;
}

</style>
