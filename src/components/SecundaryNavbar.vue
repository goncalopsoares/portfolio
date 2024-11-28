<template>
    <header
        :class="['fixed', 'w-full', 'bg-secundary-green', 'text-snow-white', 'border-b-2', { 'border-t-2': width <= 767 }, 'border-main-grey']"
        style="top: 4.6rem;">
        <nav
            :class="['items-center', 'md:justify-end', 'flex', 'flex-row', 'py-6', 'md:px-16', 'lg:px-32', 'uppercase', { 'overflow-x-scroll': width <= 767 }, { 'justify-center': width >= 395 && width <= 767 }]">
            <div>
                <a v-for="option in navOptions" :key="option.name"
                    :class="[{ 'ms-8': option.code === 'work' || option.code === 'academic' || option.code === 'web' || option.code === 'spreadsheets' || option.code === 'apps' || option.code === 'outros' }, 'interactive', 'text-nowrap', 'md:ms-24', option.class, { 'underline': selected === option.code }, { 'pe-4': option.code === 'academic' && width <= 767 }, { 'pe-4': option.code === 'outros' && width <= 767 }, { 'ps-4': option.code === 'tudo' && width <= 767 }]"
                    @click="setSelected(option.code)">
                    {{ option.name }}
                </a>
            </div>
        </nav>
    </header>
</template>

<script setup>

import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';

const selected = inject('selected');
const setSelected = inject('setSelected');
const { width } = useWindowSize();

const route = useRoute();

const navOptions = computed(() => {
    if (route.path.slice(1) === 'projects') {
        return [
            { name: 'Tudo', code: 'tudo' },
            { name: 'Web', code: 'web' },
            { name: 'Spreadsheets', code: 'spreadsheets' },
            { name: 'Apps', code: 'apps' },
            { name: 'Outros', code: 'outros' }
        ];
    } else {
        return [
            { name: 'Tudo', code: 'tudo' },
            { name: 'Trabalho', code: 'work' },
            { name: 'Formação Académica', code: 'academic' },
        ];
    }
});

</script>