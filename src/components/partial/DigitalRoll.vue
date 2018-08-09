<template>
    <div class="roll-container" :style="{height:`${fontSize+10}px`,fontSize:`${fontSize}px`}">
        <div class="roll-num" :style="{lineHeight:`${fontSize + 10}px`}" v-for="(n,i) in digits" :key="i">
            <div class="roll-num-inner" :style="getliStyle(n)">
                <div>0</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { supportCssCache } from '../../common/util';

    export default {
        props: {
            number: {
                type: [Number, String],
                defaults: 0
            },
            fontSize: {
                type: Number,
                default: 40
            }
        },
        computed: {
            digits () {
                return (this.number + '').split('');
            }
        },
        data () {
            return {
                rollHeight: 0,
                width: 0
            };
        },
        methods: {
            getliStyle (item) {
                const supportTransform = supportCssCache('transform');
                const offset = item ? `${-item * (this.fontSize + 10)}px` : '0px';
                if (supportTransform) {
                    const value = `translateY(${offset})`;
                    return {
                        transform: value,
                        webkitTransform: value,
                        mozTransform: value,
                        oTransform: value
                    };
                }
                return {
                    marginTop: offset
                };
            }
        }
    };
</script>

<style>
    @font-face {
        font-family: 'bebas';
        src: url('../../../static/fonts/bebas/BEBAS.eot');
        src: url('../../../static/fonts/bebas/BEBAS.eot#iefix') format('embedded-opentype'),
        url('../../../static/fonts/bebas/BEBAS.ttf') format('truetype'),
        url('../../../static/fonts/bebas/BEBAS.woff') format('woff'),
        url('../../../static/fonts/bebas/BEBAS.svg#Bebas') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    .roll-container {
        overflow: hidden;
        font-family: bebas;
    }

    .roll-container .roll-num {
        display: inline-block;
        height: 100%;
        margin-left: 3px;
        padding: 0 10px;
        color: #fff;
        text-align: center;
        position: relative;
        background-image: url("../../../static/num-bg.png");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .roll-container .roll-num .roll-num-inner {
        height: 100%;
        transition-duration: 1s;
    }

    .roll-container .roll-num > div {
        width: 100%;
    }
</style>
