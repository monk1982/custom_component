/**
* The component's render function. This will be called immediately after
* the component is initially loaded, and then again every time the
* component gets new data from Python.
**/
function getMobileOS(){
    const ua = navigator.userAgent;

    if (/android/i.test(ua)) {
        return "Android";
    } else if (/iPad|iPhone|iPod/.test(ua) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return "iOS";
    } else {
        return "Other";
    }
}

function handleClick() {
    const sound = document.getElementById("cameraSound");
    sound.play();
    alert("Bạn đã click vào nút!");
}

let currentFacingMode = "environment";

function takePicture() {
    let context = canvas.getContext('2d');
    width = video.srcObject.getVideoTracks()[0].getSettings().width;
    height = video.srcObject.getVideoTracks()[0].getSettings().height;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);      
    var data = canvas.toDataURL('image/png');            
    // sendValue(data);
    Streamlit.setComponentValue(data);              
}

function changefacingMode(){
    if (currentFacingMode == "environment"){
        currentFacingMode ="user"
    }else {
        currentFacingMode ="environment"
    }    
    alert(currentFacingMode)
    onRender(currentFacingMode)
}

function onRender(event,currentFacingMode) {
    // Only run the render code the first time the component is loaded.
    if (!window.rendered) {
        // You most likely want to get the data passed in like this
        var { height, width } = event.detail.args;
            
        let video = document.getElementById('video');
        let canvas = document.getElementById('canvas');        

        video.setAttribute('width', '100%');
        video.setAttribute('height', 'auto');

        // Check os to add playsinline
        if (getMobileOS()=='iOS'){
            video.setAttribute('playsinline', '');                
        }                        

        const constraints =  { facingMode: currentFacingMode, advanced : [{focusMode: "continuous"}]}; // 'environment' hoặc 'user' cho camera trước
        /*navigator.permissions.query({ name: 'camera' }).then((result) => {
            console.log(result.state); // 'granted', 'denied', or 'prompt'
        });*/
        navigator.mediaDevices.getUserMedia({ video: constraints })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });              
        
        Streamlit.setFrameHeight(height);
        
        //video.addEventListener('click', takePicture);
        window.rendered = true
    }
}
  
// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()
// Don't actually need to display anything, so set the height to 0
Streamlit.setFrameHeight(0)
  