<script setup lang="ts">

</script>

<template>
    <VanConfigProvider>
        <router-view v-slot="{ Component, route }">
            <transition name="slide">
                <component :is="Component" :key="route" />
            </transition>
        </router-view>
    </VanConfigProvider>
</template>

<style scoped></style>
