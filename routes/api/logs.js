const express = require('express');
const router = express.Router();
const Log = require('../../model/Log');

// @route           GET api/log/all
// @description     Get all log
// access:          public
router.get('/all', async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    console.error(error.message);
    return res.send('Server Error');
  }
});

// @route           GET api/log/:log_id
// @description     Get 1 log
// access:          public
router.get('/:log_id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.log_id);
    if (!log) {
      res.send('Not founded');
    } else {
      res.json(log);
    }
  } catch (error) {
    console.error(error.message);
    return res.send('Server Error');
  }
});

// @route           POST api/log
// @description     Add new log
// access:          public
router.post('/', async (req, res) => {
  try {
    const newLog = req.body;
    let log = new Log(newLog);
    log = await log.save();
    return res.json(log);
  } catch (error) {
    console.error(error.message);
    return res.send('Server Error');
  }
});

// @route           put api/log/:log_id
// @description     Edit a log
// access:          public
router.put('/:log_id', async (req, res) => {
  try {
    const newLog = req.body;
    let log = await Log.findByIdAndUpdate(req.params.log_id, newLog, {
      useFindAndModify: false,
    });
    await log.save();
    return res.json(log);
  } catch (error) {
    console.error(error.message);
    return res.send('Server Error');
  }
});

// @route           DEL api/log/:log_id
// @description     Edit a log
// access:          public
router.delete('/:log_id', async (req, res) => {
  try {
    let log = await Log.findById(req.params.log_id);
    if (log) {
      await log.remove();
      return res.json('Delete success !');
    } else {
      return res.json('Not founded');
    }
  } catch (error) {
    console.error(error.message);
    return res.send('Server Error');
  }
});

module.exports = router;
