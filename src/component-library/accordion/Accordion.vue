<template>
    <div class="accordion" :class="isActive ? 'opened' : 'closed'">
        <span class="accordion-title" @click="toggleAccordion">
            {{ title }}
            <span class="icon">
                <expand-icon />
            </span>
        </span>
        <div class="accordion-content" ref="content">
            <slot />
        </div>
    </div>
</template>

<script>
import ExpandIcon from './../../global/assets/icons/expand-more.svg';

export default {
    name: 'Accordion',
    components: {
        ExpandIcon
    },
    props: {
        title: String
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        content() {
            return this.$refs.content;
        },
        mutationObserver() {
            return new MutationObserver(() => {
                if (! this.isActive) {
                    return;
                }

                let firstChild = this.content.firstElementChild;
                let heightElement = firstChild != null ? firstChild : this.content;

                this.content.style.height = `${ heightElement.scrollHeight }px`;
            });
        }
    },
    mounted() {
        this.mutationObserver.observe(this.content, {
            attributes: true,
            childList: true,
            subtree: true
        });
    },
    methods: {
        toggleAccordion() {
            this.isActive ? this.close() : this.open();
        },
        open(element) {
            this.isActive = true;
            this.content.style.height = `${ this.content.scrollHeight }px`;
        },
        close(element) {
            this.isActive = false;
            this.content.style.height = null;
        }
    }
}
</script>

<style lang="scss">
    @import "./assets/scss/accordion";
</style>