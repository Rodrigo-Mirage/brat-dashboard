<template>
  <div>
    <b-modal 
      id='donation-modal' 
      title="Janela de doação"
      centered
      ok-variant="dark"
      cancel-variant="dark"
      ok-title="Confirmar"
      cancel-title="Cancelar"
      @cancel="close"
      @close="close"
      @ok="confirm"
      no-close-on-esc
      no-close-on-backdrop>

        <form autocomplete="off" novalidate class="mt" @submit.prevent="submit">

          <b-form-group label="" label-for="first_name">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-user text-white"></i></b-input-group-text>
              <input id="first_name"
                     v-model="form.firstName"
                     ref="first_name"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Nome"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="last_name">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-user text-white"></i></b-input-group-text>
              <input id="last_name"
                     v-model="form.lastName"
                     ref="last_name"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Sobrenome"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="email">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-user text-white"></i></b-input-group-text>
              <input id="email"
                     v-model="form.email"
                     ref="email"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="E-mail"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="value">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-user text-white"></i></b-input-group-text>
              <input id="value"
                     v-model="form.value"
                     ref="value"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Valor"/>
            </b-input-group>
          </b-form-group>
          
          <b-form-row>
            <b-form-select v-model="selectedIncentive" :options="incentivesArr"></b-form-select>
          </b-form-row>

          <b-form-row v-if="selectedIncentive" style="margin-top: 15px">
            <b-form-select v-model="selectedOption" :options="optionsArr"></b-form-select>
          </b-form-row>

          <b-form-row v-if="loading" style="margin-top: 15px">
            <div class="spinner-border" role="status" > </div>
          </b-form-row>
        </form>

        

    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Donation',
  data() {
    return{
      loading: false,

      selectedIncentive: null,
      incentivesArr: [
        { value: null, text: 'Por favor, escolha um incentivo.' },
        { value: 'a', text: 'Incentivo 1' },
        { value: 'b', text: 'Incentivo 2' },
      ],

      selectedOption: null,
      optionsArr: [
        { value: null, text: 'Por favor, escolha uma opção.' },
        { value: 'a', text: 'Opção 1' },
        { value: 'b', text: 'Opção 2' },
      ],

      form: {
        firstName: 'vitor',
        lastName: 'costa',
        email: 'vitor@gmail.com',
        value: '100',
      }
    }
  },
  props: ['runScheduleId'],
  methods: {
    close() {
      this.$emit('closeDonation');
    },
    confirm(evt){
      evt.preventDefault();
      this.loading = true;
      const wsPayload = {"first_name": this.form.firstName, "last_name": this.form.lastName, "email": this.form.email, "value": this.form.value}
      this.$store.commit('layout/SOCKET_SEND', wsPayload);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$bvModal.show('donation-modal');
    })
  },
  computed:{
    ...mapState('layout', {
      curReq: state => state.curReq,
    }),
  },
  created(){
    let wsPayload = {"endpoint":"getRunIncentives", "id":this.curReq, "info":{"id": this.runScheduleId}};
    this.$store.commit('layout/SOCKET_SEND', wsPayload);
    //pegar event_run_id de schedule -> pegar todos os incentivos com aquele event_run_id
  }
}
</script>