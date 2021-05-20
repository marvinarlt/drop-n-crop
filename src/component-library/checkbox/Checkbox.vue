<template>
    <div class="checkbox">
        <input class="checkbox-input" type="checkbox" :id="id" :value="value" :checked="checked" @input="check">
        <label class="checkbox-label" :for="id">{{ label }}</label>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'Checkbox',
    props: {
        values: Array,
        value: String,
        label: String,
        id: String
    },
    setup(props, context) {
        const checked = computed(() => props.values.includes(props.value));

        function check() {
            let updatedValues = [...props.values];

            if (this.checked) {
                updatedValues.splice(updatedValues.indexOf(props.value), 1);
            } else {
                updatedValues.push(props.value);
            }

            context.emit('update:values', updatedValues);
        }

        return {
            check,
            checked
        }
    }
}
</script>

<style lang="scss">
    @import "./assets/scss/checkbox";
</style>