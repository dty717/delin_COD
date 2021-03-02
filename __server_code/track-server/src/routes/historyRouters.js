const express = require('express');
const mongoose = require('mongoose');

const History = mongoose.model('History');

const router = express.Router();

// router.get('/Historys', async (req, res) => {
//   const Historys = await History.find({ userId: req.user._id });

//   res.send(Historys);
// });
router.get('/updateDevice',async(req,res)=>{
  try {
    const history = new History({
      deviceID:"deviceID",
      time: new Date(),
      sampleInfo: 'sampleInfo',
      sampleId: 12,
      sampleState: "sampleState",
      tubeId:12,
      v: 1.1,

      COD: 2.1,

      quickV: 3.1,

      slowTime: 1.2,

      dataInfo: "dataInfo",
    });
    await history.save();
    const tem = await History.find( { time: { $gt: new Date('2021-01-26T05:17:09.889+00:00') } });
    
    res.send(tem);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }

  await db.collection('inventory').updateOne(
    { item: 'paper' },
    {
      $set: { 'size.uom': 'cm', status: 'P' },
      $currentDate: { lastModified: true }
    }
  );

})


router.all('/Historys', async (req, res) => {
  //const tracks = await History.find({ userId: req.user._id });
  try {
    var { deviceID} = req.body;
    console.log(req.body)
    const results = await History.find( { time: { $lt:  new Date(new Date().getTime()+1000*60*60*8)},deviceID }).sort( { "time": -1 } ).limit(10);
    res.send(results);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }

  //const { name, locations } = req.body;
  /*
if (!name || !locations) {
  return res
    .status(422)
    .send({ error: 'You must provide a name and locations' });
}

try {
  const History = new History({ name, locations, userId: req.user._id });
  await History.save();
  res.send(History);
} catch (err) {
  res.status(422).send({ error: err.message });
}*/
});

module.exports = router;
