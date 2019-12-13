const express = require('express');
const database = require('../database/db.js')
const server = express();
const port = process.env.PORT || 4444;
const AWS = require('aws-sdk');
const cors = require('cors');
const db = database.connect();
/* Load AWS configuration */
AWS.config.loadFromPath('./config/aws.json');

/* Create instance of AWS S3 */
const s3 = new AWS.S3();

/* For Parsing */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
/* Render from compiled public directory */
server.use(express.static(__dirname + '/../public'))

/* Incoming GET request to /images will return a signed URL
   for each image in AWS S3 bucket associated with the product ID.
   The database is only updated and AWS is only querried when seed
   script is run. Eventually I may make it more dynamic...  */
server.get('/images:productId', (req, res) => {
  const { productId } = req.params;
  /* Query the database for product ID */
  db.query('SELECT * FROM img WHERE productId=?',[productId], (err, data) => {
    if (err) {
      res.status(404).send()
    }
    var images = [];
    /* Get a signed url for each image */
    data.forEach(item => {
      if(item.imgKey){
        var params = {
          Key: `${item.productId}/${item.imgKey}`,
          Bucket: `${item.bucket}`
        }
        var xUrl = s3.getSignedUrl('getObject', params)
        images.push(xUrl);
      }
    });
    /* Send back array containing signed url's */
    res.send(images);
  })
})


server.listen(port, () => {
  console.log(`
  Server is listening on port ${port}
  visit http://127.0.0.1:${port}/`)
})