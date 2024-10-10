const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`

export const DisableInputExtension = {
  name: 'DisableInput',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_disableInput' ||
    trace.payload.name === 'ext_disableInput',
  effect: ({ trace }) => {
    const { isDisabled } = trace.payload

    function disableInput() {
      const chatDiv = document.getElementById('voiceflow-chat')

      if (chatDiv) {
        const shadowRoot = chatDiv.shadowRoot
        if (shadowRoot) {
          const textareas = shadowRoot.querySelectorAll('textarea')
          for (let i = 0; i < textareas.length; i++) {
            if (textareas[i].id.includes('vf-chat-input')) {
              textareas[i].disabled = isDisabled
            }
          }
        }
      }
    }

    disableInput()
    window.voiceflow.chat.interact({
      type: 'complete',
    })
  },
}

// FeedbackFormExtension displays a form to collect user feedback when they click the thumbs down button.
// Users can submit their feedback or skip without submitting.
export const FeedbackFormExtension = {
  // Name of the extension
  name: 'FeedbackForm',
  // Type of the extension
  type: 'response',
  // Match function to determine when to render this extension
  match: ({ trace }) =>
    trace.type === 'ext_feedback_form' || trace.payload.name === 'ext_feedback_form',
  // Render function to display the form
  render: ({ trace, element }) => {
    // Create a container div for the form and close button
    const formContainer = document.createElement('div');
    formContainer.classList.add('feedback-form-container');

    // Set the inner HTML of the container, including styles, form elements, and the close button
    formContainer.innerHTML = `
      <style>
        /* Styles for the feedback form */
        .feedback-form-container {
          background-color: transparent; /* Make background transparent */
          max-width: 300px;
          width: 100%; /* Take full width */
          margin: 0 auto;
          /* padding: 25px 10px 10px; /* Increase top padding to make room for close button */
          border-radius: 5px;
          position: relative; /* For positioning the close button */
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; /* Use the same font */
        }
        .feedback-form-container h3 {
          margin-top: 0;
          font-size: 1em;
          color: #333;
        }
        .feedback-form-container textarea {
          width: 100%;
          height: 80px;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 5px;
          resize: vertical;
          font-family: inherit; /* Use the same font */
          display: block;
          margin: 0 auto; /* Center the textarea */
        }
        .feedback-form-container .button-group {
          display: flex;
          justify-content: space-between;
          gap: 2%; /* Space between buttons */
          margin-top: 10px;
        }
        .feedback-form-container .submit, .feedback-form-container .skip {
          border: none;
          color: white;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          font-family: inherit; /* Use the same font */
          transition: background-color 0.3s, color 0.3s; /* Smooth hover transition */
        }
        .feedback-form-container .submit {
          background: #00705d;
          flex: 0 0 75%; /* Take 75% of available width */
        }
        .feedback-form-container .submit:hover {
          background: #00564a; /* Darker shade on hover */
        }
        .feedback-form-container .skip {
          background: #ccc;
          color: #333;
          flex: 0 0 25%; /* Take 25% of available width */
        }
        .feedback-form-container .skip:hover {
          background: #999; /* Darker gray on hover */
          color: #fff; /* Change text color to white on hover */
        }
        .feedback-form-container .close-button {
          position: absolute;
          top: 0;
          right: 0;
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #aaa;
          font-family: inherit; /* Use the same font */
        }
        .feedback-form-container .close-button:hover {
          color: #333;
        }
        /* Override existing message styles to make background transparent and remove bubble */
        .vfrc-message--extension-FeedbackForm {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
          max-width: none !important;
        }
      </style>
      <!-- Close button -->
      <button class="close-button" aria-label="Close">&times;</button>
      <!-- Form heading -->
      <h3>Please tell us why you're unsatisfied:</h3>
      <!-- Feedback input -->
      <textarea class="feedback-input" placeholder="Your feedback..."></textarea>
      <!-- Buttons -->
      <div class="button-group">
        <button class="submit">Submit Feedback</button>
        <button class="skip">Skip</button>
      </div>
    `;

    // Get references to the close button, submit button, skip button, and feedback input
    const closeButton = formContainer.querySelector('.close-button');
    const submitButton = formContainer.querySelector('.submit');
    const skipButton = formContainer.querySelector('.skip');
    const feedbackInput = formContainer.querySelector('.feedback-input');

    // Event listener for the close button to close the form without submitting feedback
    closeButton.addEventListener('click', function () {
      // Remove the form from the chat widget
      formContainer.remove();

      // Send a 'complete' interaction without payload to proceed to the next step
      window.voiceflow.chat.interact({
        type: 'complete',
      });
    });

    // Event listener for the skip button to close the form without submitting feedback
    skipButton.addEventListener('click', function () {
      // Remove the form from the chat widget
      formContainer.remove();

      // Send a 'complete' interaction without payload to proceed to the next step
      window.voiceflow.chat.interact({
        type: 'complete',
      });
    });

    // Event listener for the submit button to submit the feedback
    submitButton.addEventListener('click', function () {
      // Get the feedback text
      const feedback = feedbackInput.value.trim();

      if (!feedback) {
        // If feedback is empty, alert the user or prevent submission
        alert('Please enter your feedback before submitting.');
        return;
      }

      // Remove the form from the chat widget
      formContainer.remove();

      // Send the feedback back to Voiceflow as a 'complete' interaction with payload
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { feedback: feedback },
      });
    });

    // Append the form container to the chat widget element
    element.appendChild(formContainer);
  },
};

export const MapExtension = {
  name: 'Maps',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_map' || trace.payload.name === 'ext_map',
  render: ({ trace, element }) => {
    const GoogleMap = document.createElement('iframe')
    const { apiKey, origin, destination, zoom, height, width } = trace.payload

    GoogleMap.width = width || '240'
    GoogleMap.height = height || '240'
    GoogleMap.style.border = '0'
    GoogleMap.loading = 'lazy'
    GoogleMap.allowFullscreen = true
    GoogleMap.src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&zoom=${zoom}`

    element.appendChild(GoogleMap)
  },
}

