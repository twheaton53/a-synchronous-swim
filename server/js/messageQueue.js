const messages = []; // the storage unit for messages

module.exports.messages = messages;

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  console.log(messages)
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  console.log('emptying messages!')
  return messages.shift();
};