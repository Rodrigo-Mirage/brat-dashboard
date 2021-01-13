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
          title="<h5>Table <span class='fw-semi-bold'>Styles</span></h5>"
          customHeader settings close
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
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in users" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>{{row.first_name}}</td>
                  <td>{{row.last_name}}</td>
                  <td>{{row.username}}</td>
                  <td>{{row.email}}</td>
                  <td>{{row.permission}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix">
            <div class="float-right">
              <b-button variant="default" class="mr-3" size="sm">Send to...</b-button>
              <b-dropdown variant="inverse" class="mr-xs" size="sm" text="Clear" right>
                <b-dropdown-item>Clear</b-dropdown-item>
                <b-dropdown-item>Move ...</b-dropdown-item>
                <b-dropdown-item>Something else here</b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item>Separated link</b-dropdown-item>
              </b-dropdown>
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
  name: 'Admin',
  data() {
    return{
      users:[
        
      ]
    }
  },
  methods: {

  },
  computed: {
    ...mapState('layout', {
      userList: state => state.userList
    }),
  },
  components: {
    Widget,
  },
  async created(){

    const wsPayload = {"function":"getUsers", "session_id":"1"};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);

    for(let user in this.userList){
      this.users.push({
        id: this.userList[user].id,
        first_name: this.userList[user].first_name,
        last_name: this.userList[user].last_name,
        username: this.userList[user].username,
        email: this.userList[user].email,
        permission: "admin"
      })
    }
  },
};
</script>

