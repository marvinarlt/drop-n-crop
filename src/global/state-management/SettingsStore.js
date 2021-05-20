import { reactive } from 'vue';
import defaultSettings from './../default-settings.js';

export default {
    storageName: 'drop-n-crop',
    state: reactive({
        settings: defaultSettings
    }),
    loadFromLocalStorage() {
        let settings = localStorage.getItem(this.storageName);

        if (settings == null) {
            this.save();
            return;
        }

        try {
            settings = JSON.parse(settings);
            this.update(settings);
        } catch (error) {
            console.error(error);
        }

        this.save();
    },
    update(settings) {
        this.state.settings = settings;
    },
    save() {
        localStorage.setItem(this.storageName, JSON.stringify(this.state.settings));
    }
}