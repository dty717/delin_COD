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
  console.log('client connected:' + c.remoteAddress);

  console.log(c.address());

  clients.push({ client: c, deviceID: "", control: false, set: false });
  var bigDatas = [];
  var bigDatasSum = 0;
  var bigDatasIndex = 0;
  c.on('data', (e) => {
    try {
      var recs;
      if (bigDatasSum > 0) {
        bigDatasIndex += e.length;
        bigDatas = bigDatas.concat(e)
        if (bigDatasIndex < bigDatasSum) {
          return;
        }
        recs = new String(bigDatas);
        
      } else {
        recs = new String(e);
      }

      var indexSplit = recs.indexOf(':')
      if (indexSplit != -1) {
        recs = [recs.substring(0, indexSplit), recs.substring(indexSplit + 1)];
      }
      if (bigDatasSum > 0) {
        bigDatasIndex = 0;
        bigDatasSum = 0;
        bigDatas = [];
      } else {
        if ((parseInt(recs[0]) >= 100) && (parseInt(recs[0]) > (e.length - recs[0].length - 1))) {
          bigDatasSum = parseInt(recs[0])
          return;
        }
      }
      if (parseInt(recs[0]) == (e.length - recs[0].length - 1)) {
        var res = JSON.parse(recs[1].toString().replace(/"False"/g, "false").replace(/"True"/g, "true"));
        if (res.type) {
          handleClient(res.type, res.data, c);
        }
      }
    } catch (error) {
      console.log(error)
      console.log(new String(e))
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

server.listen(8880, () => {
  console.log('server bound');
});

function send(deviceID, type, content) {
  var clientIndex = getClientState(deviceID, type);
  if (clientIndex >= 0) {
    var client = clients[clientIndex];
    client.client.write(addHeader({ type, ...content }));
    client[type] = true;
    client[type+"Timer"]= setTimeout((e)=>{
      client[type] = false;
    },30000);
  }
  return clientIndex;
}

function getClientState(deviceID, type) {
  var clientIndex = indexClientByDeviceId(deviceID);
  if (clientIndex != -1) {
    if (clients[clientIndex][type]) {
      return -2;
    }
  }
  return clientIndex;
}

function getClientStateInfo(deviceID) {
  var clientIndex = indexClientByDeviceId(deviceID);
  var deviceState = {};
  if (clientIndex == -1) {
    deviceState.connect = false;
    return deviceState
  }
  deviceState.connect = true;
  var device = clients[clientIndex];
  deviceState.set = device.set;
  deviceState.control = device.control;
  return deviceState;
}


function addHeader(data) {
  data = JSON.stringify(data);
  var utf8 = unescape(encodeURIComponent(data));
  return utf8.length + ":" + data;
}

function indexClient(c) {
  const m = clients.filter((e => {
    return e.client = c;
  }));
  if (m.length > 0) {
    return clients.indexOf(m[0]);
  }
  return -1;
}
function indexClientByDeviceId(c) {
  const m = clients.filter((e => {
    return e.deviceID = c;
  }));
  if (m.length > 0) {
    return clients.indexOf(m[0]);
  }
  return -1;
}

function deleteItem(c) {
  var _indexClient = indexClient(c);
  if (_indexClient != -1) {
    clients.splice(_indexClient, 1)
  }
}
var clients = [];
const handleClient = async (type, data, client) => {
  if (type == "login") {
    if (!data.username || !data.password) {
      return client.write(addHeader({ type, error: 'Must provide username and password' }));
    }
    const user = await User.findOne({ username: data.username });
    if (!user) {
      return client.write(addHeader({ type, error: 'Invalid password' }));
    }

    try {
      await user.comparePassword(data.password);
      const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
      console.log(addHeader({ type, token }))
      return client.write(addHeader({ type, token }));

    } catch (err) {
      console.log(err);
    }

  } else if (data.token) {

    jwt.verify(data.token, 'MY_SECRET_KEY', async (err, payload) => {
      if (err) {
        return { error: 'You must be logged in.' };
      }
      const { userId } = payload;
      const user = await User.findById(userId);
      if (user) {
        switch (type) {
          case "deviceID":
            var device = clients[indexClient(client)];
            if (!device) {
              client.close();
            }
            device.deviceID = data.deviceID;
            var device = await DeviceState.findOne({ deviceID: data.deviceID });
            if (device.length == 0) {
              return client.write(addHeader({ type, error: "device not register" }));
            }
            return client.write(addHeader({ type, success: "success", lastHistory: device.lastHistory, lastUpdate: device.lastUpdate }));
          case "updateDevice":
            var deviceID = clients[indexClient(client)].deviceID;
            if (deviceID) {
              if (data.deviceState && (data.deviceState.length > 0)) {
                await DeviceState.updateOne(
                  { deviceID },
                  {
                    $set: { deviceState: data.deviceState, lastUpdate: new Date(new Date().getTime() + 1000 * 60 * 60 * 8) }
                  }
                );
              }
            }
            break;
          case "addHistoryData":
            await new History({ ...data.history, quickV: data.history.fastTime, deviceID: data.deviceID }).save();
            break;
          case "addLastHistoryData":
            var deviceID = data.deviceID;
            var device = await DeviceState.findOne({ deviceID });
            var newHistoryTime = new Date(new Date(data.historyDatas[data.historyDatas.length - 1].time).getTime() + 1000 * 60 * 60 * 8);

            data.historyDatas.forEach(element => {
              element.time = new Date(new Date(element.time).getTime() + 1000 * 60 * 60 * 8);
              element['deviceID'] = deviceID
            });
            data.historyDatas.reverse();
            if (device.lastHistory < newHistoryTime) {
              await DeviceState.updateOne(
                { deviceID },
                {
                  $set: { lastHistory: newHistoryTime.toString() }
                }
              );
            }
            await History.insertMany(
              [
                ...data.historyDatas
              ]
            )
            console.log('addLastHistoryData', newHistoryTime);
            break;
          case "updateParma":
            console.log("updateParma")
            var deviceID = clients[indexClient(client)].deviceID;
            if (deviceID) {
              await Param.updateOne(
                { deviceID },
                {
                  $set: { ...data.param }
                }
              );
              await DeviceState.updateOne(
                { deviceID },
                {
                  $set: { lastParam: new Date(new Date().getTime() + 1000 * 60 * 60 * 8) }
                }
              )
            }
            break;
          case "control":
            var device = clients[indexClient(client)]
            if (data.state == 'success') {
              device.control = false;
              clearTimeout(device.controlTimer)
            } else if (data.state == 'error') {
              device.control = false;
              clearTimeout(device.controlTimer)
            }
            break;
          case "set":
            var device = clients[indexClient(client)]
            if (data.state == 'success') {
              device.set = false;
              clearTimeout(device.setTimer)
            } else if (data.state == 'error') {
              device.set = false;
              clearTimeout(device.setTimer)
            }
            break;
          default:
            break;
        }
      }
    });
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
module.exports = { clients, send, sleep, getClientStateInfo }
