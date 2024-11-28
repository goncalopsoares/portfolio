<template>
    <main class="w-full mb-12 lg:m-0 uppercase">
        <div class="mt-12 md:pb-12 lg:pb-24 md:pe-16 lg:px-32 lg:pt-16 xl:pe-32">
            <div class="flex flex-row">
                <h6 class="font-semibold">Sobre</h6>
                <ClapHands v-if="isClapping === false" @click="toggleClap" class="ms-4 cursor-pointer" />
                <ClapHandsOff v-else="isClapping === true" @click="toggleClap" class="ms-4 cursor-pointer" />
            </div>
            <div v-if="isClapping === true" v-for="(point, index) in briefing.briefingLI" :key="index"
                :class="[{ 'pt-6': index === 0}, 'py-2']">
                <p>{{ point }}</p>
            </div>
            <div v-if="isClapping === false" v-for="(point, index) in briefing.briefingPoints" :key="index"
                :class="[{ 'pt-6': index === 0}, 'py-2']">
                <p>{{ point }}</p>
            </div>
        </div>
    </main>
</template>

<script setup>

const props = defineProps({
    briefing: {
        type: Object,
        required: true
    },
    isClapping: {
        type: Boolean,
        required: true
    }
});


console.log(props.briefing);

</script>