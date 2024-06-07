<template>
    <input class="v-input" v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel()
</script>

<style lang="scss" scoped>
.v-input {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid silver;
    outline-color: deepskyblue;
}
</style>
