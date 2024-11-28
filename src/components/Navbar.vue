<template>
    <header v-if="width >= 768" class="fixed z-50 w-full top-0 bg-background border-main-grey border-b-2">
        <nav class="flex flex-row items-center py-6 md:px-16 lg:px-32 uppercase justify-between">
            <router-link :to="{ name: 'home' }">
                <p class="uppercase font-semibold">Gonçalo Soares</p>
            </router-link>
            <div>
                <router-link v-for="(option, index) in navOptions" :key="option.name" :to="option.link" :class="[{ 'me-12': index <= 2 },
                { 'underline': option.link.name === route.path.slice(1) }]">
                    <a>{{ option.name }}</a>
                </router-link>
            </div>
        </nav>
    </header>
    <header v-else class="fixed w-full top-0  bg-background border-main-grey border-b-2 z-50">
        <nav class="flex flex-row items-center py-6 px-4 uppercase justify-between">
            <router-link :to="{ name: 'home' }">
                <p class="uppercase font-semibold">Gonçalo Soares</p>
            </router-link>
            <button @click="toggleMenu">
                <icon-menu style="font-size: 2rem;" v-if="menuIsOpen === false" />
                <icon-close style="font-size: 2rem;" v-if="menuIsOpen === true" />
            </button>
        </nav>
        <div v-if="menuIsOpen === true"
            class="flex flex-col items-center justify-center bg-background w-full border-main-grey border-t-2"
            style="height: 100vh;">
            <router-link @click="toggleMenu" v-for="(option, index) in navOptions" :key="option.name" :to="option.link"
                :class="['uppercase', 'my-8',
                    { 'underline': option.link.name === route.path.slice(1) }, { 'pt-6': option.link.name === 'about' }, { 'pb-6': option.link.name === 'contacts' }, { '-mt-20': index === 0 }]">
                {{ option.name }}
            </router-link>
        </div>
    </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';
import IconMenu from '~icons/mdi/menu';
import IconClose from '~icons/mdi/close';
import { ref } from 'vue';

const route = useRoute();
const { width } = useWindowSize();
const menuIsOpen = ref(false);

const toggleMenu = () => {
    menuIsOpen.value = !menuIsOpen.value;
    console.log(menuIsOpen.value);
};

const navOptions = [
    { name: 'Sobre', link: { name: 'about' } },
    { name: 'Experiência', link: { name: 'experience' } },
    { name: 'Projetos', link: { name: 'projects' } },
    { name: 'Contactos', link: { name: 'contacts' } }
];

</script>