export const VideoExtension = {
  name: 'Video',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_video' || trace.payload.name === 'ext_video',
  render: ({ trace, element }) => {
    const videoElement = document.createElement('video')
    const { videoURL, autoplay, controls } = trace.payload

    videoElement.width = 240
    videoElement.src = videoURL

    if (autoplay) {
      videoElement.setAttribute('autoplay', '')
    }
    if (controls) {
      videoElement.setAttribute('controls', '')
    }

    videoElement.addEventListener('ended', function () {
      window.voiceflow.chat.interact({ type: 'complete' })
    })
    element.appendChild(videoElement)
  },
}

export const TimerExtension = {
  name: 'Timer',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_timer' || trace.payload.name === 'ext_timer',
  render: ({ trace, element }) => {
    const { duration } = trace.payload || 5
    let timeLeft = duration

    const timerContainer = document.createElement('div')
    timerContainer.innerHTML = `<p>Time left: <span id="time">${timeLeft}</span></p>`

    const countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown)
        window.voiceflow.chat.interact({ type: 'complete' })
      } else {
        timeLeft -= 1
        timerContainer.querySelector('#time').textContent = timeLeft
      }
    }, 1000)

    element.appendChild(timerContainer)
  },
}

export const FileUploadExtension = {
  name: 'FileUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_fileUpload' || trace.payload.name === 'ext_fileUpload',
  render: ({ trace, element }) => {
    const fileUploadContainer = document.createElement('div')
    fileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' style='display: none;'>
    `

    const fileInput = fileUploadContainer.querySelector('input[type=file]')
    const fileUploadBox = fileUploadContainer.querySelector('.my-file-upload')

    fileUploadBox.addEventListener('click', function () {
      fileInput.click()
    })

    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0]
      console.log('File selected:', file)

      fileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`

      var data = new FormData()
      data.append('file', file)

      fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Upload failed: ' + response.statusText)
          }
        })
        .then((result) => {
          fileUploadContainer.innerHTML =
            '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">'
          console.log('File uploaded:', result.data.url)
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: {
              file: result.data.url.replace(
                'https://tmpfiles.org/',
                'https://tmpfiles.org/dl/'
              ),
            },
          })
        })
        .catch((error) => {
          console.error(error)
          fileUploadContainer.innerHTML = '<div>Error during upload</div>'
        })
    })

    element.appendChild(fileUploadContainer)
  },
}

