<template>
  <div class="visits-page">
    <h1 class="page-title">Dashboard &nbsp;
      <small>
        <p v-if="this.permissions.includes('Admin')">Admin</p>
        <p v-else>User</p>
      </small>
    </h1>
    <b-row v-if="this.permissions.includes('Admin')">
      <b-col>
        <Widget
          title="<h5>Tabela de <span class='fw-semi-bold'>Eventos Ativos</span></h5>"
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
    }
  },
  computed: {
    ...mapState('layout', {
      permissions: state => state.permissions,
      curReq: state => state.curReq,
      id: state => state.id,
      userRuns: state => state.userRuns,
      eventsList: state => state.eventsList,
    }),
  },
  async created(){
    let wsPayload = {"endpoint":"getUserRuns", "id":this.curReq, info:{"id": this.id}};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);

    wsPayload = {"endpoint":"getEvents", "id":this.curReq};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
  components:{
    Widget
  }
};
</script>

<style src="./Visits.scss" lang="scss" />
