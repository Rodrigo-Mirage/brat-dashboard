//import axios from 'axios'

export default {
  async postSignup (first_name, last_name, username, email, password, gender, birthday, phone_number, stream_link, twitch, twitter, facebook, instagram, youtube){
    console.log(first_name,
                last_name,
                username,
                email,
                password,
                gender,
                birthday,
                phone_number,
                stream_link,
                twitch,
                twitter,
                facebook,
                instagram,
                youtube);
    return true;
    /*
    const response = await axios.post('http://localhost:3000/user', {
      first_name: first_name,
      last_name: last_name,
      username: username,
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
    */
  }
}