export const KBUploadExtension = {
  name: 'KBUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_KBUpload' || trace.payload.name === 'ext_KBUpload',
  render: ({ trace, element }) => {
    const apiKey = trace.payload.apiKey || null
    const maxChunkSize = trace.payload.maxChunkSize || 1000
    const tags = `tags=${JSON.stringify(trace.payload.tags)}&` || ''
    const overwrite = trace.payload.overwrite || false

    if (apiKey) {
      const kbfileUploadContainer = document.createElement('div')
      kbfileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' accept='.txt,.text,.pdf,.docx' style='display: none;'>
    `

      const fileInput = kbfileUploadContainer.querySelector('input[type=file]')
      const fileUploadBox =
        kbfileUploadContainer.querySelector('.my-file-upload')

      fileUploadBox.addEventListener('click', function () {
        fileInput.click()
      })

      fileInput.addEventListener('change', function () {
        const file = fileInput.files[0]

        kbfileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`

        const formData = new FormData()
        formData.append('file', file)

        fetch(
          `https://api.voiceflow.com/v3alpha/knowledge-base/docs/upload?${tags}overwrite=${overwrite}&maxChunkSize=${maxChunkSize}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: apiKey,
            },
            body: formData,
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('Upload failed: ' + response.statusText)
              window.voiceflow.chat.interact({
                type: 'error',
                payload: {
                  id: 0,
                },
              })
            }
          })
          .then((result) => {
            kbfileUploadContainer.innerHTML =
              '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">'
            window.voiceflow.chat.interact({
              type: 'complete',
              payload: {
                id: result.data.documentID || 0,
              },
            })
          })
          .catch((error) => {
            console.error(error)
            kbfileUploadContainer.innerHTML = '<div>Error during upload</div>'
          })
      })
      element.appendChild(kbfileUploadContainer)
    }
  },
}

export const DateExtension = {
  name: 'Date',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_date' || trace.payload.name === 'ext_date',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')

    // Get current date and time
    let currentDate = new Date()
    let minDate = new Date()
    minDate.setMonth(currentDate.getMonth() - 1)
    let maxDate = new Date()
    maxDate.setMonth(currentDate.getMonth() + 2)

    // Convert to ISO string and remove seconds and milliseconds
    let minDateString = minDate.toISOString().slice(0, 16)
    let maxDateString = maxDate.toISOString().slice(0, 16)

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                border: none;
                background: transparent;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                bottom: 0;
                outline: none;
                color: transparent;
                cursor: pointer;
                height: auto;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                width: auto;
                padding:6px;
                font: normal 8px sans-serif;
            }
            .meeting input{
              background: transparent;
              border: none;
              padding: 2px;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              font: normal 14px sans-serif;
              outline:none;
              margin: 5px 0;
              &:focus{outline:none;}
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
              opacity: 0.3;
            }
            .submit:enabled {
              opacity: 1; /* Make the button fully opaque when it's enabled */
            }
          </style>
          <label for="date">Select your date/time</label><br>
          <div class="meeting"><input type="datetime-local" id="meeting" name="meeting" value="" min="${minDateString}" max="${maxDateString}" /></div><br>
          <input type="submit" id="submit" class="submit" value="Submit" disabled="disabled">
          `

    const submitButton = formContainer.querySelector('#submit')
    const datetimeInput = formContainer.querySelector('#meeting')

    datetimeInput.addEventListener('input', function () {
      if (this.value) {
        submitButton.disabled = false
      } else {
        submitButton.disabled = true
      }
    })
    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()

      const datetime = datetimeInput.value
      console.log(datetime)
      let [date, time] = datetime.split('T')

      formContainer.querySelector('.submit').remove()

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { date: date, time: time },
      })
    })
    element.appendChild(formContainer)
  },
}

