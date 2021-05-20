<template>
    <input type="file" name="File upload" class="hidden" ref="fileUpload" multiple @change="uploadFilesFromInput">
    <div class="drop-area"
        :class="isDraggingOver ? 'dragging-over' : ''"
        @drop.prevent="uploadDroppedFiles"
        @dragover.prevent
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @click="openFileUploadWindow">
        <span class="drop-area-label">
            <file-upload-icon />
            Drag'n Drop images here
        </span>
    </div>
</template>

<script>
import CroppingStore from './../../global/state-management/CroppingStore.js';
import FileUploadIcon from './../../global/assets/icons/file-upload.svg';

export default {
    name: 'DropArea',
    components: {
        FileUploadIcon
    },
    data() {
        return {
            isDraggingOver: false
        }
    },
    methods: {
        uploadFiles(files) {
            if (! files) {
                return;
            }

            CroppingStore.addUploadedFiles(files);
        },
        uploadDroppedFiles(event) {
            this.uploadFiles(event.dataTransfer.files);
            this.isDraggingOver = false;
        },
        uploadFilesFromInput(event) {
            this.uploadFiles(event.target.files);
        },
        onDragEnter(event) {
            this.isDraggingOver = true;
        },
        onDragLeave(event) {
            this.isDraggingOver = false;
        },
        openFileUploadWindow() {
            this.$refs.fileUpload.click();
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/drop-area";
</style>