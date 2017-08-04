<template>
  <div v-html="content">

  </div>
</template>

<script>

  import {ChainTypes} from 'gxbjs/es'
  import locale from '@/locales/locale-cn.json'
  let ops = Object.keys(ChainTypes.operations);

  export default {
    props: {
      id: {
        type: Number
      },
      operation: {
        type: Object
      }
    },
    computed:{
      content:function () {

      }
    }
  }
</script>
