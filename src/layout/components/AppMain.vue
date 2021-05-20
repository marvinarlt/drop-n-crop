<template>
    <main :class="sideBarState.isActive ? 'app-main side-bar-opened' : 'app-main'">
        <cropping-container />
        <crop-button />
        <download-modal />
    </main>
</template>

<script>
import SideBarStore from './../../global/state-management/SideBarStore.js';
import CroppingContainer from './../../cropping/components/CroppingContainer.vue';
import CropButton from './../../download/components/CropButton.vue';
import DownloadModal from './../../download/components/DownloadModal.vue';

export default {
    name: 'AppMain',
    components: {
        CroppingContainer,
        CropButton,
        DownloadModal
    },
    data() {
        return {
            sideBarState: SideBarStore.state
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/app-main.scss";
</style>