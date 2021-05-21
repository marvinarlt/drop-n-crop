import { reactive } from 'vue';

export default {
    state: reactive({
        uploadedFiles: [],
        croppedImages: []
    }),
    addUploadedFiles(uploadedFiles) {
        this.state.uploadedFiles.push(...uploadedFiles);
    },
    addCroppedImage(key, croppedImage) {
        if (this.state.croppedImages[key] == undefined) {
            this.state.croppedImages[key] = [];
        }

        this.state.croppedImages[key].push(croppedImage);
    },
    resetCroppedImages() {
        this.state.croppedImages = [];
    },
    saveCroppedCanvas(canvas, count, options = {}) {
        let compressionRate = 1;
        let fileName = 'unknown';

        if (options.compress) {
            compressionRate = 0.85;
        }

        if (options.fileName) {
            fileName = options.fileName;
        }

        canvas.toBlob(blob => {
            this.addCroppedImage(count, {
                name: fileName,
                width: canvas.width,
                height: canvas.height,
                blob: blob
            });
        }, 'image/jpeg', compressionRate);
    }
}