<template>
    <div class="app-side-bar-toggler" @click="openSideBar">
        <settings-icon />
    </div>
</template>

<script>
import SideBarStore from './../../global/state-management/SideBarStore.js';
import SettingsIcon from './../../global/assets/icons/settings.svg';

export default {
    name: 'AppSideBarToggler',
    components: {
        SettingsIcon
    },
    methods: {
        openSideBar() {
            SideBarStore.activate();
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/app-side-bar-toggler";
</style>