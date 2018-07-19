const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:name', (req, res) => {
  const data = {
      "size": 50,
      "query": {
        "fuzzy": {
          "name": req.params.name
        }
      }
    }

  //  const data = {
  //   "query": {
  //     "regexp":{
  //       "name": req.params.name + ".*"
  //       }
  //     }
  //   } 
    
    fetch(`http://localhost:9200/_search`, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => res.send(data.hits.hits));  
})

module.exports = router;