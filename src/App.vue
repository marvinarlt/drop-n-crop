<template>
    <app-main />
    <app-top-bar />
    <app-side-bar />
</template>

<script>
import AppTopBar from './layout/components/AppTopBar.vue';
import AppSideBar from './layout/components/AppSideBar.vue';
import AppMain from './layout/components/AppMain.vue';
import SettingsStore from './global/state-management/SettingsStore.js';

export default {
    name: 'App',
    components: {
        AppTopBar,
        AppSideBar,
        AppMain
    },
    created() {
        SettingsStore.loadFromLocalStorage();
    }
}
</script>