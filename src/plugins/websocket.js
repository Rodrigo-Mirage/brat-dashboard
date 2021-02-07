export default function websocket(){
  const wss = new WebSocket('ws://161.35.116.60:3000');
  //const wss = new WebSocket('ws://localhost:3000');
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
          //Events
          case "getEvents":
            store.commit('layout/listEvents', payload.data);
            break;
          case "updateEventState":
            store.commit('layout/updateEventState', payload.data);
            break;
          case "createEvent":
            store.commit('layout/pushNewEvent', payload.data);
            break;
          case "updateEvent":
            store.commit('layout/updateEvent', payload.data);
            break;

          case "getEventExtras":
            store.commit('layout/listExtras', payload.data);
            break;
          case "getUserRuns":
            store.commit('layout/listUserRuns', payload.data);
            break;
          case "getEventSchedule":
            store.commit('layout/listSchedule', payload.data);
            break;
          //SubmitRun
          case "getSubmitRuns":
            store.commit('layout/listSubmitRuns', payload.data);
            break;
          case "updateSubmitRun":
            store.commit('layout/updateSubmitRun', payload.data);
            break;
          case "updateSubmitRunNRunIncentives":
            store.commit('layout/updateSubmitRunIncentives', payload.data);
            break;
          case "refuseSubmitRunNRemoveIncentives":
            store.commit('layout/updateSubmitRun', payload.data);
            store.commit('layout/removeIncentives', payload.data);
            break;
          //Incentives
          case "updateIncentive":
            store.commit('layout/updateIncentive', payload.data);
            break;


          //Schedule communication
          case "updateEventSchedule":
            store.commit('layout/updateScheduleList', payload.data[0].success);
            break;
          case "createSetupEventSchedule":
            store.commit('layout/updateScheduleList', payload.data[0].success);
            break;
          case "deleteEventSchedule":
            store.commit('layout/updateScheduleList', payload.data[0].success);
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