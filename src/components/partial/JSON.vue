<template>
    <pre><code v-html="content"></code></pre>
</template>
<script>
    import prismjs from 'prismjs';
    import 'prismjs/themes/prism.css';

    export default {
        name: 'json',
        props: {
            json: {}
        },
        computed: {
            content () {
                return prismjs.highlight(JSON.stringify(this.json, null, '  '), prismjs.languages.js);
            }
        }
    };
</script>
