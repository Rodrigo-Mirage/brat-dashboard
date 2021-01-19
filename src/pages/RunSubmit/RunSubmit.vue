<template>
  <div>
    <h1 class="page-title">Submit your run! &nbsp;
    </h1>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Crie <span class='fw-semi-bold'>sua run</span></h5>"
          customHeader
        >
        <form novalidate class="mt" @submit.prevent="submit">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>

<!--
          <v-autocomplete
            v-model="form.gameName"
            :items="items"
            dense
            solo
            label="Nome do jogo"
          ></v-autocomplete>
-->

          <b-form-group label-cols="1" label="Nome do jogo" label-for="gameName">
            <b-col cols="5">
            <b-input-group>
              <input id="gameName"
                    v-model="form.gameName" 
                    ref="gameName"
                    class="form-control input-transparent pl-3"
                    type="text"
                    required
                    placeholder=""/>
            </b-input-group>
            <small>Informar o nome completo do jogo.</small>
            </b-col>
          </b-form-group>

          <b-form-group label-cols="1" label="Ano de Lançamento" label-for="gameYear">
            <b-col cols="5">
            <b-input-group>
              <input id="gameYear"
                    v-model="form.gameYear" 
                    ref="gameYear"
                    class="form-control input-transparent pl-3"
                    type="text"
                    required
                    placeholder=""/>
            </b-input-group>
            <small>Informar o ano de lançamento do jogo.</small>
            </b-col>

          </b-form-group>

          <b-form-group label-cols="1" label="Categoria" label-for="category">
            <b-col cols="5">
            <b-input-group>
              <input id="category"
                     v-model="form.category" 
                     ref="category"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder=""/>
            </b-input-group>
            <small>Indique a categoria que você pode fazer (ex: 100%, Any%).</small>
            </b-col>
          </b-form-group>

          <b-form-group label-cols="1" label="Tempo Estimado" label-for="estimatedTime">
            <b-col cols="5">
            <b-input-group>
              <input id="estimatedTime"
                     v-model="form.estimatedTime" 
                     ref="estimatedTime"
                     class="form-control input-transparent pl-3"
                     type="time"
                     required
                     placeholder="Tempo estimado"
                     step='1'
                     min="00:00:00" max="24:00:00"
                     />
            </b-input-group>
            <small>
              Coloque o tempo limite que será necessário para completar a categoria (hh:mm:ss). 
              Lembre que Personal Best é diferente de Tempo Estimado. 
              Leve em consideração no tempo estratégias seguras e tempo necessário para backups. 
              É muito importante conseguir terminar a run no evento.
            </small>
            </b-col>
          </b-form-group>

          <b-form-group label-cols="1" label="Intervalo" label-for="timeSlot">
            <b-col cols="5">
            <b-input-group>
              <input id="timeSlot"
                     v-model="form.timeSlot" 
                     ref="timeSlot"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder=""/>
            </b-input-group>
            <small>Informar o intervalo de tempo preferido para realização da run (manhã, tarde, noite ou madrugada).</small>
            </b-col>
          </b-form-group>

          <b-form-group label-cols="1" label="Plataforma" label-for="platform">
            <b-col cols="5">
            <b-input-group>
              <input id="platform"
                     v-model="form.platform" 
                     ref="platform"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder=""/>
            </b-input-group>
          <small>Informar a plataforma que você usará para jogar o jogo(como PS4, PC, Switch).</small>
          </b-col>
          </b-form-group>

          <b-button type="submit" variant="danger" class="auth-btn" size="sm">
            <span class="auth-btn-circle">
              <i class="la la-caret-right"></i>
            </span>
            Enviar
          </b-button>

        </form>
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
  name: 'RunSubmit',
  data() {
    return {
      errorMessage: null,
      form: {
        category: 'Any%',
        estimatedTime: '01:00:00',
        timeSlot: 'Manhã',
        platform: 'PS4',

        gameId: null,
        gameName: 'Jogo2',
        gameYear: '2000'
      },
      items: [
        'aaaa',
        'bbbb',
        'cccc',
        'dddd',
      ],
      errors: {
        category: null,
        estimatedTime: null,
        timeSlot: null,
        platform: null,

        gameId: null,
        gameName: null,
        gameYear: null
      }
    }
  },
  methods: {
    async submit() {
      if(this.inputValidation()){
        let formatTime = this.form.estimatedTime.split(':');
        let estimatedSeconds = 0;
        if(formatTime[0]) estimatedSeconds += Number(formatTime[0]) * 3600;
        if(formatTime[1]) estimatedSeconds += Number(formatTime[1]) * 60;
        if(formatTime[2]) estimatedSeconds += Number(formatTime[2]);

        for(let game in this.gamesList){
          if(this.form.gameName === this.gamesList[game].name){
            this.form.gameYear = this.gamesList[game].year;
            this.form.gameId = this.gamesList[game].id;
            continue;
          }
        }
        
        let wsPayload = null;
        if(this.form.gameId !== null){
          wsPayload = {"endpoint":"createRun", "id":this.curReq, "info":{
            "runner_id": this.userId,

            "game_id": this.form.gameId,
            "category": this.form.category, 
            "estimated_time": estimatedSeconds, 
            "preferred_time_slot": this.form.timeSlot,
            "platform": this.form.platform
            }
          };
        }else{
          wsPayload = {"endpoint":"createRunNGame", "id":this.curReq, "info":{
            "runner_id": this.userId,

            "category": this.form.category, 
            "estimated_time": estimatedSeconds, 
            "preferred_time_slot": this.form.timeSlot,
            "platform": this.form.platform,

            "name": this.form.gameName,
            "year":this.form.gameYear,
            }
          };
        }        
        await this.$store.commit('layout/SOCKET_SEND', wsPayload);
        this.form.gameId = null;
      }
    },
    inputValidation(){
      let validationCheck = true;
      if(!this.form.gameName || /^\s*$/.test(this.form.gameName)) {
        this.errors.gameName = 'Nome do jogo: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.gameYear || /^\s*$/.test(this.form.gameYear)) {
        this.errors.gameYear = 'Ano de lançamento: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.category || /^\s*$/.test(this.form.category)) {
        this.errors.category = 'Categoria: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.estimatedTime || /^\s*$/.test(this.form.estimatedTime)) {
        this.errors.estimatedTime = 'Tempo estimado: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.timeSlot || /^\s*$/.test(this.form.timeSlot)) {
        this.errors.timeSlot = 'Intervalo: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.platform || /^\s*$/.test(this.form.platform)) {
        this.errors.platform = 'Plataforma: Campo obrigatório';
        validationCheck = false
      }
      if (!validationCheck){
        this.errorMessage = 'Os seguintes campos estão inválidos: ';
        for(let error in this.errors){
          if(this.errors[error]) this.errorMessage = this.errorMessage + this.errors[error];
        }
      }
      return validationCheck;
    }
  },
  computed:{
    ...mapState('layout', {
      curReq: state => state.curReq,
      gamesList: state => state.gamesList,
      userId: state => state.id,
    }),
  },
  async created(){
    const wsPayload = {"endpoint":"getGames", "id":this.curReq, "info":{}};
    await this.$store.commit('layout/SOCKET_SEND', wsPayload);
  }
};
</script>

