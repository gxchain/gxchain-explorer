<template>
    <section class="footer">
        <div class="footer-outer">
            <div class="footer-inner">
                <div class="text-center">
                    @2017 - {{present}} Powered by GXChain &nbsp;<a target='_blank' nofollow
                                                  href="https://github.com/gxchain/gxb-explorer"><span
                        class="fab fa-lg fa-github"></span></a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data () {
        return {
            present: (new Date()).getFullYear()
        };
    }
};
</script>
<style scoped>
    .footer {
        padding-top: 75px;
        height: 0;
        width: 0;
    }

    .footer-outer {
        text-align: center;
        position: absolute;
        z-index: auto;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .footer-inner {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 4px;
        padding: 8px;
        line-height: 36px;
        color: #ccc;
        border-top: 1px double #eee;
    }
</style>
