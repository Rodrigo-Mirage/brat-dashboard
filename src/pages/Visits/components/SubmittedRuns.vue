<template>
  <div v-if="this.permissions.includes('Admin')">
    <b-modal 
      id='review-run' 
      :title="`Revisar run de #ID ` + curRunId"
      centered
      ok-variant="dark"
      cancel-variant="dark"
      ok-title="Cancelar"
      ok-only>
      <hr/>
        <div v-if="submittedRuns[curRunId-1]">
          <b-row>
            <b-col>Runner: {{ submittedRuns[curRunId-1].runner }} </b-col>
          </b-row>
          <b-row>
            <b-col>Jogo: {{ submittedRuns[curRunId-1].game_name }} </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>Status Atual: </span>
              <b-badge v-if="getStatus(submittedRuns[curRunId-1].reviewed, submittedRuns[curRunId-1].approved, submittedRuns[curRunId-1].waiting) === 0" variant='gray'> Não Revisada </b-badge>
              <b-badge v-if="getStatus(submittedRuns[curRunId-1].reviewed, submittedRuns[curRunId-1].approved, submittedRuns[curRunId-1].waiting) === 1" variant='success'> Aprovada </b-badge>
              <b-badge v-if="getStatus(submittedRuns[curRunId-1].reviewed, submittedRuns[curRunId-1].approved, submittedRuns[curRunId-1].waiting) === 2" variant='primary'> Aprovada, na fila de espera </b-badge>
              <b-badge v-if="getStatus(submittedRuns[curRunId-1].reviewed, submittedRuns[curRunId-1].approved, submittedRuns[curRunId-1].waiting) === 3" variant='danger'> Recusada </b-badge>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button @click="approve()" style="margin-right: 10px" variant="success">Aprovar</b-button>
              <b-button @click="refuse()" style="margin-right: 10px" variant="danger">Recusar</b-button>
              <b-button @click="approveWaiting()" variant="primary">Aprovar e colocar na fila</b-button>
            </b-col>
          </b-row>
        </div>
        <hr/>
    </b-modal>

    <b-row>
      <b-col>
        <Widget
          title="<h5>Runs <span class='fw-semi-bold'>do Evento</span></h5>"
          customHeader collapse
        >
          <div class="table-resposive">
            <table class="table" v-if="this.submittedRuns.length !== 0">
              <thead>
                <tr>
                  <th></th>
                  <th>#ID</th>
                  <th>Evento</th>
                  <th>Jogo</th>
                  <th>Categoria</th>
                  <th>Plataforma</th>
                  <th>Turno</th>
                  <th>Runner</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="(row, idx) in submittedRuns" :key="row.id">
                  <tr>
                    <td v-if="row.incentives.length > 0 && showIncentives"><b-button @click="toggleIncentives(idx)" variant="dark"><i class="las la-angle-right"></i></b-button></td>
                    <td v-else-if="row.incentives.length > 0 && !showIncentives"><b-button @click="toggleIncentives(idx)" variant="dark"><i class="las la-angle-down"></i></b-button></td>
                    <td v-else></td>
                    
                    <td class="align-middle">{{ row.id }}</td>
                    <td class="align-middle">{{ row.event_name }}</td>
                    <td class="align-middle">{{ row.game_name }}</td>
                    <td class="align-middle">{{ row.category }}</td>
                    <td class="align-middle">{{ row.platform }}</td>
                    <td class="align-middle">{{ translateInterval(row.time_slot) }}</td>
                    <td class="align-middle">{{ row.runner }}</td>
                    <td class="align-middle">
                      <b-badge v-if="getStatus(row.reviewed, row.approved, row.waiting) === 0" variant='gray'> Não Revisada </b-badge>
                      <b-badge v-if="getStatus(row.reviewed, row.approved, row.waiting) === 1" variant='success'> Aprovada </b-badge>
                      <b-badge v-if="getStatus(row.reviewed, row.approved, row.waiting) === 2" variant='primary'> Aprovada, na fila de espera </b-badge>
                      <b-badge v-if="getStatus(row.reviewed, row.approved, row.waiting) === 3" variant='danger'> Recusada </b-badge>
                    </td>
                    <td>
                      <b-button @click="reviewRun(row.id)" variant="dark">Revisar</b-button>
                    </td>
                  </tr>

                  <tr v-for="option in row.incentives" :key="option.id"
                    v-show="toggleIncentive[idx]"
                    style="background-color: #212547; border-left: 1px solid black; border-right: 1px solid black;">
                    <td class="align-middle">{{ option.id }}</td>
                    <td class="align-middle">{{ option.comment }}</td>
                    <td class="align-middle">{{ option.name }}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

              </tbody>
            </table>

            <div v-else>
                <span>O evento ainda não possui runs!</span>
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
export default {
  name: 'Visits',
  data() {
    return{
      curRunId: null,

      showIncentives: true,
      toggleIncentive: [],
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
    translateInterval(interval){
      //Manhã     = 1000;
      //Tarde     = 0100;
      //Noite     = 0010;
      //Madrugada = 0001;
      if(interval){
        let resp = [];
        if(interval[0] === '1') resp.push("Manhã")
        if(interval[1] === '1') resp.push("Tarde")
        if(interval[2] === '1') resp.push("Noite")
        if(interval[3] === '1') resp.push("Madrugada")
        resp = resp.join(", ")
        return resp;
      }
      return '';
    },

    //Review Modal
    reviewRun(id){
      this.curRunId = id;
      this.$bvModal.show('review-run');
    },
    approve(){
      let wsPayload = {"endpoint":"updateSubmitRun", "id":this.curReq, "info":{"id": this.curRunId, "reviewed": true, "approved": true, "waiting": false}};
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
      this.$bvModal.hide('review-run');
    },
    refuse(){
      let wsPayload = {"endpoint":"updateSubmitRun", "id":this.curReq, "info":{"id": this.curRunId, "reviewed": true, "approved": false, "waiting": false}};
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
      this.$bvModal.hide('review-run');
    },
    approveWaiting(){
      let wsPayload = {"endpoint":"updateSubmitRun", "id":this.curReq, "info":{"id": this.curRunId, "reviewed": true, "approved": true, "waiting": true}};
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
      this.$bvModal.hide('review-run');
    },

    //Incentives
    toggleIncentives(idx){
      console.log(this.submittedRuns[idx].incentives.length > 0 && this.toggleIncentive[idx]);
      this.toggleIncentive[idx] = !this.toggleIncentive[idx];
      this.showIncentives = !this.showIncentives;
    }
  }, 
  computed: {
    ...mapState('layout', {
      permissions: state => state.permissions,
      curReq: state => state.curReq,
      id: state => state.id,
      submittedRuns: state => state.submittedRuns,
    }),
  },
  created(){
    let wsPayload = {"endpoint":"getSubmitRuns", "id":this.curReq};
    this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
  components:{
    Widget
  }
}
</script>