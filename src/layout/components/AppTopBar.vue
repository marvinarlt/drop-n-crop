<template>
    <div class="app-top-bar">
        <branding />
        <app-side-bar-toggler />
    </div>
</template>

<script>
import Branding from './../../component-library/branding/Branding.vue';
import AppSideBarToggler from './AppSideBarToggler.vue';

export default {
    name: 'AppTopBar',
    components: {
        Branding,
        AppSideBarToggler
    }    
}
</script>

<style lang="scss">
    @import "./../assets/scss/app-top-bar";
</style>