<template>
    <div class="load-box">
        <div class="loading">
            <img src="/static/logo.png"/>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {};
        }
    };
</script>

<style scoped>
    .load-box {
        min-height: 250px;
        position: relative;
    }

    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -12.5px;
        margin-left: -12.5px;
        width: 25px;
        height: 25px;
        z-index: 999;
    }

    .loading img {
        width: 100%;
        height: 100%;
        -webkit-transform: rotate(360deg);
        animation: rotation 1s linear infinite;
        -moz-animation: rotation 1s linear infinite;
        -webkit-animation: rotation 1s linear infinite;
        -o-animation: rotation 1s linear infinite;
    }

    @-webkit-keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }
</style>
