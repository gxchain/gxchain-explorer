<template>
    <div v-if="breadList.length>0">
        <ol class="breadcrumb">
            <li v-for="(item,index) in breadList" :key="index">
                <router-link :to="{path : item.path}">
                    {{$t(item.key)}}
                </router-link>
            </li>
         </ol>
    </div>
</template>
<script>
export default {
    props: {
        breadList: {
            Array,
            default: []
        }
    }
};
</script>
<style lang="less" scoped>
a {
  color: #337ab7;
}
</style>


