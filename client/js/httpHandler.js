(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here

  const getRandomMovement = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      // cache: false,
      // contentType: false,
      // processData: false,
      success: (data) => {
        // reload the page
        // console.log(data.toLowerCase(), 'left')
        
        if (data) {
          SwimTeam.move(JSON.parse(data.toLowerCase()))
          setTimeout(getRandomMovement, 100);
        }
        // window.location = window.location.href;
      },
      error: () => {
        console.log('too tired to swim')
      }
    });
  }




  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        console.log('enjoy your new background')
        window.location = window.location.href;
      },
      error: () => {
        console.log('failure')
      }
    });
  };


  //ajaxFileUpload is being invoked when a proper image is selected from a client's file, on submit.
  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
    
  });

  $('.getdata').on('click', function () {
    getRandomMovement()
  })

})();
