<template>
    <div class="download-item">
        <div class="download-image-container">
            <img :src="src" :alt="name">
        </div>
        <div class="download-label">
            <span class="download-name">{{ name }}</span>
            <span class="download-size">{{ width }} x {{ height }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DownloadItem',
    props: {
        src: String,
        name: String,
        width: Number,
        height: Number
    },
}
</script>

<style lang="scss">
    @import "./../assets/scss/download-item";
</style>