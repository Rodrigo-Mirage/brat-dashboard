<template>
  <div>
    <h1 class="page-title">Submit your run! &nbsp;
    </h1>
        <b-row>
      <b-col>
        <Widget
          title="<h5>Create <span class='fw-semi-bold'>a run</span></h5>"
          customHeader
        >
        <form novalidate class="mt" @submit.prevent="submit">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>

          <b-form-group label="" label-for="gameName">
            <b-input-group>
              <input id="gameName"
                     v-model="form.gameName" 
                     ref="gameName"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Nome do jogo"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="category">
            <b-input-group>
              <input id="category"
                     v-model="form.category" 
                     ref="category"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Categoria da run"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="estimatedTime">
            <b-input-group>
              <input id="estimatedTime"
                     v-model="form.estimatedTime" 
                     ref="estimatedTime"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Tempo estimado"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="timeSlot">
            <b-input-group>
              <input id="timeSlot"
                     v-model="form.timeSlot" 
                     ref="timeSlot"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Intervalo (manhã, tarde, noite)"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="platform">
            <b-input-group>
              <input id="platform"
                     v-model="form.platform" 
                     ref="platform"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Plataforma"/>
            </b-input-group>
          </b-form-group>

        </form>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '../../components/Widget/Widget.vue';
export default {
  components: { Widget },
  name: 'RunSubmit',
  data() {
    return {
      errorMessage: null,
      form: {
        gameId: '',
        category: '',
        estimatedTime: '',
        timeSlot: '',
        platform: '',

        gameName: '',
        gameYear: ''
      }
    }
  },
  methods: {
    /*
    async submit() {
        if(this.inputValidation()){
          const response = await RunService.postSignup(
                    this.form.first_name,
                    this.form.last_name,
                    this.form.username,
                    this.form.nickname,
                    this.form.email,
                    this.form.password1,
                    this.form.gender,
                    this.form.birthday,
                    this.form.phone_number,
                    this.form.stream_link,
                    this.form.twitch,
                    this.form.twitter,
                    this.form.facebook,
                    this.form.instagram,
                    this.form.youtube);
          console.log(response);
          
          if (response) {
            this.$router.push('/login');
          }else{
            this.errorMessage = "Usuário já existe"
          }
        }
    },
    inputValidation(){
      return true;
    }
    */
  },
};
</script>

