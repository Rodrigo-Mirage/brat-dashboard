<template>
  <div class="visits-page">
    <h1 class="page-title">Dashboard &nbsp;
      <small>
        <p v-if="this.permissions.includes('Admin')">Admin</p>
        <p v-else>User</p>
      </small>
    </h1>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Suas <span class='fw-semi-bold'>Runs</span></h5>"
          customHeader collapse
        >
          <div class="table-resposive">
            <table class="table">
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

                  <td v-if="row.waiting">Na Fila</td>
                  <td v-else-if="row.reviewed">Revisado</td>
                  <td v-else-if="row.approved">Aprovado</td>
                  <!--<td v-else-if="(!row.approved && row.reviewed)">Recusado</td>-->
                  <td v-else>None</td>

                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { mapState } from 'vuex';
export default {
  name: 'Visits',
  data() {
    return{
      status: null,
    }
  },
  methods: {

  },
  computed: {
    ...mapState('layout', {
      permissions: state => state.permissions,
      curReq: state => state.curReq,
      id: state => state.id,
      userRuns: state => state.userRuns,
    }),
  },
  async created(){
    const wsPayload = {"endpoint":"getUserRuns", "id":this.curReq, info:{"id": this.id}};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
  components:{
    Widget
  }
};
</script>

<style src="./Visits.scss" lang="scss" />
