const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) => {
  const page = (parseInt(req.query.page, 10) || 1) || 1; // set to 1 if page is NaN
  if (page < 1) {
    // User Malformed Input
    page = 1;
  }
  axios.get(`http://jobs.github.com/positions.json?page=${page}`)
    .then(function(response) {
      // response.data is 50 jobs response.data[0] is first job
      res.render('index', { response, page });
    })
    .catch(function(error) {
      console.log(error);
    });
});

router.get('/individual', (req, res) => {
  const { id } = req.query;
  axios.get(`http://jobs.github.com/positions/${id}.json`)
    .then(function(response) {
      res.render('individual', { response: response.data })
    })
    .catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
