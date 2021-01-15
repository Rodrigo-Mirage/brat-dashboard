<template>
  <div>
    <h1 class="page-title">User Info &nbsp;
      <small>
        <small>Template</small>
      </small>
    </h1>
      <b-row>
        <b-col>
          <Widget 
          title="<h5>User <span class='fw-semi-bold'>Info</span></h5>"
          customHeader>
            <div>Name: {{this.user.first_name}}</div>
            <div>Last Name: {{this.user.last_name}}</div>
            <div>Username: {{this.user.username}}</div>
            <div>Email: {{this.user.email}}</div>
            <div>
              Permissions: 
              <small v-for="permission in this.user.permissions" :key="permission">
                <b-badge v-if="permission === 'Admin'" variant="success"><a @click="removePermission(permission)">{{permission}}</a></b-badge>
                <b-badge v-else-if="permission === 'Tech'" variant="primary"><a @click="removePermission(permission)">{{permission}}</a></b-badge>
                <b-badge v-else-if="permission === 'Financ'" variant="danger"><a @click="removePermission(permission)">{{permission}}</a></b-badge>
                <b-badge v-else-if="permission === 'Staff-Brat2021-Lead'" variant="warning"><a @click="removePermission(permission)">{{permission}}</a></b-badge>
                <b-badge v-else-if="permission === ''"></b-badge>
                <b-badge v-else variant="light"><a @click="removePermission(permission)">{{permission}}</a></b-badge>
              </small>
            </div>

            <div>
              <b-form-select id="permission-dropdown" v-model="selectedPermission" class="md-2" variant="dark">
                <option value="Admin">Admin</option>
                <option value="Tech">Tech</option>
                <option value="Financ">Financ</option>
                <option value="Staff-Brat2021-Lead">Staff-Brat2021-Lead</option>
                <option value="Comentarista-Brat2021">Comentarista-Brat2021</option>
                <option value="Runner-Brat2021">Runner-Brat2021</option>
                <option value="Host-Brat2021">Host-Brat2021</option>
              </b-form-select>
              <b-button variant="dark" @click="addPermission()">Add Permission</b-button>
            </div>

            <br>
            <h3>
              Permissions Info:
            </h3>
            <div>Admin: </div>
            <div>Tech: </div>
            <div>Financ: </div>
            <div>Staff-Brat2021-Lead: </div>
            <div>Comentarista-Brat2021: </div>
            <div>Runner-Brat2021: </div>
            <div>Host-Brat2021: </div>
            <div>None: </div>
            
          </Widget>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Widget from '../../components/Widget/Widget.vue';
export default {
  components: { Widget },
  name: 'UserView',
  data() {
      return{
        id: String(this.$route.params.id),
        user:  null,
        selectedPermission: '',
      }
  },
  created(){
     this.user = this.userList.find(element => String(element.id) === this.id);
     console.log('id: ' + this.curUserId);
  },
  computed: {
    ...mapState('layout', {
      userList: state => state.userList,
      curUserId: state => state.id
    }),
  },
  methods: {
    async removePermission(permission){
      const wsPayload = {"function":"removePermission", "session_id":"1", "data":{"updated_user": this.user.id, "updater_user": this.curUserId, "permission": permission}};
      await this.$store.commit('layout/SOCKET_SEND', wsPayload);
      console.log("permissão removida: " + permission);
    },
    async addPermission(){
      const wsPayload = {"function":"addPermission", "session_id":"1", "data":{"updated_user": this.user.id, "updater_user": this.curUserId, "permission": this.selectedPermission}};
      await this.$store.commit('layout/SOCKET_SEND', wsPayload);
    }
  }
};
</script>

