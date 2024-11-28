<template>
    <main class="w-full m-0 uppercase">
        <div class="mx-4 md:mx-0 lg:pe-8 lg:p-32 xl:pe-32">
            <h6 class="font-semibold">Redes</h6>
            <div v-for="(social, index) in socials" :key="index" :class="index === 0 ? 'pt-4 pb-2 lg:pt-4 lg:pb-2 lg:px-2' : 'py-2 lg:p-2'">
                <a v-if="isClapping === false && index <= 2" class="underline" :href="social.link">
                    {{ social.name }}
                </a>
                <a v-if="isClapping === true && index === 3" class="underline" :href="social.link">
                    {{ social.name }}
                </a>
            </div>
        </div>
    </main>
</template>

<script setup>

const props = defineProps({
    socials: {
        type: Object,
        required: true
    },
    isClapping: {
        type: Boolean,
        required: true
    }
});

console.log(props.socials);

</script>