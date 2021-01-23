<template>
  <div>
    {{resetTime()}}
     <b-row v-if="this.permissions.includes('Admin')">
      <b-col>
        <Widget
          :title="event"
          customHeader collapse
        >
        <!--
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Horário</th>
                  <th>Jogo</th>
                  <th>Estimativa</th>
                  <th>Tempo Extra</th>
                  <th>Categoria</th>
                  <th>Plataforma</th>
                  <th>Runner</th>
                </tr>
              </thead>
              <tbody id='schedule-table'>
                {{ createTable() }}
              </tbody>
            </table>
          </div>
        -->

<div class="table-resposive">
  <table class="table">
    <thead>
      <tr>
        <th class="hidden-sm-down">#id</th>
        <th>Horário</th>
        <th>Jogo</th>
        <th>Estimativa</th>
        <th>Tempo Extra</th>
        <th>Categoria</th>
        <th>Plataforma</th>
        <th>Runner</th>
      </tr>
    </thead>
    <draggable v-model="tempSchedule" tag="tbody">
      <tr v-for="row in tempSchedule" :key="row.id">
        <td> {{ row.id }}</td>
        <td> {{ row.duration }}</td>
        <td> {{ row.game }}</td>
        <td> {{ row.duration }}</td>
        <td> {{ row.extra_time }}</td>
        <td> {{ (row.category ? row.category:"") }}</td>
        <td> {{ (row.platform ? row.platform:"") }}</td>
        <td> {{ row.runner }}</td>
      </tr>
    </draggable>
  </table>
</div>




<!-- -->
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
let curDay = null;
let newDay = true;
export default {
  name: 'Schedule',
  data() {
    return{
      event: null,
      tempSchedule: null,
      dragging: false
    }
  },
  methods: {
    formatSeconds(seconds){
      if(seconds) return moment.utc(seconds*1000).format('HH:mm:ss')
      return '';
    },
    formatHorary(date, duration, extra){
      const resp = moment(date).valueOf() + curTime;
      curTime += duration*1000;
      if(extra){ curTime += extra*1000 }
      return moment(resp).format('HH:mm:ss');
    },
    resetTime(){
      if(this.tempSchedule && this.tempSchedule[0]) { this.$store.commit('layout/updateSchedule', this.tempSchedule) }
      if(this.schedule) { this.tempSchedule = this.schedule}
      curTime = 0;
      if(this.schedule[0] !== undefined) {
        this.event = "<h5>Agenda <span class='fw-semi-bold'>do Evento " + this.schedule[0].event_name + "</span></h5>";
        curDay = this.schedule[0].event_date;
      }else{
        this.event = "<h5>Agenda <span class='fw-semi-bold'>do Evento</span></h5>";
      }
    },
    createTable(){
      if(document.getElementById('schedule-table')){
        document.getElementById('schedule-table').innerHTML = '';
        for(let idx in this.schedule){
          const row = this.schedule[idx];
          if(newDay){
            document.getElementById('schedule-table').innerHTML +=
            '<tr style="background-color: #282b56">' + 
              '<td>' + moment(curDay, "YYYY-MM-DD").format('DD [do] MM [de] YYYY') + '</td>' +
              '<td></td><td></td><td></td><td></td><td></td><td></td><td></td>' +
            '</tr>';
            newDay = false;
          }
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
          if( moment(curDay, "YYYY-MM-DD").format('DD') !== moment((moment(row.event_date)+curTime)).format('DD-MM-YY').substring(0,2)){
            curDay = moment((moment(row.event_date)+curTime)).format('YYYY-MM-DD');
            newDay = true;
          }
        }
        newDay = true;
      }
    }
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
  components:{
    Widget,
    draggable,
  }
};
</script>