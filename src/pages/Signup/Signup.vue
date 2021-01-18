<template>
  <div class="auth-page">
    <b-container>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Cadastro</h3>" customHeader>
        <p class="widget-auth-info">
          Cadastre sua conta!
        </p>
        <form novalidate class="mt" @submit.prevent="submit">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>

          <b-form-group label="" label-for="first_name">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-user text-white"></i></b-input-group-text>
              <input id="first_name"
                     v-model="form.first_name" 
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
                     v-model="form.last_name" 
                     ref="last_name"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Sobrenome"/>
            </b-input-group>
          </b-form-group>
          
          <b-form-group label="" label-for="username">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-user text-white"></i></b-input-group-text>
              <input id="username"
                     v-model="form.username" 
                     ref="username"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Usuário"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="nickname">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-user text-white"></i></b-input-group-text>
              <input id="nickname"
                     v-model="form.nickname" 
                     ref="nickname"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Nickname"/>
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
          
          <b-form-group label="Gênero" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              v-model="form.gender"
              :options="genderOptions"
              :aria-describedby="ariaDescribedby"
              name="radio-inline"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group label="Data de nascimento" label-for="birthday">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-calendar text-white"></i></b-input-group-text>
              <input id="birthday"
                     v-model="form.birthday" 
                     ref="birthday"
                     class="form-control input-transparent pl-3"
                     type="date"
                     required
                     placeholder="Data de Nascimento"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="phone_number">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-phone text-white"></i></b-input-group-text>
              <input id="phone_number"
                     v-model="form.phone_number" 
                     ref="phone_number"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     v-mask="'+55(##)#####-####'"
                     placeholder="+55(__)_____-____"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="password1">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-lock text-white"></i></b-input-group-text>
              <input id="password1"
                     v-model="form.password1" 
                     ref="password1"
                     class="form-control input-transparent pl-3"
                     type="password"
                     required
                     placeholder="Senha"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="password2">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-lock text-white"></i></b-input-group-text>
              <input id="password2"
                     v-model="form.password2" 
                     ref="password2"
                     class="form-control input-transparent pl-3"
                     type="password"
                     required
                     placeholder="Confirmar Senha"/>
            </b-input-group>
          </b-form-group>

          <h6>Redes Sociais</h6>

          <b-form-group label="" label-for="stream_link">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-link text-white"></i></b-input-group-text>
              <input id="stream_link"
                     v-model="form.stream_link" 
                     ref="stream_link"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Transmissão"/>
            </b-input-group>
          </b-form-group>
          
          <b-form-group label="" label-for="twitch">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-link text-white"></i></b-input-group-text>
              <input id="twitch"
                     v-model="form.twitch" 
                     ref="twitch"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Twitch"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="twitter">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-link text-white"></i></b-input-group-text>
              <input id="twitter"
                     v-model="form.twitter" 
                     ref="twitter"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Twitter"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="facebook">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-link text-white"></i></b-input-group-text>
              <input id="facebook"
                     v-model="form.facebook" 
                     ref="facebook"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Facebook"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="instagram">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-link text-white"></i></b-input-group-text>
              <input id="instagram"
                     v-model="form.instagram" 
                     ref="instagram"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Instagram"/>
            </b-input-group>
          </b-form-group>

          <b-form-group label="" label-for="youtube">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-link text-white"></i></b-input-group-text>
              <input id="youtube"
                     v-model="form.youtube" 
                     ref="youtube"
                     class="form-control input-transparent pl-3"
                     type="text"
                     required
                     placeholder="Youtube"/>
            </b-input-group>
          </b-form-group>
  
          <div class="bg-widget auth-widget-footer">
            <b-button type="submit" variant="danger" class="auth-btn" size="sm">
              <span class="auth-btn-circle">
                <i class="la la-caret-right"></i>
              </span>
              Cadastrar
            </b-button>
            <router-link class="d-block text-center mb-4" to="login">Voltar</router-link>
          </div>
        </form>
      </Widget>
    </b-container>
    <!--
    <footer class="auth-footer">
      Light Blue Vue Admin Dashboard Template - Made by <a href="https://flatlogic.com" target="_blank">Flatlogic</a>
    </footer>
    -->
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import UserService from '@/service/UserService'

export default {
  name: 'SignupPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
      genderOptions: [
        { text: 'Masculino', value: 'M' },
        { text: 'Feminino', value: 'F' },
        { text: 'Não-Binário', value: 'N' },
        { text: 'Outro', value: 'O' }
      ],
      form:{ 
        first_name: 'Vitor',
        last_name: 'Hardoim',
        username: 'vitorch',
        nickname: 'Ranzo',
        email: 'vitor@gmail.com',
        gender: 'M',
        birthday: '1997-05-26',
        phone_number: '21989604160',
        password1: '12345678',
        password2: '12345678',
        stream_link: 'https://www.twitch.tv/yoda',
        twitch: 'https://www.twitch.tv/yoda',
        twitter: 'https://twitter.com/StoneDYooDa',
        facebook: 'https://www.facebook.com/Stoneyoda/',
        instagram: 'https://www.instagram.com/stonedyoda/?hl=pt-br',
        youtube: 'https://www.youtube.com/channel/UCuhVlANZXUATGv1dRmwcUzA',
        /*
        first_name: '',
        last_name: '',
        username: '',
        nickname: '',
        email: '',
        gender: 'M',
        birthday: '',
        phone_number: '',
        password1: '',
        password2: '',
        stream_link: '',
        twitch: '',
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: '',
        */
      },
      errors: {
        first_name: null,
        last_name: null,
        username: null,
        nickname: null,
        email: null,
        birthday: null,
        phone_number: null,
        password1: null,
        password2: null,
        stream_link: null,
        twitch: null,
        twitter: null,
        facebook: null,
        instagram: null,
        youtube: null,
      }
    };
  },
  methods: {
    async submit() {
        if(this.inputValidation()){
          const response = await UserService.postSignup(
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
      let validationCheck = true;
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //xxx@xxx.com.xx
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/; //yyyy-mm-dd
      //const pwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; // at least 8 characters, at least 1 number, at least 1 lowercase character, at least 1 uppercase character, only numbers/letters

      if(!this.form.first_name || /^\s*$/.test(this.form.first_name)) {
        this.errors.first_name = 'Nome: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.last_name || /^\s*$/.test(this.form.last_name)) {
        this.errors.last_name = 'Sobrenome: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.username || /^\s*$/.test(this.form.username)) {
        this.errors.username = 'Usuário: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.nickname || /^\s*$/.test(this.form.nickname)) {
        this.errors.nickname = 'Nickname: Campo obrigatório';
        validationCheck = false
      }
      if(!this.form.email || !emailRegex.test(this.form.email)) {
        this.errors.email = 'E-mail: Inválido';
        validationCheck = false
      }
      if(!this.form.birthday || !dateRegex.test(this.form.birthday)) {
        this.errors.birthday = 'Data de nascimento: Valor inválido';
        validationCheck = false
      }
      if(!this.form.phone_number || this.form.phone_number.length !== 17) {
        this.errors.phone_number = 'Telefone: Valor inválido';
        validationCheck = false
      } 
      if(!this.form.password1 || this.form.password1.length < 8) {
        this.errors.password1 = 'Senha: Inválida';
        validationCheck = false
      }else if(!this.form.password2 || this.form.password2.length < 8) {
        this.errors.password1 = 'Senha: Confirme sua senha!';
        validationCheck = false
      }else if(this.form.password1 !== this.form.password2) {
        this.errors.password1 = 'Senha: As senhas são diferentes!';
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
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/dashboard');
    }
  },
};
</script>
