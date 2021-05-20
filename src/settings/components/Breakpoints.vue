<template>
    <div class="breakpoints">
        <form class="breakpoints-form" @submit.prevent="addBreakpoint">
            <text-input type="text" label="Name" placeholder="large" id="name" required v-model:value="nameValue" />
            <text-input type="number" label="Width in px" placeholder="992" id="width-in-px" required v-model:value="widthValue" />
            <custom-button type="submit" label="Add Breakpoint" class="full-width" />
        </form>
        <table>
            <tr>
                <th>Name</th>
                <th>Width (px)</th>
            </tr>
            <tr v-for="(breakpoint, breakpointIndex) in settingsState.breakpoints" :key="breakpointIndex">
                <td>{{ breakpoint.name }}</td>
                <td>
                    {{ breakpoint.width }}
                    <span class="delete" @click="deleteBreakpoint(breakpointIndex)">
                        <delete-icon />
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import TextInput from './../../component-library/text-input/TextInput.vue';
import CustomButton from './../../component-library/custom-button/CustomButton.vue';
import SettingsStore from './../../global/state-management/SettingsStore.js';
import DeleteIcon from './../../global/assets/icons/delete.svg';

export default {
    name: 'Breakpoints',
    components: {
        TextInput,
        CustomButton,
        DeleteIcon
    },
    data() {
        return {
            settingsState: SettingsStore.state.settings,
            nameValue: '',
            widthValue: ''
        }
    },
    methods: {
        addBreakpoint() {
            if (this.nameValue == ''
                || this.widthValue == ''
                || this.isDuplicate(this.nameValue)) {
                return;
            }

            let newBreakpoint = this.createBreakpoint(this.nameValue, this.widthValue);

            this.settingsState.breakpoints.push(newBreakpoint);

            this.updateSettings();
            this.clearInputs();
        },
        isDuplicate(name) {
            for (let breakpoint of this.settingsState.breakpoints) {
                if (breakpoint.name == name) {
                    return true;
                }
            }

            return false;
        },
        createBreakpoint(name, width) {
            return {
                name: name,
                width: parseInt(width),
                height: 640,
                active: true,
            }
        },
        clearInputs() {
            this.nameValue = '';
            this.widthValue = '';
        },
        deleteBreakpoint(index) {
            this.settingsState.breakpoints.splice(index, 1);
            this.updateSettings();
        },
        updateSettings() {
            SettingsStore.update(this.settingsState);
            SettingsStore.save();
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/breakpoints";
</style>