export default function websocket(){
  const wss = new WebSocket('ws://localhost:3000');
  return store => {
    wss.addEventListener('message', function (event){
      let payload = JSON.parse(event.data);
      switch(payload.endpoint){
          case "login":
            store.commit('layout/authenticate');
            break;
          case "getUsers":
            store.commit('layout/listUsers', payload.data);
            break;
          case "getGames":
            store.commit('layout/listGames', payload.data);
            break;
          case "getEvents":
            store.commit('layout/listEvents', payload.data);
            break;
          case "getEventExtras":
            store.commit('layout/listExtras', payload.data);
            break;
          default:
            console.log("Mensagem do servidor: ", payload);
            //store.commit('receiveData', payload);
            return;
      }
    });
    store.subscribe(mutation => {
      if (mutation.type === 'layout/SOCKET_SEND') {
        store.commit('layout/wsState', wss.readyState);
        wss.send(JSON.stringify(mutation.payload))
      }
    })
  }
}