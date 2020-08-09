var text;
//add disabled class

function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

    const typeSpeed = 100;
    var timerId, typeTarget = $("#typer");
    function type(txt, cur = 0) {
        if (cur == txt.length) {
            timerId = -1;
            return;
        }
        if (txt.charAt(cur) == "@") {
            var br = document.createElement('br');
            typeTarget.append(br);
        }
        else
            typeTarget.append(txt.charAt(cur));
        timerId = setTimeout(type, typeSpeed, txt, cur + 1);
    }
    // type("this is test")
    type("1. Switch on the machine by clicking on power on button@2. Click on load sample to load the sample into the machine@3. Click on any region in the image@4. Click on execute to get the output image");


//toast
var tWrapper = $("#toast-wrapper"), ti = 0;
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

var volFlag=1;
$("#vol").click(function(){
    if(volFlag){
        volFlag=0;
        $("#vol").removeClass("fa fa-volume-up");
        $("#vol").addClass("fa fa-volume-mute");
    }
    else{
        volFlag=1;
        $("#vol").removeClass("fa fa-volume-mute");
        $("#vol").addClass("fa fa-volume-up");
    }
});

//text to speech

// list of languages is probably not loaded, wait for it
if (window.speechSynthesis.getVoices().length != 0) {
    window.speechSynthesis.addEventListener('voiceschanged', function () {
        textToSpeech(text);
    });
}

function textToSpeech(text) {
    // get all voices that browser offers
    var available_voices = window.speechSynthesis.getVoices();

    // this will hold an english voice
    var english_voice = '';

    // find voice by language locale "en-US"
    // if not then select the first voice
    for (var i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if (english_voice === '')
        english_voice = available_voices[0];

    // new SpeechSynthesisUtterance object
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = text;
    utter.voice = english_voice;


    // speak
    window.speechSynthesis.speak(utter);
}
var mulFactor,mulFactorH;
$(document).ready(function(){
    img = document.createElement('img');
    $(window).resize(function(){
        mulFactor=parseFloat(parseFloat(img.width)/578);
        mulFactorH=parseFloat(parseFloat(img.height)/578);
        console.log("Mulfactor",mulFactor,mulFactorH);
        document.getElementById("myCanvas").height = img.height;
        document.getElementById("myCanvas").width = img.width;
    });
  });
var img;
var temp=0;
var materialButton = 0;
addClass(document.getElementById("exec"), "out");
document.getElementById("exec").disabled = true;
addClass(document.getElementById("load"), "out");
document.getElementById("load").disabled = true;
addClass(document.getElementById("material1"), "out");
document.getElementById("material1").disabled = true;
addClass(document.getElementById("setav"), "out");
document.getElementById("setav").disabled = true;

document.getElementById("material1").onclick = function () {
    addClass(document.getElementById("material1"), "out");
    document.getElementById("material1").disabled = true;
    materialButton = 1;
    showToast("Now click on Load button to load sample");
    if (volFlag)
        textToSpeech("Now click on Load button to load sample");
    
    if(machineState){
        removeClass(document.getElementById("load"), "out");
        document.getElementById("load").disabled = false;
    }
}

var machineState = false;

function changeClass(mode){
    if(mode){
        $("#avslider").slider("option", "disabled", false);
        removeClass(document.getElementById("setav"), "out");
        document.getElementById("setav").disabled = false;
    } else {
        addClass(document.getElementById("material1"), "out");
        document.getElementById("material1").disabled = true;
        addClass(document.getElementById("load"), "out");
        document.getElementById("load").disabled = true;
        addClass(document.getElementById("exec"), "out");
        document.getElementById("exec").disabled = true;
        $("#avslider").slider("option", "disabled", true);
        addClass(document.getElementById("setav"), "out");
        document.getElementById("setav").disabled = true;
    }
}
document.getElementById("switchOn").onclick = function(){
    if(machineState){
        $("#switchOn").addClass("green");
        $("#switchOn").html(`SWITCH ON`);
        $("#switchOn").removeClass("red");
        machineState = false;
        showToast("Machine is switched off");
        if(volFlag)
        textToSpeech("Machine is switched off");
    } else {
        $("#switchOn").addClass("red");
        $("#switchOn").html(`SWITCH OFF`);
        $("#switchOn").removeClass("green");
        machineState = true;
        showToast("Machine is switched on");
        if(volFlag)
        textToSpeech("Machine is switched on");
    }
    changeClass(machineState);
}
var av;
$("#setav").click(function () {
    av = $("#avslider").slider("option", "value");
    if(av || av == 0){
        removeClass(document.getElementById("material1"), "out");
        document.getElementById("material1").disabled = false;
        $("#avslider").slider("option", "disabled", true);
        addClass(document.getElementById("setav"), "out");
        document.getElementById("setav").disabled = true;
        showToast("Accelerating voltage has been set");
        if(volFlag)
        textToSpeech("Accelerating voltage has been set");
    }
  });


document.getElementById("load").onclick = function () {
    var opt = materialButton;
    img.onload = () => {   
    img.height="500";
        mulFactor=parseFloat(parseFloat(img.width)/578);
        mulFactorH=parseFloat(parseFloat(img.height)/578);
        document.getElementById("myCanvas").height = img.height;
        document.getElementById("myCanvas").width = img.width;
    };
    img.id = "img1";
    if (opt == 1) {
        document.getElementById("myCanvas").style.display = "block";
        img.src = "./images/wood.png";
    }
    else if (opt == 2) {
        document.getElementById("myCanvas").style.display = "block";
        img.src = "./images/1.png";
    }
    else if (opt == 3) {
        document.getElementById("myCanvas").style.display = "block";
        img.src = "./images/2.png";
    }
    else if (opt == 0) {
        showToast("Please Select The Sample");
        if(volFlag)
        textToSpeech("Please Select The Sample");
        document.getElementById("myCanvas").display="none";
        return;
    }
    if (opt != 0) {
        showToast("Now Select The Area");
        if(volFlag)
        textToSpeech("Now Select The Area");
        addClass(document.getElementById("load"), "out");
        document.getElementById("load").disabled = true;
        removeClass(document.getElementById("exec"), "out");
        document.getElementById("exec").disabled = false;
    }
    document.getElementById('imgSeen').appendChild(img);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
//put this outside the event loop..
var polygon1 = [[49.5999755859375,571.4000015258789],[43.5999755859375,549.4000015258789],[62.5999755859375,530.4000015258789],[77.5999755859375,503.4000015258789],[85.5999755859375,477.4000015258789],[108.5999755859375,456.4000015258789],[135.5999755859375,431.4000015258789],[149.5999755859375,413.4000015258789],[161.5999755859375,430.4000015258789],[170.5999755859375,446.4000015258789],[179.5999755859375,461.4000015258789],[185.5999755859375,477.4000015258789],[195.5999755859375,492.4000015258789],[206.5999755859375,514.4000015258789],[206.5999755859375,536.4000015258789],[216.5999755859375,555.4000015258789],[230.5999755859375,571.4000015258789]];
var polygon2=[[353.5999755859375,21.400001525878906],[329.5999755859375,43.400001525878906],[301.5999755859375,71.4000015258789],[276.5999755859375,107.4000015258789],[261.5999755859375,137.4000015258789],[251.5999755859375,175.4000015258789],[249.5999755859375,207.4000015258789],[244.5999755859375,246.4000015258789],[238.5999755859375,294.4000015258789],[235.5999755859375,338.4000015258789],[225.5999755859375,387.4000015258789],[229.5999755859375,431.4000015258789],[251.5999755859375,470.4000015258789],[281.5999755859375,504.4000015258789],[308.5999755859375,537.4000015258789],[335.5999755859375,570.4000015258789],[570.5999755859375,569.4000015258789],[570.5999755859375,1.4000015258789062],[374.5999755859375,-0.5999984741210938]];
var polygon3=[[48.5999755859375,571.4000015258789],[42.5999755859375,547.4000015258789],[62.5999755859375,528.4000015258789],[76.5999755859375,501.4000015258789],[85.5999755859375,475.4000015258789],[135.5999755859375,429.4000015258789],[148.5999755859375,411.4000015258789],[174.5999755859375,383.4000015258789],[179.5999755859375,354.4000015258789],[181.5999755859375,325.4000015258789],[182.5999755859375,275.4000015258789],[186.5999755859375,221.4000015258789],[203.5999755859375,170.4000015258789],[224.5999755859375,119.4000015258789],[242.5999755859375,87.4000015258789],[267.5999755859375,45.400001525878906],[294.5999755859375,9.400001525878906],[301.5999755859375,1.4000015258789062],[1.5999755859375,-0.5999984741210938],[2.5999755859375,568.4000015258789]];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var flag = 0;
var tempPos;
function draw(evt) {
    if (temp == 1) {
        showToast("Only One Point can be Made");
        if(volFlag)
        textToSpeech("Only One Point can be Made");
        return;
    }
    else{
        showToast("Now Click The Execute Button To Show the pattern");
        if(volFlag)
        textToSpeech("Now Click The Execute Button To Show the pattern");
        temp = 1;
        var pos = getMousePos(canvas, evt);
        tempPos=pos;
        console.log(pos);
        ctx.beginPath();
        ctx.fillStyle = "#fa0505";
        ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        addClass(canvas,"out1");
    }
}
function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0]*mulFactor, yi = vs[i][1]*mulFactorH;
        var xj = vs[j][0]*mulFactor, yj = vs[j][1]*mulFactorH;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    console.log(inside);

    return inside;
}
  

