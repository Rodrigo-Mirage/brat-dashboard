<template>
  <div class="visits-page">
    {{ loadTest() }}
    <h1 class="page-title">Dashboard &nbsp;
      <small>
        <p v-if="this.permissions.includes('Admin')">Admin</p>
        <p v-else>User</p>
      </small>
    </h1>
    <b-row v-if="this.permissions.includes('Admin')">
      <b-col>
        <Widget
          title="<h5>Agenda <span class='fw-semi-bold'>do Evento</span></h5>"
          customHeader collapse
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Horário</th>
                  <th>Jogo</th>
                  <th>Estimativa</th>
                  <th>Categoria</th>
                  <th>Plataforma</th>
                  <th>Runner</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.schedule" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>{{formatHorary(row.event_date, row.duration, row.extra_time)}}</td>
                  <td>{{row.game}}</td>

                  <td>{{formatSeconds(row.duration)}}</td>

                  <td>{{row.category}}</td>
                  <td>{{row.platform}}</td>


                  <td v-if="row.stream_link"><a href="http://www.twitch.tv">{{row.runner}}</a></td>
                  <td v-else>{{row.runner}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>

    <b-row v-if="this.permissions.includes('Admin')">
      <b-col>
        <Widget
          title="<h5>Evento <span class='fw-semi-bold'>Ativo</span></h5>"
          customHeader collapse
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Nome</th>
                  <th>Link para doação</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.eventsList" :key="row.id">
                  <td v-if="row.active">{{row.id}}</td>
                  <td v-if="row.active">{{row.name}}</td>
                  <td v-if="row.active"><a href="`${row.donation_link}`">{{row.donation_link}}</a></td>
                  <td v-if="row.active">{{formatDate(row.date)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix">
            <div class="float-right">
              <router-link :to="`/app/events`"><b-button variant="dark">Gerenciar eventos</b-button></router-link>
              <b-button @click='test' variant="dark">teste</b-button>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <Widget
          title="<h5>Suas <span class='fw-semi-bold'>Runs</span></h5>"
          customHeader collapse
        >
          <div class="table-resposive">
            <table class="table" v-if="this.userRuns.length !== 0">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Jogo</th>
                  <th>Categoria</th>
                  <th>Plataforma</th>
                  <th>Turno</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.userRuns" :key="row.id">
                  <td>{{ row.event }}</td>
                  <td>{{ row.game }}</td>
                  <td>{{ row.category }}</td>
                  <td>{{ row.platform }}</td>
                  <td>{{ row.time_slot }}</td>
                  <td>
                    <b-badge v-if="getStatus(row.reviewed, row.approved, row.waiting) === 0" variant='gray'> Não Revisada </b-badge>
                    <b-badge v-if="getStatus(row.reviewed, row.approved, row.waiting) === 1" variant='success'> Aprovada </b-badge>
                    <b-badge v-if="getStatus(row.reviewed, row.approved, row.waiting) === 2" variant='primary'> Aprovada, na fila de espera </b-badge>
                    <b-badge v-if="getStatus(row.reviewed, row.approved, row.waiting) === 3" variant='danger'> Recusada </b-badge>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>
                <span>Você ainda não possui runs!</span>
            </div>
            <div class="clearfix">
              <div class="float-right">
                <router-link :to="`/app/submitrun`"><b-button variant="dark">Criar nova run</b-button></router-link>
              </div>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { mapState } from 'vuex';
const moment = require('moment');
let curTime = 0;
export default {
  name: 'Visits',
  data() {
    return{
    }
  },
  methods: {
    getStatus(reviewed, approved, waiting){
      // 0 = Não revisada
      // 1 = Aprovada
      // 2 = Aprovada, na fila de espera
      // 3 = Recusada
      let resp = 0;
      if(reviewed){
        if(approved){
          resp = 1
          if(waiting){
            resp = 2
          }
        }else{
          resp = 3
        }
      }
      else{
        resp = 0
      }
      return resp
    },
    formatDate(date){
      moment.locale(navigator.language)
      return moment(date, "YYYY-MM-DD").format('DD MMMM YYYY');
    },
    formatSeconds(seconds){
      return moment("2021-01-01").startOf('day').seconds(seconds).format('HH:mm:ss');
    },
    formatHorary(date, duration, extra){
      const resp = moment(date).valueOf() + curTime;
      curTime += duration*1000;
      if(extra){ curTime += extra*1000 }
      return moment.unix(resp).format('HH:mm:ss');
    },
    test(){
      this.$store.commit('layout/listSchedule', []);
    },
    loadTest(){
      curTime = 0;
      console.log('template carregou');
    }
  },
  computed: {
    ...mapState('layout', {
      permissions: state => state.permissions,
      curReq: state => state.curReq,
      id: state => state.id,
      userRuns: state => state.userRuns,
      eventsList: state => state.eventsList,
      schedule: state => state.schedule,
    }),
  },
  created(){
    let wsPayload = {"endpoint":"getUserRuns", "id":this.curReq, info:{"id": this.id}};
    this.$store.commit('layout/SOCKET_SEND', wsPayload);

    wsPayload = {"endpoint":"getEvents", "id":this.curReq};
    this.$store.commit('layout/SOCKET_SEND', wsPayload);

    wsPayload = {"endpoint":"getEventSchedule", "id":this.curReq};
    this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
  components:{
    Widget
  }
};
</script>

<style src="./Visits.scss" lang="scss" />
