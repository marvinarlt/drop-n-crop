<template>
    <div class="image-sizes">
        <div class="image-size-item" v-for="(breakpoint, breakpointIndex) in settingsState.breakpoints" :key="breakpointIndex">
            <checkbox
                :value="breakpoint.name"
                :label="breakpoint.name"
                :id="breakpoint.name"
                :checked="breakpoint.active"
                v-model:values="checkedBreakpoints" />
            <div class="size-input-container">
                <label class="size-input-label" :for="breakpoint.name + '-height'">{{ breakpoint.width }} x</label>
                <input class="size-input-field"
                    type="number"
                    placeholder="640"
                    :name="breakpoint.name"
                    :id="breakpoint.name + '-height'"
                    :value="breakpoint.height"
                    required
                    @change="updateBreakpointHeight(breakpointIndex, $event)">
            </div>
        </div>
    </div>
</template>

<script>
import SettingsStore from './../../global/state-management/SettingsStore.js';
import Checkbox from './../../component-library/checkbox/Checkbox.vue';
import TextInput from './../../component-library/text-input/TextInput.vue';

export default {
    name: 'ImageSizes',
    components: {
        Checkbox,
        TextInput
    },
    data() {
        return {
            settingsState: SettingsStore.state.settings,
            checkedBreakpoints: [],
            inputValues: []
        }
    },
    created() {
        this.setCheckedBreakpoints();
    },
    watch: {
        checkedBreakpoints(breakpointNames) {
            this.updateBreakpointActiveState(breakpointNames);
        },
        inputValues(breakpointHeights) {
            this.updateBreakpointHeight(breakpointHeights);
        }
    },
    methods: {
        setCheckedBreakpoints() {
            let breakpoints = this.settingsState.breakpoints;
            let filteredBreakpoints = breakpoints.filter(breakpoint => breakpoint.active);

            for (let breakpoint of filteredBreakpoints) {
                this.checkedBreakpoints.push(breakpoint.name);
            }
        },
        updateBreakpointActiveState(breakpointNames) {
            for (let breakpoint of this.settingsState.breakpoints) {
                if (! breakpointNames.includes(breakpoint.name)) {
                    breakpoint.active = false;
                    continue;
                }

                breakpoint.active = true;
            }

            SettingsStore.update(this.settingsState);
            SettingsStore.save();
        },
        updateBreakpointHeight(index, event) {
            let newBreakpointHeight = parseInt(event.target.value);

            if (typeof newBreakpointHeight == NaN) {
                return;
            }

            this.settingsState.breakpoints[index].height = newBreakpointHeight;

            SettingsStore.update(this.settingsState);
            SettingsStore.save();
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/image-sizes";
</style>