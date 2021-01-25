<template>
  <div>
    {{onReload()}}
     <b-row v-if="this.permissions.includes('Admin')">
      <b-col>
        <Widget
          :title="event"
          customHeader collapse
        >
          <b-modal 
          id='remove-row' 
          title="Remoção de agendamento"
          centered
          ok-variant="dark"
          cancel-variant="dark"
          ok-title="Confirmar"
          cancel-title="Cancelar"
          @ok="confirmRowRemotion">
            <p class="my-4">Tem certeza que deseja removar o agendamento de id {{ tempSchedule[removeIdx] ? tempSchedule[removeIdx].id : "Not Found"}}? </p>
          </b-modal>

          <b-modal 
          id='remove-setups' 
          title="Remoção de tempos de setup"
          centered
          ok-variant="dark"
          cancel-variant="dark"
          ok-title="Confirmar"
          cancel-title="Cancelar"
          @ok="confirmSetupRemotion">
            <p class="my-4">Tem certeza que deseja removar os tempos de setup? </p>
          </b-modal>

          <div class="table-resposive">
            <table class="table" v-if="tempSchedule.length !== 0">
              <thead>
                <tr>
                  <th class="hidden-sm-down"></th>
                  <th class="hidden-sm-down">#id</th>
                  <th>Horário</th>
                  <th>Jogo</th>
                  <th>Estimativa</th>
                  <th>Tempo Extra</th>
                  <th>Categoria</th>
                  <th>Intervalo</th>
                  <th>Plataforma</th>
                  <th>Runner</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <draggable v-model="tempSchedule" tag="tbody" v-bind="dragOptions">
                <tr v-for="row in tempSchedule" :key="row.id" class="dnd-item">
                  <td class="dnd-handle"> <i class="fa fa-align-justify handle"></i> </td>
                  <td> {{ row.id }}</td>
                  <td> {{ formatHorary(row.event_date, row.duration, row.extra_time) }}</td>
                  <td> {{ row.game }}</td>
                  
                  <td v-if="row.type !== 'setup'"> {{ formatInterval(row.duration) }}</td>
                  <td v-else><input
                    :value=formatInterval(row.duration)
                    @input="row.duration = toSeconds($event.target.value)"
                    ref="duration"
                    class="form-control input-transparent pl-3"
                    type="time"
                    step='1'
                  /></td>

                  <td> {{ formatInterval(row.extra_time) }}</td>
                  <td> {{ (row.category ? row.category:"") }}</td>
                  <td> {{ (row.interval ? row.interval:"") }} </td>
                  <td> {{ (row.platform ? row.platform:"") }}</td>

                  <td v-if="row.stream_link"><a :href=row.stream_link> {{ row.runner }} </a></td>
                  <td v-else> {{ row.runner }} </td>

                  
                  <td v-if="row.type !== 'setup'"> <b-button @click="addSetup(row.order-1)" variant="dark">Adicionar setup</b-button> </td>
                  <td v-else> </td>

                  <td> <i class="fa fa-times close" @click="removeAt(row.order-1)"></i> </td>
                </tr>
              </draggable>
            </table>
            <div v-else>A agenda está vazia!</div>
            <div class="clearfix">
              <div class="float-right">
                <b-button style="margin-right: 5px" @click="removeSetups" variant="dark">Remover tempos de setup</b-button>
                <b-button @click="addSetups" variant="dark">Adicionar tempos de setup</b-button>
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
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
const moment = require('moment');
let curTime = 0;
//let curDay = null;
//let newDay = true;
export default {
  name: 'Schedule',
  data() {
    return{
      event: null,
      tempSchedule: null,
      dragging: false,
      removeIdx: -1,
    }
  },
  methods: {
    formatInterval(time){
      if(!time) return ""
      let curTime = time;
      const hours = Math.floor(curTime/3600);
      curTime = curTime - hours*3600;
      const minutes = Math.floor(curTime/60);
      curTime = curTime - minutes*60;
      const seconds = curTime;
      let resp = '';
      if(hours){ 
        if(Math.floor(Math.log10(hours)) === 0){ resp +=  "0" + hours; }
        else { resp += hours }
      }else{
        resp += "00"
      }
      if(minutes){
        if(Math.floor(Math.log10(minutes)) === 0){ resp +=  ":0" + minutes; }
        else { resp +=  ":" + minutes }
      }else{
        resp += ":00"
      }
      if(seconds){
        if(Math.floor(Math.log10(seconds)) === 0){ resp +=  ":0" + seconds; }
        else { resp +=  ":" + seconds }
      }else{
        resp += ":00"
      }
      console.log('esse: ', resp)
      return resp;
    },
    formatHorary(date, duration, extra){
      const resp = moment(date).valueOf() + curTime;
      curTime += duration*1000;
      if(extra){ curTime += extra*1000 }
      return moment(resp).format('HH:mm:ss [de] DD/MM/YYYY');
    },
    onReload(){
      console.log(this.schedule);
      if(this.tempSchedule && this.tempSchedule[0]) { this.$store.commit('layout/updateSchedule', this.tempSchedule) }
      if(this.schedule) { this.tempSchedule = this.schedule}
      curTime = 0;
      if(this.schedule[0] !== undefined) {
        this.event = "<h5>Agenda <span class='fw-semi-bold'>do Evento " + this.schedule[0].event_name + "</span></h5>";
        //curDay = this.schedule[0].event_date;
      }else{
        this.event = "<h5>Agenda <span class='fw-semi-bold'>do Evento</span></h5>";
      }
    },
    removeAt(idx) {
      this.$bvModal.show('remove-row');
      this.removeIdx = idx;
    },
    confirmRowRemotion(){
      this.tempSchedule.splice(this.removeIdx, 1);
    },
    createTable(){
      if(document.getElementById('schedule-table')){
        document.getElementById('schedule-table').innerHTML = '';
        for(let idx in this.tempSchedule){
          const row = this.tempSchedule[idx];
          /*
          if(newDay){
            document.getElementById('schedule-table').innerHTML +=
            '<tr style="background-color: #282b56">' + 
              '<td>' + moment(curDay, "YYYY-MM-DD").format('DD [do] MM [de] YYYY') + '</td>' +
              '<td></td><td></td><td></td><td></td><td></td><td></td><td></td>' +
            '</tr>';
            newDay = false;
          }
          */
          document.getElementById('schedule-table').innerHTML += 
          '<tr>' + 
            '<td>' + row.id + '</td>' +
            '<td>' + this.formatHorary(row.event_date, row.duration, row.extra_time) + '</td>' +
            '<td>' + row.game + '</td>' +
            '<td>' + this.formatSeconds(row.duration) + '</td>' +
            '<td>' + this.formatSeconds(row.extra_time) + '</td>' +
            '<td>' + (row.category ? row.category:"") + '</td>' +
            '<td>' + (row.platform ? row.platform:"") + '</td>' +
            '<td>' + (row.stream_link ? '<a href=' + row.stream_link + '>': "") + (row.runner ? row.runner:"") + (row.stream_link ? '</a>':"") + '</td>' +
          '</tr>';
          //if the curDay day value is different from the (event starting day + curTime offsite) day value then we update curday value and it's a new day.
          /*
          if( moment(curDay, "YYYY-MM-DD").format('DD') !== moment((moment(row.event_date)+curTime)).format('DD-MM-YY').substring(0,2)){
            curDay = moment((moment(row.event_date)+curTime)).format('YYYY-MM-DD');
            newDay = true;
          }
          */
        }
        //newDay = true;
      }
    },
    toSeconds(time){
      console.log("outro: ", time);
      let resp = time.split(':');
      resp = (resp[0] ? Number(resp[0])*3600 : 0) + (resp[1] ? Number(resp[1])*60 : 0) + (resp[2] ? Number(resp[2]) : 0);
      return resp;
    },
    createSetup(idx){
      const setup = {
        "type": "setup",
        "event_id": this.tempSchedule[idx].event_id,
        "event_name": this.tempSchedule[idx].event_name,
        "event_date": this.tempSchedule[idx].event_date,
        "game": "Setup",
        "duration": 600,
        }
      this.tempSchedule.splice(idx, 0, setup);
      
    },
    addSetup(idx){
      if(!(this.tempSchedule[idx-1] && this.tempSchedule[idx-1].type === 'setup') ){
        this.createSetup(idx);
      }
    },
    addSetups(){
      for(let idx = 0; idx < this.tempSchedule.length; idx++){
        if(!(this.tempSchedule[idx-1] && this.tempSchedule[idx-1].type === 'setup' || this.tempSchedule[idx].type === 'setup')){
          this.createSetup(idx);
        }
      }
    },
    removeSetups(){
      this.$bvModal.show('remove-setups');
    },
    confirmSetupRemotion(){
      for(let idx = 0; idx < this.tempSchedule.length; idx++){
        if(this.tempSchedule[idx].type === 'setup'){
          this.tempSchedule.splice(idx, 1);
          idx--;
        }
      }
    }
  },
  computed: {
    ...mapState('layout', {
      permissions: state => state.permissions,
      curReq: state => state.curReq,
      schedule: state => state.schedule,
    }),
    dragOptions() {
      return {
        ghostClass: "ghost"
      };
    },
  },
  created(){
    const wsPayload = {"endpoint":"getEventSchedule", "id":this.curReq};
    this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
  components:{
    Widget,
    draggable,
  }
};
</script>

<style>
.ghost {
  opacity: 1;
  background: #15172e;
}

.dnd-handle {
  cursor: move;
}
</style>