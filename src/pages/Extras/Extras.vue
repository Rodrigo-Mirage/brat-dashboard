<template>
  <div>
    <h1 class="page-title">Extras Page &nbsp;
      <small>
        <small>Template</small>
      </small>
    </h1>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Extras <span class='fw-semi-bold'>Table</span></h5>"
          customHeader
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Evento</th>
                  <th>Tipo</th>
                  <th>Duração</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.extrasList" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>{{row.event_id}}</td>
                  <td>{{row.type}}</td>
                  <td>{{formatTime(row.time)}}</td>
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
  name: 'Extras',
  data() {
    return{
    }
  },
  methods: {
    formatTime(time){
      let curTime = time;
      const hours = Math.floor(curTime/3600);
      curTime = curTime - hours*3600;
      const minutes = Math.floor(curTime/60);
      curTime = curTime - minutes*60;
      const seconds = curTime;
      let resp = '';
      if(hours){ 
        resp += hours + " hora";
        if(hours > 1){
          resp += "s";
        }
        resp += " ";
      }
      if(minutes){ 
        resp += minutes + " minuto";
        if(minutes > 1){
          resp += "s";
        }
        resp += " ";
      }
      if(seconds){ 
        resp +=  seconds + " segundo";
        if(seconds > 1){
          resp += "s";
        }
        resp += " ";
      }
      return resp;
    }
  },
  computed: {
    ...mapState('layout', {
      extrasList: state => state.extrasList,
      curReq: state => state.curReq
    }),
  },
  components: {
    Widget,
  },
  async created(){
    const wsPayload = {"endpoint":"getEventExtras", "id":this.curReq};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
};
</script>

