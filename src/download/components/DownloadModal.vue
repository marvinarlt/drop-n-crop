<template>
    <div class="download-modal" v-if="downloadModalState.isActive">
        <div class="download-modal-wrapper">
            <div class="modal-header">
                <span class="modal-headline">Preview</span>
            </div>
            <div class="modal-content">
                <download-element v-for="(images, imageIndex) in filteredCroppedImages" :key="imageIndex" :images="images" />
            </div>
            <div class="modal-buttons">
                <custom-button type="button" label="Cancel" class="secondary" @click="closeModal" />
                <button class="button download" type="button" @click="onDownloadClick">{{ downloadText }} <refresh-icon ref="loader" /></button>
            </div>
        </div>
    </div>
</template>

<script>
import DownloadModalStore from './../../global/state-management/DownloadModalStore.js';
import CroppingStore from './../../global/state-management/CroppingStore.js';
import CustomButton from './../../component-library/custom-button/CustomButton.vue';
import DownloadElement from './../../download/components/DownloadElement.vue'
import RefreshIcon from './../../global/assets/icons/refresh.svg';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default {
    name: 'DownloadModal',
    components: {
        CustomButton,
        RefreshIcon,
        DownloadElement
    },
    data() {
        return {
            downloadModalState: DownloadModalStore.state,
            croppingState: CroppingStore.state,
            downloadText: 'Download'
        }
    },
    computed: {
        filteredCroppedImages() {
            let croppedImages = this.croppingState.croppedImages;

            for (let croppedImagesIndex in croppedImages) {
                let croppedImagesByBreakpoint = croppedImages[croppedImagesIndex];
                let filteredCroppedImagesByBreakpoint = croppedImagesByBreakpoint.filter(croppedImages => croppedImages != null);
                let sortedCroppedImagesByBreakpoint = filteredCroppedImagesByBreakpoint.sort((first, second) => first.width - second.width);

                croppedImages[croppedImagesIndex] = sortedCroppedImagesByBreakpoint;
            }

            return croppedImages;
        }
    },
    methods: {
        closeModal() {
            DownloadModalStore.close();
            CroppingStore.resetCroppedImages();
        },
        onDownloadClick() {
            this.saveImages();
        },
        saveImages() {
            let loader = this.$refs.loader;
            let zip = new JSZip();
            let croppedImages = this.croppingState.croppedImages;

            this.downloadText = 'Downloading';
            loader.classList.add('show');

            for (let imagesByBreakpoint of croppedImages) {
                for (let image of imagesByBreakpoint) {
                    // TODO: get file extension from original image
                    let fileName = image.name + '.jpg';

                    zip.file(fileName, image.blob);
                }
            }
            
            zip.generateAsync({ type: 'blob' }).then(content => {
                loader.classList.remove('show');
                this.downloadText = 'Download';

                saveAs(content, 'dropncrop.zip');
            });
        },
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/download-modal";
</style>