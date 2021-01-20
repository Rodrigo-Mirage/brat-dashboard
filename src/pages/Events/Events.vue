<template>
  <div>
    <h1 class="page-title">Events Page &nbsp;
      <small>
        <small>Template</small>
      </small>
    </h1>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Events <span class='fw-semi-bold'>Table</span></h5>"
          customHeader
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Name</th>
                  <th>Link para doação</th>
                  <th>Data</th>
                  <th>Ativo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.eventsList" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>{{row.name}}</td>
                  <td>{{row.donation_link}}</td>
                  <td>{{formatDate(row.date)}}</td>
                  <td>{{row.active ? "Sim" : "Não"}}</td>
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
const moment = require('moment');
export default {
  name: 'Events',
  data() {
    return{
    }
  },
  methods: {
    formatDate(date){
      moment.locale(navigator.language)
      return moment(date, "YYYY-MM-DD").format('DD MMMM YYYY');
    }
  },
  computed: {
    ...mapState('layout', {
      eventsList: state => state.eventsList,
      curReq: state => state.curReq
    }),
  },
  components: {
    Widget,
  },
  async created(){
    const wsPayload = {"endpoint":"getEvents", "id":this.curReq};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);
    console.log(this.eventsList);
  },
};
</script>

