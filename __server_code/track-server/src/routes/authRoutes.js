const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.get('/test', (req, res) => {
  res.send("123test");
});

router.all('/phoneInfo',(req,res)=>{
  console.log(req);
  res.status(200).send("phoneInfo");
})

router.post('/signup', async (req, res) => {
  const { username, password ,pid,pType} = req.body;
  console.log(username, password ,pid,pType)

  try {
    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.all('/signin', async (req, res) => {
  const { username, password ,pid,pType} = req.body;
  
  if (!username || !password) {
    username = req.query.username;
    password = req.query.password;
  }
  console.log(username, password ,pid,pType)
  if (!username || !password) {
    return res.status(422).send({ error: 'Must provide username and password' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or username' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or username' });
  }
});

module.exports = router;
