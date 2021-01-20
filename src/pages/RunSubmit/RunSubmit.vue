<template>
  <div>
    <h1 class="page-title">Envie suas runs! &nbsp;
    </h1>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Crie <span class='fw-semi-bold'>uma run</span></h5>"
          customHeader
        >
          <form novalidate class="mt" @submit.prevent="submit">
            <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
              {{errorMessage}}
            </b-alert>

            <b-form-row>
              <b-col cols="6">
                <b-form-group label="Nome do jogo" label-for="gameName">
                  <div class="autocomplete" >
                    <b-input-group>
                    <input id="gameName"
                        autocomplete="off"
                        type="text"
                        ref="gameName"
                        v-model="form.gameName"
                        @input="onChange"
                        @keydown.down="onArrowDown"
                        @keydown.up="onArrowUp"
                        @keydown.enter="onEnter"
                        class="form-control input-transparent pl-3"/>
                    </b-input-group>
                    <ul class="autocomplete-results" v-show="isOpen">
                      <li
                        class="autocomplete-result" 
                        v-for="(result, i) in results" 
                        :key="i" 
                        @click="setResult(result)"
                        :class="{ 'is-active': i === arrowCounter }">
                        {{ result }}
                      </li>
                    </ul>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Ano de Lançamento" label-for="gameYear">
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
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col cols="6">
                <b-form-group label="Categoria" label-for="category">
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
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Tempo Estimado" label-for="estimatedTime">
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
                </b-form-group>
              </b-col>
            </b-form-row>


            <b-form-row>
              <b-col cols="6">
                <b-form-group label="Intervalo" label-for="timeSlot">
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
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Plataforma" label-for="platform">
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
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <small>*Não encontrou seu jogo na lista? Nos informe seu nome e ano de lançamento para adicionarmos!</small>
            </b-form-row>
            
            <b-form-row>
              <b-button type="submit" variant="danger" class="auth-btn" size="sm">
                <span class="auth-btn-circle">
                  <i class="la la-caret-right"></i>
                </span>
                Enviar
              </b-button>
            </b-form-row>

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

      items: [],
      isOpen: false,
      results: [],
      arrowCounter: -1,

      form: {
        category: '',
        estimatedTime: '',
        timeSlot: '',
        platform: '',

        gameId: null,
        gameName: '',
        gameYear: ''
      },
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
    //automcompletemethods
    handleClickOutside(evt) {
      if(evt.target.id !== "gameName"){
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    /*
    handleFocus(evt){
      if(evt.path[0].id === "gameName"){
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    */
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.form.gameName = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    onChange() {
      this.isOpen = true;
      this.filterResults();
      for(let game in this.gamesList){
        if(this.gamesList[game].name === this.form.gameName){
          this.form.gameYear = this.gamesList[game].year;
          continue;
        }
      }
    },
    filterResults() {
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.form.gameName.toLowerCase()) > -1);
      if(this.results.length === 0 || this.form.gameName === ''){ this.isOpen = false}
    },
    setResult(result) {
        this.form.gameName = result;
        this.isOpen = false;
    },
    //submit request methods
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
    for(let game in this.gamesList){
      this.items.push(this.gamesList[game].name);
    }
  },
  mounted(){
    document.addEventListener('click', this.handleClickOutside);
    //document.addEventListener('focusout', this.handleFocus);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
    //document.removeEventListener('focusout', this.handleFocus);
  }
};
</script>

<style>
  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    margin-left: 0.5%;
    border: 3px solid #15172e;
    border-radius: 1%;
    max-height: 130px;
    width: 99%;
    overflow: hidden;
    position: absolute;
    background-color: #1b1c3a;
    overflow-y: auto;
    z-index: 10;
  }
  
  .autocomplete-results::-webkit-scrollbar {
    display: none;
  }
  .autocomplete-results {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #15172e;
    color: white;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #15172e;
    color: white;
  }
</style>