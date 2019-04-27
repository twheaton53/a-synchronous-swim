const storeClientMovements = (keystroke) => {
  $.ajax({
    type: 'POST',
    data: keystroke,
    url: 'http://127.0.0.1:3000/',
    cache: false,
    contentType: false,
    processData: false,
    success: () => {
      console.log(`posting ${keystroke} onto the server`)
    },
    error: () => {
      console.log('failure')
    }
  });
}


$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    // SwimTeam.move(direction.toLowerCase());
    //a function that sends an ajax request to post key movements onto the server 
    storeClientMovements(direction.toLowerCase())
  }
});

console.log('Client is running in the browser!');
