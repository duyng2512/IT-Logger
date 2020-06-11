const express = require('express');
const router = express.Router();
const Technician = require('../../model/Tech');

// @route           GET api/log/all
// @description     Get all log
// access:          public
router.get('/all', async (req, res) => {
  try {
    const techs = await Technician.find().sort({ date: -1 });
    res.json(techs);
  } catch (error) {
    console.error(error.message);
    return res.send('Server Error');
  }
});

// @route           GET api/log/:log_id
// @description     Get 1 log
// access:          public
router.get('/:tech_id', async (req, res) => {
  try {
    const tech = await Technician.findById(req.params.tech_id);
    if (!tech) {
      res.send('Not founded');
    } else {
      res.json(tech);
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
    const newTech = req.body;
    let tech = new Technician(newTech);
    tech = await tech.save();
    return res.json(tech);
  } catch (error) {
    console.error(error.message);
    return res.send('Server Error');
  }
});

// @route           DEL api/tech/:log_id
// @description     delete a technician
// access:          public
router.delete('/:tech_id', async (req, res) => {
  try {
    let tech = await Technician.findById(req.params.tech_id);
    if (tech) {
      await tech.remove();
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
