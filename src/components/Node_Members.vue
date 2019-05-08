<template>
  <div class="container">
    <div class="row">
        <!--Committee-->
        <div class="col-md-4">
          <div v-if="global_params" class="panel panel-default">
            <div class="panel-heading">
              <span class="fa fa-fw gxicon gxicon-commitee"></span>&nbsp;{{$t('index.committee.title')}}
            </div>
            <div class="panel-body no-padding">
              <table class="table table-striped no-margin">
                <thead>
                  <tr>
                    <th>{{$t('index.committee.account')}}</th>
                    <th class="text-right">{{$t('index.committee.votes')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in global_params.active_committee_members" :key="member">
                    <td>
                      <account-image :size="8" :account="getCommitteeAccountName(member)"></account-image>
                      &nbsp;
                      <router-link :to="{path:'/account/'+getCommitteeAccountName(member)}">
                        {{getCommitteeAccountName(member)}}
                      </router-link>
                    </td>
                    <td class="text-right">
                      {{ChainStore.getObject(member) && ChainStore.getObject(member).get('total_votes') /
                      100000 | number(0)}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--Witnesses-->
          <div v-if="global_params" class="panel panel-default panel-witness">
            <div class="panel-heading">
              <span class="fa fa-fw gxicon gxicon-witness"></span>&nbsp;{{$t('index.witness.title')}}
            </div>
            <div class="panel-body no-padding">
              <div class="table-responsive">
                <table class="table table-striped no-margin">
                  <thead>
                    <tr>
                      <th>{{$t('index.witness.witness')}}</th>
                      <th>{{$t('index.witness.last_confirmed_block')}}</th>
                      <th class="text-right">{{$t('index.witness.votes')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="witness in global_params.active_witnesses" :key="witness" :class="{info:getLastConfirmedBlock(witness)==block_info.head_block_number}">
                      <td>
                        <account-image :size="8" :account="getWitnessAccountName(witness)"></account-image>
                        &nbsp;
                        <router-link :to="{path:'/account/'+getWitnessAccountName(witness)}">
                          {{getWitnessAccountName(witness)}}
                        </router-link>
                      </td>
                      <td>
                        <router-link :to="{path:'/block/'+getLastConfirmedBlock(witness)}">
                          {{getLastConfirmedBlock(witness)}}
                        </router-link>
                      </td>
                      <td class="text-right">
                        {{ChainStore.getObject(witness) &&
                        ChainStore.getObject(witness).get('total_votes') / 100000 | number(0)}}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <!--Candidates-->
          <div v-if="global_params" class="panel panel-default panel-trust-nodes">
              <div class="panel-heading">
                  <span class="fa fa-fw fa-users"></span>&nbsp;{{$t('index.candidate.title')}}
              </div>
              <div class="panel-body no-padding">
                  <div class="table-responsive">
                      <table class="table table-striped no-margin">
                          <thead>
                            <tr>
                                <th>{{$t('index.candidate.account')}}</th>
                                <th class="text-right">{{$t('index.candidate.margin')}}</th>
                                <th class="text-right">{{$t('index.witness.votes')}}</th>
                                <th>{{$t('index.candidate.account')}}</th>
                                <th class="text-right">{{$t('index.candidate.margin')}}</th>
                                <th class="text-right">{{$t('index.witness.votes')}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(c, index) in candidates.first" :key="c.account">
                                <td>
                                    <div>
                                        <img v-if="c.extra&&c.extra.logo" :src="c.extra.logo" width="16px"/>
                                        <account-image v-if="!(c.extra&&c.extra.logo)" :size="8"
                                                        :account="c.account"></account-image>
                                        &nbsp;
                                        <router-link :to="{path:'/account/'+c.account}">
                                            {{c.account}}
                                        </router-link>
                                    </div>

                                    <div>
                                        <small class="tip">{{c.extra?c.extra.nodeName:''}}</small>
                                    </div>
                                </td>
                                <td class="text-right">{{c.margin/100000|number(0)}}</td>
                                <td class="text-right">{{c.votes/100000|number(0)}}</td>
                                <td>
                                    <div v-if="candidates.second[index]">
                                        <img v-if="candidates.second[index].extra&&c.extra.logo" :src="candidates.second[index].extra.logo" width="16px"/>
                                        <account-image v-if="!(candidates.second[index].extra&&candidates.second[index].extra.logo)" :size="8"
                                                        :account="candidates.second[index].account"></account-image>
                                        &nbsp;
                                        <router-link :to="{path:'/account/'+candidates.second[index].account}">
                                            {{candidates.second[index].account}}
                                        </router-link>
                                    </div>

                                    <div  v-if="candidates.second[index]">
                                        <small class="tip">{{candidates.second[index].extra?candidates.second[index].extra.nodeName:''}}</small>
                                    </div>
                                </td>
                                <td class="text-right">{{candidates.second[index] && candidates.second[index].margin/100000|number(0)}}</td>
                                <td class="text-right">{{candidates.second[index] && candidates.second[index].votes/100000|number(0)}}</td>
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
      data () {
          return {
              block_info: null,
              global_params: null,
              candidates: {},
              ChainStore
          };
      },
      mounted () {
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
          loadTrustNodeCandidates () {
              this.$http
              .get('/api/trustnode/candidates').then(resp => {
                  this.candidates = {
                      first: resp.data.splice(0, Math.ceil(resp.data.length / 2)),
                      second: resp.data
                  };
              });
          },
          getCommitteeAccountName (member) {
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
          getWitnessAccountName (witness) {
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
          getLastConfirmedBlock (witness) {
              return (
                  ChainStore.getObject(witness) &&
                  ChainStore.getObject(witness).get('last_confirmed_block_num')
              );
          },
          onUpdate () {
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
  .panel-witness .table-responsive, .panel-trust-nodes .table-responsive {
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
</style>
