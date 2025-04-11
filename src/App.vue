<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component v-if="route.meta.keep" :is="Component" />
    </keep-alive>
    <component v-if="!route.meta.keep" :is="Component" />
  </router-view>
</template>

<script setup></script>

<style scoped></style>
