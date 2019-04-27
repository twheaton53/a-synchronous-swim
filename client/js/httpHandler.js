(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here

  const getRandomMovement = () => {
    $.ajax({
      type: 'GET',
      data: 'movements',
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

  const getBackgroundImage = () => {
    $.ajax({
      type: 'GET',
      data: 'background',
      url: serverUrl,
      success: (image) => {
        if (image) {
          console.log('Got the image!')
          console.log('This is the image: ', image)
        }
        console.log('get request was successful but no image found')
      },
      error: () => {
        console.log('no image found!!!')
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
      url: serverUrl + '/background.jpg',
      cache: false,
      contentType: 'multipart/form',
      processData: false,
      success: () => {
        // reload the page
        console.log('enjoy your new background')
        window.location = window.location.href;
      },
      error: (errorMessage) => {
        console.log(errorMessage)
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
  getBackgroundImage();
})();
