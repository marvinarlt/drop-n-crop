<template>
    <div class="cropping-item">
        <div class="cropper-container">
            <img :src="preloadedFileSrc" :alt="breakpoint.name" ref="image" @load="initializeCropper">
        </div>
        <div class="cropping-label">
            <span class="cropping-name">{{ breakpoint.name }}</span>
            <span class="cropping-size">{{ breakpoint.width }} x {{ breakpoint.height }}</span>
        </div>
    </div>
</template>

<script>
import CroppingStore from './../../global/state-management/CroppingStore.js';
import SettingsStore from './../../global/state-management/SettingsStore.js';
import DownloadModalStore from './../../global/state-management/DownloadModalStore.js';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    name: 'CroppingItem',
    props: {
        breakpoint: Object,
        fileSrc: String,
        fileName: String,
        count: Number,
        index: Number
    },
    data() {
        return {
            settingsState: SettingsStore.state.settings,
            downloadModalState: DownloadModalStore.state,
            cropper: {},
            preloadedFileSrc: ''
        }
    },
    created() {
        this.preloadFileSrc();
    },
    computed: {
        image() {
            return this.$refs.image;
        },
        imageFileName() {
            let isAddDashOptionActive = this.settingsState.options.addDashAfterName.checked;

            if (! isAddDashOptionActive) {
                return this.breakpoint.name + ' ' + this.fileName;
            }

            return this.breakpoint.name + '-' + this.fileName;
        },
        modalIsActive() {
            return this.downloadModalState.isActive;
        }
    },
    watch: {
        modalIsActive(isActive) {
            if (! isActive) {
                return;
            }

            this.saveCroppedImageData();
        }
    },
    methods: {
        preloadFileSrc() {
            let image = new Image();

            image.src = this.fileSrc;
            image.onload = () => {
                this.image.src = image.src;
            }
        },
        initializeCropper() {
            this.cropper = new Cropper(this.image, {
                viewMode: 3,
                aspectRatio: this.breakpoint.width / this.breakpoint.height,
                dragMode: 'move',
                rotatable: false,
                zoomable: false,
                toggleDragModeOnDblclick: false,
                autoCropArea: 1,
            });
        },
        saveCroppedImageData() {
            let croppedCanvas = this.cropper.getCroppedCanvas({
                width: this.breakpoint.width,
                height: this.breakpoint.height,
            });

            CroppingStore.saveCroppedCanvas(croppedCanvas, this.count, {
                fileName: this.imageFileName,
                compress: this.settingsState.options.compressImages.checked
            });
        }
    }
}
</script>

<style lang="scss">
    @import './../assets/scss/cropping-item';
</style>