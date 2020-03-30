<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-right">
        <label>{{$t('index.witness.switch_label')}}&nbsp;<input type="checkbox" v-model="show_original_votes" /></label>
      </div>
      <hr/>
    </div>
    <div class="row">
      <div class="col-md-5">
        <!--Committee-->
        <div v-if="global_params" class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-fw gxicon gxicon-commitee"></span>&nbsp;{{
              $t('index.committee.title')
            }}
          </div>
          <div class="panel-body no-padding">
            <table class="table table-striped no-margin">
              <thead>
                <tr>
                  <th width='15'>No.</th>
                  <th>{{ $t('index.committee.account') }}</th>
                  <th class="text-right">{{ $t('index.committee.votes')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(member,i) in global_params.active_committee_members"
                  :key="member"
                > 
                  <td>{{i+1}}</td>
                  <td>
                    <account-image
                      :size="8"
                      :account="getCommitteeAccountName(member)"
                      :type="1"
                    ></account-image>
                    &nbsp;
                    <router-link
                      :to="{
                        path: '/account/' + getCommitteeAccountName(member)
                      }"
                    >
                      {{ getCommitteeAccountName(member) }}
                    </router-link>
                  </td>
                  <td class="text-right">
                    <div>{{
                      ChainStore.getObject(member) &&
                        (ChainStore.getObject(member).get('total_votes') /
                          100000)
                          | number(0)
                    }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--Witnesses-->
        <div v-if="global_params" class="panel panel-default panel-witness">
          <div class="panel-heading">
            <span class="fa fa-fw gxicon gxicon-witness"></span>&nbsp;{{
              $t('index.witness.title')
            }}
          </div>
          <div class="panel-body no-padding">
            <div class="table-responsive">
              <table class="table table-striped no-margin">
                <thead>
                  <tr>
                    <th width='15'>No.</th>
                    <th>{{ $t('index.witness.witness') }}</th>
                    <th>{{ $t('index.witness.last_confirmed_block') }}</th>
                    <th class="text-right">{{ (show_original_votes?$t('index.witness.votes')+'/':'')+$t('index.witness.new_votes') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(witness,i) in global_params.active_witnesses"
                    :key="witness"
                    :class="{
                      info:
                        getLastConfirmedBlock(witness) ==
                        block_info.head_block_number
                    }"
                  >
                    <td>{{i+1}}</td>
                    <td>
                      <account-image
                        :size="8"
                        :account="getWitnessAccountName(witness)"
                        :type="1"
                      ></account-image>
                      &nbsp;
                      <router-link
                        :to="{
                          path: '/account/' + getWitnessAccountName(witness)
                        }"
                      >
                        {{ getWitnessAccountName(witness) }}
                      </router-link>
                    </td>
                    <td>
                      <router-link
                        :to="{
                          path: '/block/' + getLastConfirmedBlock(witness)
                        }"
                      >
                        {{ getLastConfirmedBlock(witness) }}
                      </router-link>
                    </td>
                    <td class="text-right">
                      <div class='gray' v-if="show_original_votes">{{
                        ChainStore.getObject(witness) &&
                          (ChainStore.getObject(witness).get('total_votes') /
                            100000)
                            | number(0)
                      }}
                      </div>
                      <div>{{
                        ChainStore.getObject(witness) &&
                          (ChainStore.getObject(witness).get('total_vote_weights') /
                            100000)
                            | number(0)
                      }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <!--Candidates-->
        <div v-if="global_params" class="panel panel-default panel-trust-nodes">
          <div class="panel-heading">
            <span class="fa fa-fw fa-users"></span>&nbsp;{{
              $t('index.candidate.title')
            }}
          </div>
          <div class="panel-body no-padding">
            <div class="table-responsive">
              <table class="table table-striped no-margin">
                <thead>
                  <tr>
                    <th width='20%'>{{ $t('index.candidate.account') }}</th>
                    <th>URL</th>
                    <th class="text-right">
                      {{ $t('index.candidate.margin') }}
                    </th>
                    <th class="text-right">{{ $t('index.witness.rate') }}</th>
                    <th class="text-right">{{ (show_original_votes?$t('index.candidate.votes')+'/':'')+$t('index.candidate.new_votes') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(c) in candidates" :key="c.account">
                    <td>
                      <div>
                        <img
                          v-if="c.extra && c.extra.logo"
                          :src="c.extra.logo"
                          width="16px"
                        />
                        <account-image
                          v-if="!(c.extra && c.extra.logo)"
                          :size="8"
                          :account="c.account"
                          :type="1"
                        ></account-image>
                        &nbsp;
                        <router-link :to="{ path: '/account/' + c.account }">
                          {{ c.account }}
                        </router-link>
                      </div>

                      <div>
                        <small class="tip">{{
                          c.extra ? c.extra.nodeName : ''
                        }}</small>
                      </div>
                    </td>
                    <td><a target="_blank" :href="c.witness_info.url" v-if="c.witness_info.url">{{c.witness_info.url}}</a></td>
                    <td class="text-right">
                      {{ (c.margin / 100000) | number(0) }}
                    </td>
                    <td class="text-right">
                      {{ (c.witness_info.commission_rate)/10 | number(1) }}%
                    </td>
                    <td class="text-right">
                      <div class='gray' v-if="show_original_votes">{{ (c.votes / 100000) | number(0) }}</div>
                      <div>{{ (c.witness_info.total_vote_weights / 100000) | number(0) }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre>
                      <div>{{$t('index.candidate.pre')}}:</div>
                      <div>github.com/gxchain/TrustNodes</div>
                  </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ChainStore } from 'gxbjs';
import { Apis } from 'gxbjs-ws';
import filters from '../filters';
import AccountImage from './partial/AccountImage';
export default {
  data() {
    return {
      show_original_votes: true,
      block_info: null,
      global_params: null,
      candidates: {},
      ChainStore
    };
  },
  mounted() {
    ChainStore.subscribe(this.onUpdate);
    Apis.instance()
      .db_api()
      .exec('get_objects', [['2.0.0', '2.1.0', '2.3.1']])
      .then(() => {
        this.onUpdate();
      });
    this.loadTrustNodeCandidates();
  },
  methods: {
    loadTrustNodeCandidates() {
      this.$http.get('/api/trustnode/candidates').then(resp => {
        this.candidates = resp.data;
      });
    },
    getCommitteeAccountName(member) {
      if (
        ChainStore.getObject(member) &&
        ChainStore.getObject(
          ChainStore.getObject(member).get('committee_member_account')
        )
      ) {
        return ChainStore.getObject(
          ChainStore.getObject(member).get('committee_member_account')
        ).get('name');
      }
      return null;
    },
    getWitnessAccountName(witness) {
      if (
        ChainStore.getObject(witness) &&
        ChainStore.getObject(
          ChainStore.getObject(witness).get('witness_account')
        )
      ) {
        return ChainStore.getObject(
          ChainStore.getObject(witness).get('witness_account')
        ).get('name');
      }
      return null;
    },
    getLastConfirmedBlock(witness) {
      return (
        ChainStore.getObject(witness) &&
        ChainStore.getObject(witness).get('last_confirmed_block_num')
      );
    },
    onUpdate() {
      if (this.timer === 0) {
        this.runTimer();
      }
      this.last_updated_at = new Date();
      if (
        !ChainStore.getObject('2.0.0') ||
        !ChainStore.getObject('2.1.0') ||
        !ChainStore.getObject('2.3.1')
      ) {
        return;
      }

      this.global_params = ChainStore.getObject('2.0.0').toJS();
      this.block_info = ChainStore.getObject('2.1.0').toJS();
    }
  },
  filters,
  components: {
    AccountImage
  }
};
</script>
<style scoped>
.panel-witness .table-responsive,
.panel-trust-nodes .table-responsive {
  margin-bottom: 0;
  border: none;
}

.panel-trust-nodes .tip {
  color: #666;
}

.panel-trust-nodes pre {
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 10px;
  font-size: 8px;
  line-height: 8px;
  color: #666;
}

.panel-trust-nodes thead tr th:nth-of-type(3),
.panel-trust-nodes tbody tr td:nth-of-type(3) {
  padding-right: 20px;
}

.panel-trust-nodes thead tr th:nth-of-type(4),
.panel-trust-nodes tbody tr td:nth-of-type(4) {
  padding-left: 20px;
}
.gray{
  color:#999
}
</style>
