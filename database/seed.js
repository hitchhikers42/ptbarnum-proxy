const cx = require('./db.js')
const AWS = require('aws-sdk');
const mysql = require('mysql');
/* Run commands from inside js!! */
const exec = require('child_process').exec

/* Import assisting data that will attatch to
   incoming AWS Query before adding to database */
const  Data = require('./seedData.js')

/* Load AWS configuration file */
AWS.config.loadFromPath('./config/aws.json')

/* Create AWS S3 Instance */
const s3 = new AWS.S3()

/* Query AWS S3 bucket for all images */
const fetchS3Bucket = (callback) => {
  // List all objects in s3 mockbbb bucket
  s3.listObjects({ Bucket: 'mockbbb' }, (err, data) => {
    err ? callback(err)
    : callback(null, data)
  })
}

/* Seed results of AWS S3 bucket into database */
const seed = ({ Name, Contents }) => {
  const db = cx.connect();

  console.log('CONTENTS -----> ', Contents)
  Contents.forEach((image, i) => {
    let elements = image.Key.split('/');
    let imgKey = elements.pop();
    let productId = elements.join('/');
    let title = Data[productId].title;

    if(imgKey !== '') {
      db.query(
        'INSERT INTO img VALUES(?, ?, ?, ?)',
        [imgKey, productId, Name, title],
        (err, result) => {
          err ?
            console.error(err) :
            console.log(`
              Successfully added:
                ImageKey: ${imgKey}
                Product ID: ${productId}
                Bucket Name: ${Name}
                Title/Description: ${title}
              to 'img' Table in 'fec_images' Database
              Item Count = ${i+1}
              ******************************************`);
        }
      );
    }
  });
  // End the db connection gracefully to free up the console
  cx.end()
}


/* Start mysql if not already running */
const start = (callback) => {
  exec('mysql.server start',
  (err, out) => {
    err ? callback(err)
    : callback(null, out)
  })
}

/* Import schema */
const importSchema = (callback) => {
  exec('mysql -u root fec_images < ./database/fec_images.sql',
  (err, out) => {
    err ? callback(err)
    : callback(null, out)
  })
}

/* Create database if not already initially created */
const createDB = (callback) => {
  const cx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
  });

  cx.connect(err => {
    if(err) {
      console.error('ERROR CONNECTING TO DATABASE `FEC_IMAGES`')
    } else {
      cx.query('CREATE DATABASE IF NOT EXISTS fec_images', (err => {
        if(err) {
          console.error('ERROR CREATING FEC_IMAGES');
          callback(err)
        } else {
          console.log('Successfully created database fec_images!')
          cx.end();
          callback(null);
        }
      }))
    }
  });
}


/* Invoke start() and make sure each step completes before the next and ends at seed() */
start(err => {
  if(err) {
    console.error(err)
  } else {
    console.log('Successfully Started MYSQL')
    createDB(err => {
      if(err) { console.error(err) }
      else { console.log('Successfully Created Database fec_images') }


    })
  }
})


importSchema(err => {
  if(err) {
    console.error(err)
  } else {
    console.log('Successfully Imported fec_images.sql')
    fetchS3Bucket((err, data) => {
      if (err) {
        console.error(err)
      } else {
        console.log('Seeding data')
        seed(data)
      }
    })
  }
})