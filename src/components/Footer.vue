<template>
    <header v-if="width >= 768" class="sticky bottom-0 bg-main-grey border-main-grey border-b-2">
        <nav class="flex flex-row items-center py-6 md:px-16 lg:px-32 uppercase justify-between">
            <div class="uppercase text-background flex flex-row items-center justify-between gap-10">
                <p>Gonçalo Soares</p>
                <p>©2024</p>
                <p>gpsoares@sapo.pt</p>
            </div>
            <div class="uppercase text-background text-sm">
                <p>Developed with vue.js</p>
            </div>
        </nav>
    </header>
    <header v-else class="sticky bottom-0 bg-main-grey border-main-grey border-b-2">
        <nav class="flex flex-col items-center uppercase text-background py-6">
            <div class="text-center">
                <p>Gonçalo Soares</p>
                <p>©2024</p>
                <p>gpsoares@sapo.pt</p>
            </div>
            <div class="pt-6 text-sm">
                <p>Developed with vue.js</p>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import { useWindowSize } from '@vueuse/core';

    const { width } = useWindowSize();
</script>