export const ConfettiExtension = {
  name: 'Confetti',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_confetti' || trace.payload.name === 'ext_confetti',
  effect: ({ trace }) => {
    const canvas = document.querySelector('#confetti-canvas')

    var myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })
    myConfetti({
      particleCount: 200,
      spread: 160,
    })
  },
}

export const FeedbackExtension = {
  name: 'Feedback',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_feedback' || trace.payload.name === 'ext_feedback',
  render: ({ trace, element }) => {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('vfrc-feedback-container'); // Unique class

    feedbackContainer.innerHTML = `
      <style>
        /* Scoped Styles for Feedback Form */
        .vfrc-feedback-container {
          background-color: #ffffff; /* White background */
          max-width: 300px;
          margin: 0 auto; /* Center the container, remove vertical margins */
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0; /* Remove padding to eliminate gaps */
        }

        /* Arrange text and buttons on the same line */
        .vfrc-feedback {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px; /* Adjust space between text and buttons if needed */
        }

        /* Adjusted font size to be smaller */
        .vfrc-feedback--description {
          font-size: 0.8em; /* Reduced font size */
          color: #333;
          text-align: center;
          margin: 0; /* Remove margins to eliminate gaps */
        }

        .vfrc-feedback--buttons {
          display: flex;
          justify-content: center;
          gap: 5px; /* Adjust space between buttons */
        }

        .vfrc-feedback--button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px; /* Reduced padding for smaller icons */
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .vfrc-feedback--button:hover {
          opacity: 1;
        }

        .vfrc-feedback--button.selected {
          opacity: 1;
        }

        .vfrc-feedback--button.disabled {
          cursor: not-allowed;
          opacity: 0.3;
        }

        .vfrc-feedback--button svg {
          width: 16px; /* Smaller size */
          height: 16px;
          color: #2e6ee1; /* Icon color */
        }

        /* Rotate the thumb down icon by 180 degrees */
        .vfrc-feedback--button[data-feedback="I want to leave negative feedback"] svg {
          transform: rotate(180deg);
        }

        /* Override existing message styles to remove gaps */
        .vfrc-message--extension-Feedback {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important; /* Remove margins to eliminate gaps */
          padding: 0 !important; /* Remove padding */
          max-width: none !important;
        }
      </style>
      <div class="vfrc-feedback">
        <div class="vfrc-feedback--description">Was this helpful?</div>
        <div class="vfrc-feedback--buttons">
          <button class="vfrc-feedback--button" data-feedback="I want to leave positive feedback" aria-label="Thumbs Up">${SVG_Thumb}</button>
          <button class="vfrc-feedback--button" data-feedback="I want to leave negative feedback" aria-label="Thumbs Down">${SVG_Thumb}</button>
        </div>
      </div>
    `;

    // Add event listeners to feedback buttons
    feedbackContainer
      .querySelectorAll('.vfrc-feedback--button')
      .forEach((button) => {
        button.addEventListener('click', function () {
          const feedback = this.getAttribute('data-feedback');
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: { feedback: feedback },
          });

          // Update all feedback messages to say "Thank you for your feedback!"
          document.querySelectorAll('.vfrc-feedback-container').forEach((container) => {
            container.innerHTML = `
              <div class="vfrc-feedback">
                <div class="vfrc-feedback--thank-you">Thank you for your feedback!</div>
              </div>
            `;
          });
        });
      });


    // Append the feedback container
    element.appendChild(feedbackContainer);
  },
};
