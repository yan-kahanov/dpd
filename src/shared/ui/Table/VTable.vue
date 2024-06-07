<template>
    <table class="v-table">
        <slot></slot>
    </table>
</template>

<style lang="scss" scoped>
.v-table{
    border-collapse: collapse;
    border-radius: 10px;
}
:slotted(td) {
    border: 1px solid grey;
    padding: 5px;
    text-align: center;
}
:slotted(tr){
    &:nth-child(odd){
        background-color: rgb(229, 229, 229);
    }
}
</style>
