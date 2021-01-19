<template>
  <div>
    <h1 class="page-title">Admin Page &nbsp;
      <small>
        <small>Template</small>
      </small>
    </h1>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Permissions <span class='fw-semi-bold'>Table</span></h5>"
          customHeader settings close
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Name</th>
                  <th>Link para doação</th>
                  <th>Ativo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.eventsList" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>{{row.name}}</td>
                  <td>{{row.donation_link}}</td>
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
export default {
  name: 'Events',
  data() {
    return{
    }
  },
  methods: {

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
  },
};
</script>

