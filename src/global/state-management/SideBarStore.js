import { reactive } from 'vue';

export default {
    state: reactive({
        isActive: false
    }),

    activate() {
        this.state.isActive = true;
    },

    deactivate() {
        this.state.isActive = false;
    },

    toggle() {
        this.state.isActive = ! this.state.isActive;
    }
}