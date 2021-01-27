<template>
  <div>
    <!-- Function that is triggered to update array values -->
    {{onReload()}}
     <b-row v-if="this.permissions.includes('Admin')">
      <b-col>
        <Widget
          :title="event"
          customHeader collapse
        >
        <!-- Modal Confirmations -->
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

          <!-- Schedule Creator -->
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
              <draggable 
                v-model="tempSchedule" 
                tag="tbody" 
                @change="updateSchedule" 
                ghost-class="ghost"
                animation='100'
              >
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

                  <td> {{ (row.interval ? translateInterval(row.interval):"") }} </td>

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
    //Reload Function
    onReload(){
      console.log('reload');
      if(this.tempSchedule && this.tempSchedule[0]) { this.$store.commit('layout/updateSchedule', this.tempSchedule) }
      if(this.schedule) {
        this.tempSchedule = this.schedule
      }
      curTime = 0;
      if(this.schedule[0] !== undefined) {
        this.event = "<h5>Agenda <span class='fw-semi-bold'>do Evento " + this.schedule[0].event_name + "</span></h5>";
      }else{
        this.event = "<h5>Agenda <span class='fw-semi-bold'>do Evento</span></h5>";
      }
    },
    //String Formatting
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
      return resp;
    },
    formatHorary(date, duration, extra){
      const resp = moment(date).valueOf() + curTime;
      curTime += duration*1000;
      if(extra){ curTime += extra*1000 }
      return moment(resp).format('HH:mm:ss [de] DD/MM/YYYY');
    },
    toSeconds(time){
      let resp = time.split(':');
      resp = (resp[0] ? Number(resp[0])*3600 : 0) + (resp[1] ? Number(resp[1])*60 : 0) + (resp[2] ? Number(resp[2]) : 0);
      //TODO
      return resp;
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
    //Schedule Add
    async createSetup(idx){
      const setup = {
        "type": "setup",
        "event_id": this.tempSchedule[idx].event_id,
        "event_name": this.tempSchedule[idx].event_name,
        "event_date": this.tempSchedule[idx].event_date,
        "game": "Setup",
        "duration": 600,
        "order": idx+1,
        }
      await this.tempSchedule.splice(idx, 0, setup);

      let data = [];
      for(let event in this.tempSchedule){
        data.push({ "id": this.tempSchedule[event].id, "order": this.tempSchedule[event].order });
      }
      this.addSchedule(setup, data);
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
          console.log("Multiple Setups Added");
        }
      }
    },
    //Schedule Remove
    removeSetups(){
      this.$bvModal.show('remove-setups');
    },
    confirmSetupRemotion(){
      for(let idx = 0; idx < this.tempSchedule.length; idx++){
        if(this.tempSchedule[idx].type === 'setup'){
          this.deleteSchedule(idx);
          this.tempSchedule.splice(idx, 1);
          idx--;
        }
      }
    },
    removeAt(idx) {
      this.$bvModal.show('remove-row');
      this.removeIdx = idx;
    },
    confirmRowRemotion(){
      this.deleteSchedule(this.removeIdx);
      this.tempSchedule.splice(this.removeIdx, 1);
    },
    //Websocket Request Functions
    updateSchedule(){
      let data = [];
      for(let event in this.tempSchedule){
        data.push({ "id": this.tempSchedule[event].id, "order": this.tempSchedule[event].order });
      }
      const wsPayload = {"endpoint":"updateEventSchedule", "id":this.curReq, "info":{ "data": JSON.stringify(data) }};
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
    },
    addSchedule(setup, data){
      const wsPayload = {"endpoint":"createSetupEventSchedule", "id":this.curReq, "info":{ 
        "duration": setup.duration, 
        "event_id": setup.event_id,
        "game": setup.game,
        "order": setup.order,
        "type": setup.type, 
        "data": JSON.stringify(data),
        }};
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
    },
    deleteSchedule(idx){
      const wsPayload = {"endpoint":"deleteEventSchedule", "id":this.curReq, "info":{ "id": this.tempSchedule[idx].id }};
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
    },
    //Temp Functions
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

  },
  computed: {
    ...mapState('layout', {
      permissions: state => state.permissions,
      curReq: state => state.curReq,
      schedule: state => state.schedule,
    }),
  },
  created(){
    const wsPayload = {"endpoint":"getEventSchedule", "id":this.curReq};
    this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
  watch:{
    tempSchedule: function(){
      for(let val in this.tempSchedule){
        this.tempSchedule[val].order = Number(val) + 1;
      }
    },
    schedule: function(){
      console.log('schedule mudou');
    }
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