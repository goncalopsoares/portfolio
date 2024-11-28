<template>
    <div @click="isShowing = !isShowing"
        class="flex flex-col sm:flex-row items-center gap-4 py-6 font-bold justify-between border-b-2 border-main-grey text-base">
        <p class="ms-16">{{ project.title }}</p>
        <p>{{ formattedDate }}</p>
        <p>{{ project.briefDescription }}</p>
        <icon-plus class="me-16" style="font-size: 1.2rem;" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isShowing = ref(false);
</script>