<template>
  <div>
    <h1 class="page-title">Games Page &nbsp;
      <small>
        <small>Template</small>
      </small>
    </h1>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Games <span class='fw-semi-bold'>Table</span></h5>"
          customHeader
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Name</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.gamesList" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>{{row.name}}</td>
                  <td>{{row.year}}</td>
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
  name: 'Games',
  data() {
    return{
    }
  },
  methods: {

  },
  computed: {
    ...mapState('layout', {
      curReq: state => state.curReq,
      gamesList: state => state.gamesList,
    }),
  },
  components: {
    Widget,
  },
  async created(){
    const wsPayload = {"endpoint":"getGames", "id":this.curReq};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
};
</script>

