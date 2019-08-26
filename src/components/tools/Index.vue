<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <hr>
                <div class="tools-list row">
                    <div class="col-md-3 col-xs-6" v-for="item in toolsList" :key="item.key">
                        <a class="item" @click="goDetails(item)">
                            <div class="logo">
                                <img :src="item.logo" :alt="item.name">
                            </div>
                            <div class="info">
                                <h6 class="name">{{item.name}}</h6>
                                <div class="intro">{{item.des}}</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data () {
        return {
            toolsList: [
                {
                    name: this.$t('tools.bulk_transfer.title'),
                    key: 'bulk-transfer',
                    des: this.$t('tools.bulk_transfer.des'),
                    logo: require('@/assets/img/tools/transfer.png')
                }
                // {
                //     name: '交易序列化',
                //     des: 'Support bulk transfer',
                //     logo: ''
                // },
                // {
                //     name: '合约参数序列化',
                //     des: '',
                //     logo: ''
                // },
                // {
                //     name: '交易签名',
                //     des: '',
                //     logo: ''
                // },
                // {
                //     name: '哈希',
                //     des: '',
                //     logo: ''
                // }
            ]
        };
    },
    methods: {
        goDetails (item) {
            this.$router.push({ path: `/tools/${item.key}` });
        }
    }
};
</script>

<style scoped lang="less">
.tools-list {
  .item {
    display: flex;
    align-self: center;
    text-decoration: none;
    padding: 32px 16px;
    background: #f2f2f2;
    margin-bottom: 20px;
    border-radius: 6px;
    transition-duration: 0.3s;
    cursor: pointer;
    .logo {
      margin: 0 6px;
      img {
        min-width: 32px;
        width: 32px;
        height: 32px;
      }
    }
    .info {
      overflow: hidden;
      .name {
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #4c5a6e;
        font-size: 14px;
        margin: 0;
      }
      .intro {
        display: block;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #8f96a0;
        font-size: 12px;
        margin-top: 5px;
      }
    }
    &:hover {
      -webkit-box-shadow: 0 0 15px #ccc;
      box-shadow: 0 0 15px #ccc;
    }
  }
}
</style>
