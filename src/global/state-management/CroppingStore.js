import { reactive } from 'vue';

export default {
    state: reactive({
        uploadedFiles: [],
        croppedImages: []
    }),
    addUploadedFiles(uploadedFiles) {
        this.state.uploadedFiles.push(...uploadedFiles);
    },
    addCroppedImages(croppedImages) {
        this.state.croppedImages.push(...croppedImages);
    },
    addCroppedImage(key, croppedImage) {
        if (this.state.croppedImages[key] == undefined) {
            this.state.croppedImages[key] = [];
        }

        this.state.croppedImages[key].push(croppedImage);
    },
    resetCroppedImages() {
        this.state.croppedImages = [];
    }
}