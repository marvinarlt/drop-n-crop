<template>
    <div class="download-element">
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
            <template v-for="(image, imageIndex) in images" :key="imageIndex">
                <swiper-slide>
                    <download-item :src="getSrcFromBlob(image.blob)" :name="image.name" :width="image.width" :height="image.height" />
                </swiper-slide>
            </template>
        </swiper>
    </div>
</template>

<script>
import DownloadItem from './../../download/components/DownloadItem.vue';
import ArrowIcon from './../../global/assets/icons/arrow-east.svg';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

SwiperCore.use([Navigation]);

export default {
    name: 'DownloadElement',
    components: {
        DownloadItem,
        ArrowIcon,
        Swiper,
        SwiperSlide,
    },
    props: {
        images: Array,
    },
    data() {
        return {
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
    methods: {
        getSrcFromBlob(blob) {
            return URL.createObjectURL(blob);
        }
    }
}
</script>

<style lang="scss">
    @import "./../assets/scss/download-element";
</style>