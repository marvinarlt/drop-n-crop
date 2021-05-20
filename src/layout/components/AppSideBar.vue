<template>
    <div class="app-side-bar" :class="sideBarState.isActive ? 'active' : ''">
        <div class="side-bar-header">
            <span class="side-bar-label">Settings</span>
            <div class="side-bar-close" @click="closeSideBar">
                <close-icon />
            </div>
        </div>
        <div class="side-bar-content">
            <accordion title="Options">
                <options />
            </accordion>
            <accordion title="Breakpoints">
                <breakpoints />
            </accordion>
            <accordion title="Image sizes">
                <image-sizes />
            </accordion>
        </div>
    </div>
</template>

<script>
import SideBarStore from './../../global/state-management/SideBarStore.js';
import Accordion from './../../component-library/accordion/Accordion.vue';
import Options from './../../settings/components/Options.vue';
import Breakpoints from './../../settings/components/Breakpoints.vue';
import ImageSizes from './../../settings/components/ImageSizes.vue';
import CloseIcon from './../../global/assets/icons/close.svg';

export default {
    name: 'AppSideBar',
    components: {
        Accordion,
        Options,
        Breakpoints,
        ImageSizes,
        CloseIcon
    },
    data() {
        return {
            sideBarState: SideBarStore.state
        }
    },
    methods: {
        closeSideBar() {
            SideBarStore.deactivate();
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/app-side-bar";
</style>