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
          customHeader
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Permission</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.userList" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>{{row.first_name}}</td>
                  <td>{{row.last_name}}</td>
                  <td>{{row.username}}</td>
                  <td>{{row.email}}</td>

                  <td><small v-for="permission in row.permissions" :key="permission">
                    <b-badge v-if="permission === 'Admin'" variant="success">{{permission}}</b-badge>
                    <b-badge v-else-if="permission === 'Tech'" variant="primary">{{permission}}</b-badge>
                    <b-badge v-else-if="permission === 'Financ'" variant="danger">{{permission}}</b-badge>
                    <b-badge v-else-if="permission === 'Staff-Brat2021-Lead'" variant="warning">{{permission}}</b-badge>
                    <b-badge v-else-if="permission === ''"></b-badge>
                    <b-badge v-else variant="light">{{permission}}</b-badge>
                  </small></td>
                  <td>
                    <router-link :to="`/app/user/${row.id}`"><b-button variant="dark">View</b-button></router-link>
                  </td>
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
  name: 'Admin',
  data() {
    return{
    }
  },
  methods: {

  },
  computed: {
    ...mapState('layout', {
      userList: state => state.userList,
      curReq: state => state.curReq
    }),
  },
  components: {
    Widget,
  },
  async created(){
    const wsPayload = {"endpoint":"getUsers", "id":this.curReq};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);
  },
};
</script>

