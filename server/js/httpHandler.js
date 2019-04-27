const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue.js')
// const defaultPic = require('../spec/water-lg.multipart')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////




module.exports.router = (req, res, next = ()=>{}) => {

  // write code to handle requests

  if (req.method === 'GET' && req.url === '/background.jpg') {
    console.log('did you want a background?')
    let { backgroundImageFile } = module.exports;
    


    fs.readFile(backgroundImageFile, (error, results) => {
      if (error) {
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.write(results)
        res.end();
      }
    });
  }

  if (req.method === 'GET' && req.url === '/?movements') {
    res.writeHead(200, headers);
    res.end(JSON.stringify(messageQueue.dequeue()))
  }


  // post request for swim moves
  if (req.method === 'POST') {
    if (req.url === '/background.jpg') {
      console.log('are you trying to upload a background?')
      let imageData = Buffer.alloc(0);
      req.on('data', (chunk) => {
        imageData = Buffer.concat([imageData, chunk]);
      });
      req.on('end', () => {
        console.log('about to finish uploading bg')
        const file = multipart.getFile(imageData);
        let { backgroundImageFile } = module.exports;
        fs.writeFile(backgroundImageFile, file.data, (err) => {
          if (err) {
            response.writeHead(400, headers);
            res.end();
          } else {
            res.writeHead(201, headers);
            res.end();
          }
        })
      })
    } else {
      let body = [];
      req.on('error', (err) => {
        console.error(err);
      }).on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        messageQueue.enqueue(body)
      })
    }
    console.log(req.url)
  }


 // future post request for image upload
  if (req.method === 'POST') {
    let body = [];
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      // messageQueue.enqueue(body)
      JSON.stringify(body)
    })
  }

  
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end()
  }

  // else if (req.method === 'POST') {
  //   let bg = module.exports.backgroundImageFile;
  //   console.log(bg)
  // }
  // console.log(res)
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // res.writeHead(200, headers);
  // res.end();
};
