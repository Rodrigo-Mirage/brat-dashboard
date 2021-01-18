import axios from 'axios'

export default {
  async postSignup (first_name, last_name, username, nickname, email, password, gender, birthday, phone_number, stream_link, twitch, twitter, facebook, instagram, youtube){
    const response = await axios.post('http://localhost:3000/user', {
      first_name: first_name,
      last_name: last_name,
      username: username,
      nickname: nickname,
      email: email,
      gender: gender,
      birthday: birthday,
      phone_number: phone_number,
      password: password,
      stream_link: stream_link,
      twitch: twitch,
      twitter: twitter,
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    });
    return response;
  },
  async getUser(id){
    const response = await axios.get('http://localhost:3000/user/'+id);
    return response;
  }
}
