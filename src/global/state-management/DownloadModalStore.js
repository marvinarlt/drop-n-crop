import { reactive } from 'vue';

export default {
    state: reactive({
        isActive: false
    }),
    toggle() {
        this.state.isActive = ! this.state.isActive;
    },
    open() {
        this.state.isActive = true;
    },
    close() {
        this.state.isActive = false;
    }
}