var tWrapper = $("#toast-wrapper"), ti = 0;
var clickedImg = -1;
var materials = [

];
var corr=[[0,1,1,1],[1,0,1,1],[1,1,1,0],[1,1,0,1]];
var counter=0;
function showToast(msg, type = 0) {
    tWrapper.append(`<div id="t${ti++}" class="toast${type == 1 ? ' danger' : (type == 2 ? ' success' : '')}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="${type == 1 ? '#ff0000' : (type == 2 ? '#31a66a' : '#007aff')}" /></svg>
                    <strong class="mr-auto">Notification</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    ${msg}
            </div>
            </div>`);
    $(`#t${ti - 1}`).toast({
        delay: 5500
    });
    $(`#t${ti - 1}`).toast('show');
}
function imgClick(x) {
    if(x==0)
    {
        document.getElementById("validate_button").style.border="2px solid yellow";
        document.getElementById("validate_button1").style.border="2px solid #28a745";
        document.getElementById("validate_button2").style.border="2px solid #28a745";
        document.getElementById("validate_button3").style.border="2px solid #28a745";
    }
    else if(x==1)
    {
        document.getElementById("validate_button").style.border="2px solid #28a745";
        document.getElementById("validate_button1").style.border="2px solid yellow";
        document.getElementById("validate_button2").style.border="2px solid #28a745";
        document.getElementById("validate_button3").style.border="2px solid #28a745";
    }
    else if(x==2)
    {
        document.getElementById("validate_button").style.border="2px solid #28a745";
        document.getElementById("validate_button1").style.border="2px solid #28a745";
        document.getElementById("validate_button2").style.border="2px solid yellow";
        document.getElementById("validate_button3").style.border="2px solid #28a745";
    }
    else
    {
        document.getElementById("validate_button").style.border="2px solid #28a745";
        document.getElementById("validate_button1").style.border="2px solid #28a745";
        document.getElementById("validate_button2").style.border="2px solid #28a745";
        document.getElementById("validate_button3").style.border="2px solid yellow";
    }
    clickedImg = x;//1 red 2 green 0 blue
}
function validate() {
    if (clickedImg == -1)
    {

        showToast("Select a image first");
        if(volFlag)
        textToSpeech("Select a image first");
    }
    else if (corr[counter][clickedImg] == 0)
    {

        showToast("Correct", 2);
        if(volFlag)
        textToSpeech("Correct");
    }
    else
        {
            showToast("Wrong, try again", 1);
            if(volFlag)
            textToSpeech("Wrong, try again");
        }
}
function next() {
    if((corr[counter][clickedImg]==1)||(clickedImg==-1))
    {
        showToast("Please Complete This Task"); 
        if(volFlag)
        textToSpeech("Please Complete This Task"); 
        return;
    }
    else{
        if(counter<3)
        {
            counter++;
            if(counter==1)
            {
                clickedImg=-1;
                document.getElementById("taskIt").innerHTML="TASK 2";
                document.getElementById("diff").src="./images/imgS2.png";
                document.getElementById("validate_button").style.border="2px solid #28a745";
                document.getElementById("validate_button1").style.border="2px solid #28a745";
                document.getElementById("validate_button2").style.border="2px solid #28a745";
                document.getElementById("validate_button3").style.border="2px solid #28a745";
            }
            else if(counter==2)
            {
                clickedImg=-1;
                document.getElementById("taskIt").innerHTML="TASK 3";
                document.getElementById("diff").src="./images/imgS3.png";
                document.getElementById("validate_button").style.border="2px solid #28a745";
                document.getElementById("validate_button1").style.border="2px solid #28a745";
                document.getElementById("validate_button2").style.border="2px solid #28a745";
                document.getElementById("validate_button3").style.border="2px solid #28a745";
            }
            else if(counter==3)
            {
                document.getElementById("next_experiment").innerHTML="Simulator";
                clickedImg=-1;
                document.getElementById("taskIt").innerHTML="TASK 4";
                document.getElementById("diff").src="./images/imgS4.png";
                document.getElementById("validate_button").style.border="2px solid #28a745";
                document.getElementById("validate_button1").style.border="2px solid #28a745";
                document.getElementById("validate_button2").style.border="2px solid #28a745";
                document.getElementById("validate_button3").style.border="2px solid #28a745";
            }
        }
        else
        {
            showToast("Program Completed");
            if(volFlag)
            textToSpeech("Program Completed");
            window.location.reload(true);
            return;
        }
    }
}