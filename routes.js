const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) => {
  const page = (parseInt(req.query.page, 10) || 1) || 1; // set to 1 if page is NaN
  if (page < 1) {
    // User Malformed Input
    page = 1;
  }
  axios.get(`http://jobs.github.com/positions.json?page=${page - 1}`)
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

router.get('/analytics', (req, res) => {
  const { location } = req.query;
  console.log(location);
  async function fetchAnalytics() {
    const languages = ['javascript', 'python', 'java'];
    const counts = [];
    let page = 0;
    for (let i = 0; i < languages.length; i++) {
      let count = 0;
      let page = 0;
      while (true) {
        let query = '';
        if (location) {
          query = `http://jobs.github.com/positions.json?page=${page}&description=${languages[i]}&location=${location}`;
        } else {
          query = `http://jobs.github.com/positions.json?page=${page}&description=${languages[i]}`;
        }
        const response = await axios.get(query);
        data = await response.data;
        if (data.length === 0) {
          break;
        }
        count += data.length;
        page += 1;
      }
      counts.push([languages[i], count]);
    }

    counts.sort((a, b) => {
      return b[1] - a[1];
    })
    res.render('analytics', {
      first: counts[0],
      second: counts[1],
      third: counts[2],
      location
    });
  }

  fetchAnalytics();
});

module.exports = router;
