<template>
  <div>
    <h1 class="page-title">Página de Eventos &nbsp;</h1>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Tabela de <span class='fw-semi-bold'>Eventos</span></h5>"
          customHeader
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#id</th>
                  <th>Nome</th>
                  <th>Link para doação</th>
                  <th>Data</th>
                  <th>Ativo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.eventsList" :key="row.id">
                  <td>{{row.id}}</td>
                  <td><input
                    ref="name"
                    class="form-control input-transparent pl-3"
                    type="text"
                    v-model="row.name" 
                  /></td>
                  <td><input
                    ref="donation_link"
                    class="form-control input-transparent pl-3"
                    type="text"
                    v-model="row.donation_link" 
                  /></td>
                  <td><input
                    ref="date"
                    class="form-control input-transparent pl-3"
                    type="date"
                    v-model="row.date" 
                  /></td>
                  <td>{{row.active ? "Sim" : "Não"}}</td>
                  <td><b-button @click="edit(row.id, row.name, row.donation_link, row.date)" variant="dark">Editar</b-button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix">
            <div class="float-right">
              <b-button @click="toggleCreate" variant="dark">Criar evento</b-button>
            </div>
          </div>
          <div v-show="showCreate">
            <b-row>
              <h4>Novo evento</h4>
            </b-row>
            <b-row style="padding-left: 12px">
              <form novalidate class="mt" @submit.prevent="submit">
                <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
                  {{errorMessage}}
                </b-alert>
                <b-row>
                  <b-col cols=4>
                    <b-form-group label="Nome do evento" label-for="newName">
                      <b-input-group>
                        <input id="newName"
                          v-model="newName" 
                          ref="newName"
                          class="form-control input-transparent pl-3"
                          type="text"
                          required
                          placeholder=""/>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col cols=4>
                    <b-form-group label="Link para doações" label-for="newDonationLink">
                      <b-input-group>
                        <input id="newDonationLink"
                          v-model="newDonationLink" 
                          ref="newDonationLink"
                          class="form-control input-transparent pl-3"
                          type="text"
                          required
                          placeholder=""/>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col cols=4>
                    <b-form-group label="Data" label-for="newDate">
                      <b-input-group>
                        <input id="newDate"
                          v-model="newDate" 
                          ref="newDate"
                          class="form-control input-transparent pl-3"
                          type="date"
                          required
                          placeholder=""/>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <b-button type="submit" variant="dark" class="auth-btn" size="sm">
                      <span class="auth-btn-circle">
                        <i class="la la-caret-right"></i>
                      </span>
                      Criar
                    </b-button>
                  </b-col>             
                 </b-row>

              </form>
            </b-row>
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
      errorMessage: null,

      showCreate: false,
      newName: '',
      newDonationLink: '',
      newDate: '',
    }
  },
  methods: {
    edit(id, name, donationLink, date){
      const wsPayload = {"endpoint":"updateEvent", "id":this.curReq, info:{"id":id, "name":name, "donation_link":donationLink, "date": date}};
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
    },
    toggleCreate(){
      this.showCreate = !this.showCreate;
    },
    submit(){
      const wsPayload = {"endpoint":"createEvent", "id":this.curReq, info:{"name": this.newName, "donation_link": this.newDonationLink, "date": this.newDate}};
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
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
  },
};
</script>

