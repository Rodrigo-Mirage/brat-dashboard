export default function websocket(){
  const wss = new WebSocket('ws://localhost:3000');
  return store => {
    wss.addEventListener('message', function (event){
      let payload = JSON.parse(event.data);
      switch(payload.msg){
          case "authLogin":
            store.commit('layout/authenticate');
            break;
          default:
            console.log("Mensagem do servidor: ", payload);
            //store.commit('receiveData', payload);
            return;
      }
    });
    store.subscribe(mutation => {
      if (mutation.type === 'layout/SOCKET_SEND') {
        wss.send(JSON.stringify(mutation.payload))
      }
    })
  }
}