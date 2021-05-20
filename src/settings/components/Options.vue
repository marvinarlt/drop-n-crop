<template>
    <div class="options">
        <checkbox v-for="(option, optionIndex) in settingsState.options" :key="optionIndex"
            :value="optionIndex"
            :label="option.label"
            :id="slugifyString(option.label)"
            v-model:values="checkedOptions" />
    </div>
</template>

<script>
import SettingsStore from './../../global/state-management/SettingsStore.js';
import Checkbox from './../../component-library/checkbox/Checkbox.vue';
import slugify from 'slugify';

export default {
    name: 'Options',
    components: {
        Checkbox
    },
    data() {
        return {
            settingsState: SettingsStore.state.settings,
            checkedOptions: []
        }
    },
    mounted() {
        this.addCheckedOptions();
    },
    watch: {
        checkedOptions(indices) {
            let options = this.settingsState.options;

            for (let optionIndex in options) {
                let option = options[optionIndex];

                if (! indices.includes(optionIndex)) {
                    option.checked = false;
                    continue;
                }

                option.checked = true;
            }

            SettingsStore.update(this.settingsState);
            SettingsStore.save();
        }
    },
    methods: {
        addCheckedOptions() {
            let options = this.settingsState.options;

            for (let optionIndex in options) {
                let option = options[optionIndex];

                if (option.checked) {
                    this.checkedOptions.push(optionIndex);
                }
            }
        },
        slugifyString(string) {
            return slugify(string, {
                replacement: '-',
                lower: true
            });
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/options";
</style>