document.getElementById("exec").onclick=function(){
    if(temp==0)
    {
        showToast("Please Make The Area");
        if(volFlag)
        textToSpeech("Please Make The Area");
        return;
    }
    else
    {
        addClass(document.getElementById("exec"), "out");
        document.getElementById("exec").disabled = true;
        document.getElementById("ptask").style.display="block";
        if(inside([tempPos.x,tempPos.y], polygon1))
        {
            showToast("No Diffraction Pattern");
            if(volFlag)
            textToSpeech("No Diffraction Pattern");
        }
        else if(inside([tempPos.x,tempPos.y], polygon2))
        {
            showToast("Crystalline");
            if(volFlag)
            textToSpeech("Crystalline");
            img.src="./images/crystalline.png";
        }
        else if(inside([tempPos.x,tempPos.y], polygon3))
        {
            img.src="./images/amorphous.png";
            if(volFlag)
            textToSpeech("Amorphous");
            showToast("Amorphous");
        }
        else
        {   
            img.src="./images/mid.png";
            if(volFlag)
            textToSpeech("Mid");
            showToast("Mid");
        }
        setTimeout(function(){
            showToast("Program Task is now activated",2);
            if(volFlag)
            textToSpeech("Program Task is now activated");
        },2000);
    }
}

document.getElementById("res").onclick=function(){
    window.location.reload(true);
}

document.getElementById("ptask").onclick=function(){
    document.getElementById("container1").style.display="block";
    document.getElementById("container2").style.display="none";
}