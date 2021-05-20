<template>
    <div class="cropping-element" >
        <span class="element-count">{{ displayCount }}</span>
        <div class="cropping-input">
            <text-input
                label="Name"
                type="text"
                placeholder="my-beautiful-image"
                :id="slugifiedFileName"
                required
                v-model:value="fileName" />
        </div>
        <swiper
            :slides-per-view="1"
            :space-between="32"
            :breakpoints="swiperBreakpoints"
            :allow-touch-move="false"
            :navigation="swiperNavigation">
            <div class="swiper-controls">
                <div class="navigation-prev">
                    <arrow-icon />
                </div>
                <div class="navigation-next">
                    <arrow-icon />
                </div>
            </div>
            <template v-for="(breakpoint, breakpointIndex) in settingsState.breakpoints" :key="breakpointIndex">
                <swiper-slide v-if="breakpoint.active">
                    <cropping-item :breakpoint="breakpoint" :fileSrc="fileSrc" :fileName="fileName" :count="count" :index="breakpointIndex" />
                </swiper-slide>
            </template>
        </swiper>
    </div>
</template>

<script>
import SettingsStore from './../../global/state-management/SettingsStore';
import TextInput from './../../component-library/text-input/TextInput.vue';
import CroppingItem from './CroppingItem.vue';
import ArrowIcon from './../../global/assets/icons/arrow-east.svg';
import slugify from 'slugify';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

SwiperCore.use([Navigation]);

export default {
    name: 'CroppingElement',
    components: {
        TextInput,
        CroppingItem,
        ArrowIcon,
        Swiper,
        SwiperSlide
    },
    props: {
        file: File,
    },
    data() {
        return {
            settingsState: SettingsStore.state.settings,
            fileName: '',
            swiperBreakpoints: {
                640: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3
                }
            },
            swiperNavigation: {
                prevEl: '.navigation-prev',
                nextEl: '.navigation-next'
            }
        }
    },
    mounted() {
        this.fileName = this.getInitialProcessedFileName();
    },
    computed: {
        fileSrc() {
            return URL.createObjectURL(this.file);
        },
        slugifiedFileName() {
            return this.slugifyFileName(this.fileName);
        },
        slugifyFileNamesOption() {
            return this.settingsState.options.slugifyFileNames.checked;
        },
        count() {
            return this.$.vnode.key;
        },
        displayCount() {
            let actualCount = this.count + 1;

            if (actualCount < 10) {
                return `0${ actualCount }`;
            }

            return actualCount;
        }
    },
    watch: {
        fileName(newValue) {
            this.fileName = this.processFileName(newValue);
        },
        slugifyFileNamesOption() {
            this.fileName = this.processFileName(this.fileName);
        }
    },
    methods: {
        getInitialProcessedFileName() {
            let fileNameWithoutExtension = this.file.name.split('.').slice(0, -1).join('.');
            let fileName = this.processFileName(fileNameWithoutExtension);
            
            return fileName;
        },
        processFileName(string) {
            let options = this.settingsState.options;

            if (! options.slugifyFileNames.checked) {
                return string;
            }

            return this.slugifyFileName(string);
        },
        slugifyFileName(string) {
            return slugify(string, {
                replacement: '-',
                lower: true
            });
        },
        toBase64(file) {
            let fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => this.fileSrc = fileReader.result;
            fileReader.onerror = error => console.error(error);
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/cropping-element";
</style>