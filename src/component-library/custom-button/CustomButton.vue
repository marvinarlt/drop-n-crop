<template>
    <a v-if="type == 'link'"
        class="button"
        :class="className"
        :href="link"
        :title="title">{{ label }}</a>
        
    <button v-else
        class="button"
        :class="className"
        :type="type">{{ label }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        type: String,
        label: String,
        className: String,
        link: String,
        title: String
    }
}
</script>

<style lang="scss">
    @import "./assets/scss/custom-button";
</style>