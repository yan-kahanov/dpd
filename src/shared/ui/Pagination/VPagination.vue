<template>
    <div v-if="total > 0" class="v-pagination">
        <button :disabled="isDisabled || isFirstPage" @click="updateModelValue(modelValue - 1)">
            {{ '❮' }}
        </button>

        <button
            :class="{ active: modelValue === 1 }"
            :disabled="isDisabled || isFirstPage"
            @click="updateModelValue(1)"
            v-text="1"
        />

        <span v-if="visibleDotsLeft">...</span>

        <button
            v-for="page in pages"
            :key="page"
            :class="{ active: page === modelValue }"
            :disabled="isDisabled"
            @click="updateModelValue(page)"
            v-text="page"
        />

        <span v-if="visibleDotsRight">...</span>

        <button
            v-if="total > 1"
            :class="{ active: total === modelValue }"
            :disabled="total === modelValue || isDisabled"
            @click="updateModelValue(total)"
            v-text="total"
        />

        <button :disabled="isDisabled || isLastPage" @click="updateModelValue(modelValue + 1)">
            {{ '❯' }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

type Props = {
    modelValue: number
    total: number
    isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isDisabled: false
})

const isFirstPage = computed(() => props.modelValue === 1)
const isLastPage = computed(() => props.modelValue === props.total)

const visibleDots = computed(() => {
    return props.total > 6
})

const visibleDotsLeft = computed(() => visibleDots.value && props.modelValue > 3)

const visibleDotsRight = computed(
    () => visibleDots.value && props.modelValue < props.total - 2
)

const pages = computed(() => {
    if (props.modelValue < 4) {
        return getStartPages()
    }

    if (props.modelValue > props.total - 3) {
        return getEndPages()
    }

    return getMiddlePages()
})

function updateModelValue(num: number) {
    emit('update:modelValue', num)
}

function getStartPages() {
    return getStartPagesList().filter(between)
}
function getStartPagesList() {
    return [2, 3, 4]
}

function getMiddlePages() {
    return [props.modelValue - 1, props.modelValue, props.modelValue + 1]
}

function getEndPages() {
    return [
        props.modelValue - 3,
        props.modelValue - 2,
        props.modelValue - 1,
        props.modelValue,
        props.modelValue + 1,
        props.modelValue + 2
    ]
        .filter(between)
        .slice(-3)
}

function between(page: number) {
    return page > 1 && page < props.total
}
</script>

<style scoped lang="scss">
.v-pagination {
    display: flex;
    gap: 5px;
    button{
        height: 35px;
        width: 35px;
        border: none;
        border-radius: 5px;
        transition: all .3s;
        font-weight: 600;
        &:hover:not(:disabled):not(.active){
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
        &.active{
            background-color: deepskyblue;
            color: white;
            cursor: auto;
        }
    }
}
</style>
