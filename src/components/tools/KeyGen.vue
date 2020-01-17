<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <bread-box :breadList="breadList"></bread-box>
        <hr />
        <a class="btn btn-primary" @click="generate">{{
          $t('tools.key_gen.gen')
        }}</a>
        <a class="btn btn-primary" @click="save">{{
          $t('tools.key_gen.save')
        }}</a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <br />
        <pre>{{ JSON.stringify(keypair, null, '  ') }}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import BreadBox from './components/BreadBox';
import { mapGetters } from 'vuex';
export default {
  components: {
    BreadBox
  },
  data() {
    return {
      loading: true,
      keypair: {},
      breadList: [
        {
          key: 'tools.title',
          path: '/tools/index'
        },
        {
          key: 'tools.key_gen.title',
          path: '/tools/key-gen'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      gxc: 'gxc',
      account: 'account'
    }),
    processingNum: function() {
      return this.running
        ? this.recordNum - this.executeNum.success - this.executeNum.fail
        : 0;
    }
  },
  methods: {
    generate() {
      this.gxc.generateKey().then(resp => {
        this.keypair = resp;
      });
    },
    save() {
      let eleLink = document.createElement('a');
      eleLink.download = `gxchain-keypair-${new Date().getTime()}.json`;
      eleLink.style.display = 'none';
      // The character content is converted to a blob address.
      let blob = new Blob([JSON.stringify(this.keypair, null, '  ')]);
      eleLink.href = URL.createObjectURL(blob);
      // trigger click
      document.body.appendChild(eleLink);
      eleLink.click();
      // remove
      document.body.removeChild(eleLink);
    }
  }
};
</script>
<style scoped lang="less"></style>
