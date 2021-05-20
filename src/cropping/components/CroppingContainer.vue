<template>
    <div class="cropping-container">
        <cropping-element v-for="(file, fileIndex) in files" :key="fileIndex" :file="file" />
        <drop-area />
    </div>
</template>

<script>
import CroppingStore from './../../global/state-management/CroppingStore.js';
import CroppingElement from './CroppingElement.vue';
import DropArea from './DropArea.vue';

export default {
    name: 'CroppingContainer',
    components: {
        CroppingElement,
        DropArea
    },
    data() {
        return {
            files: CroppingStore.state.uploadedFiles
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/cropping-container";
</style>