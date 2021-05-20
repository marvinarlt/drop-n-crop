<template>
    <div class="crop-button" :class="sideBarState.isActive ? 'side-bar-opened' : ''">
        <button class="button" @click="onClick">
            <span class="crop-button-label">Crop images</span>
            <crop-icon />
        </button>
    </div>
</template>

<script>
import SideBarStore from './../../global/state-management/SideBarStore.js';
import DownloadModalStore from './../../global/state-management/DownloadModalStore.js';
import CropIcon from './../../global/assets/icons/crop.svg';

export default {
    name: 'CropButton',
    components: {
        CropIcon
    },
    data() {
        return {
            sideBarState: SideBarStore.state
        }
    },
    methods: {
        onClick() {
            DownloadModalStore.open();
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/crop-button";
</style>