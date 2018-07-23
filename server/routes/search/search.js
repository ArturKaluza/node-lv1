const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:type/:name', (req, res) => {
  // const data = {
  //     "size": 50,
  //     "query": {
  //       "fuzzy": {
  //         "name": req.params.name
  //       },
  //     }
  //   }

  // filtered type
  const data = {
    size: 20,
    query:{
      bool:{
        must:{
          match:{
            name: {
              query: req.params.name,
                fuzziness: 1
                }
             }
           }, 
           filter:{
            term:{
              itemType: req.params.type
         }
       }
      },
     
    }
  }
  
  // searching part of word
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

// searching all items
router.get('/:name', (req, res) => {
  const data = {
      "size": 50,
      "query": {
        "fuzzy": {
          "name": req.params.name
        },
      }
    }
    
    fetch(`http://localhost:9200/_search`, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => res.send(data.hits.hits));  
    //  .then(doc => res.send(doc));
})

module.exports = router;