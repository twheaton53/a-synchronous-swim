const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue.js')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////




module.exports.router = (req, res, next = ()=>{}) => {

  // write code to handle requests
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(JSON.stringify(messageQueue.dequeue()))
    // while (messageQueue.messages.length > 0) {
    //   messageQueue.dequeue()
    // }
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
