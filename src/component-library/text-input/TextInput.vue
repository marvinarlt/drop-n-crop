<template>
    <div class="text-input-container">
        <label class="text-input-label" :for="id">{{ label }}</label>
        <input class="text-input-field"
            autocomplete="off"
            :type="type"
            :name="label"
            :id="id"
            :placeholder="placeholder"
            :value="value"
            :required="required"
            @change="updateInputValue">
    </div>
</template>

<script>
export default {
    name: 'TextInput',
    props: {
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        placeholder: String,
        value: [String, Number, Boolean],
        id: String,
        required: Boolean
    },
    methods: {
        updateInputValue(event) {
            this.$emit('update:value', event.target.value);
        }
    }
}
</script>

<style lang="scss">
    @import "./assets/scss/text-input";
</style>