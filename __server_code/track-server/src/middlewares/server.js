const net = require('net');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { use } = require('../routes/authRoutes');
const DeviceState = mongoose.model('DeviceState');
const History = mongoose.model('History');
const Param = mongoose.model('Param');

const User = mongoose.model('User');

const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected:'+c.remoteAddress);
  
  console.log(c.address());

  clients.push({client:c,deviceID:"",control:false,set:false});
  
  c.on('data',(e)=>{
    try {
      var recs = new String(e);
      var indexSplit = recs.indexOf(':')
      if(indexSplit!=-1){
        recs = [recs.substring(0,indexSplit),recs.substring(indexSplit+1)];
      }
      if(parseInt(recs[0])==(e.length-recs[0].length-1)){
        var res = JSON.parse(recs[1].toString().replace(/"False"/g,"false").replace(/"True"/g,"true"));

        if(res.type){
          handleClient(res.type,res.data,c);
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
  c.on('close', () => {
    deleteItem(c);
    console.log('client disconnected');
  });
  c.on('error', () => {
    deleteItem(c);
    c.end();
    console.log('client disconnected');
  });
});
server.on('error', (err) => {
  //deleteItem(c);
  //throw err;
});
//server.address("127.0.0.1")
server.listen(8880, () => {
  console.log('server bound');
});

function send(deviceID,type,...content){
  var clientIndex = getClientState(deviceID,type);
  if(clientIndex>=0){
    clients[clientIndex].client.write(addHeader({ type,content}));
    clients[clientIndex][type] = true;
  }
  return clientIndex;
}

function getClientState(deviceID,type){
  var clientIndex = indexClientByDeviceId(deviceID);
  if(clientIndex!=-1){
    if(clients[clientIndex][type]){
      return -2;
    }
  }
  return clientIndex;
}

function addHeader(data){
  data = JSON.stringify(data);
  return data.length+":"+data;
}

function indexClient(c){
  const m = clients.filter((e=>{
    return e.client = c;
  }));
  if(m.length>0){
    return clients.indexOf(m[0]);
  }
  return -1;
}
function indexClientByDeviceId(c){
  const m = clients.filter((e=>{
    return e.deviceID = c;
  }));
  if(m.length>0){
    return clients.indexOf(m[0]);
  }
  return -1;
}

function deleteItem(c){
  var _indexClient = indexClient(c);
  if(_indexClient !=-1){
    clients.splice(_indexClient,1)
  }
}
var clients = [];


const handleClient = async (type,data,client)=>{
  console.log(type);
  if(type == "login"){
    if (!data.username || !data.password) {
      return client.write(addHeader({ type,error: 'Must provide username and password' }));
    }
    const user = await User.findOne({ username:data.username });
    if (!user) {
      return client.write(addHeader({ type,error: 'Invalid password' }));
    }
    
    try {
      await user.comparePassword(data.password);
      const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
      console.log(addHeader({ type,token }))
      return client.write(addHeader({ type,token }));

    }catch(err){
      console.log(err);
    }

  }else if(data.token){

    jwt.verify(data.token, 'MY_SECRET_KEY', async (err, payload) => {
      if (err) {
        return { error: 'You must be logged in.' };
      }
  
      const { userId } = payload;
  
      const user = await User.findById(userId);
      if(user){
        switch (type) {
          case "deviceID":
            clients[indexClient(client)].deviceID = data.deviceID;
            var device = await DeviceState.find({deviceID:data.deviceID});
            if(device.length == 0){
              return client.write(addHeader({ type,error:"device not register"}));
                //await new DeviceState({deviceID:data.deviceID,deviceState:[]}).save()
            }
            return client.write(addHeader({ type,success:"success"}));
          case "updateDevice":
            var deviceID = clients[indexClient(client)].deviceID ;
            if(deviceID){
              await DeviceState.updateOne(
                { deviceID },
                {
                    $set: { deviceState: data.deviceState }
                }
              );
            }
            break;
          case "addHistoryData":
              await new History({...data.history,quickV:data.history.fastTime,deviceID:data.deviceID}).save();
            break;
          case "updateParma":
            var deviceID = clients[indexClient(client)].deviceID ;
              if(deviceID){
                await Param.updateOne(
                  { deviceID },
                  {
                      $set: {...data.param}
                  }
                );
              }
              break;
            case "control":

              if(data.state == 'success'){
                clients[indexClient(client)].control = false; 
              }
              break;
            case "set":
                if(data.state == 'success'){
                  clients[indexClient(client)].control = false; 
                }
                break;
          default:
            break;
        }
      }
    });
  }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
module.exports = {clients,send,sleep,getClientState}
