 let sock= new WebSocket("ws://localhost:5001"),
    infoimg = document.querySelector('.container'),
    optionObj = {
        popup: {
            div: {"class": "pop-up"},
            input: {"type":"checkbox", "name" :"onoffswitch", "class":"onoffswitch-checkbox", "id":"myonoffswitch" },
            label: {"class":"onoffswitch-label", "for":"myonoffswitch"},
            spanOne: {"class":"onoffswitch-inner"}
        }
    },
    globSetValue = {};

function clickHandler(e){
        checkPopup(); // clear popup

     let elem, 
        myIndex,
        imgContainer = document.getElementsByClassName('img-container');
        evt = e ? e:event;
        if (evt.srcElement)  elem = evt.srcElement;
        else if (evt.target) elem = evt.target;
        myIndex = findIndex(elem, imgContainer);// check index
     
        addPopup(elem, myIndex) ;// create new popup

        globSetValue.childNumber = myIndex; // store index to global obj

}

function findIndex( elem, list ) {
    let i, 
    len = list.length;

    for(i=0; i<len; i++) {
        if (list[i]===elem.parentNode) {
            return i;
        }
    }
    return -1;
}

function addPopup(obj) {
    let popupContainer = document.createElement('div');
        buttonInput =  document.createElement('input'),
        buttonLabel = document.createElement('label'),
        buttonSpanOne = document.createElement('span'),
        buttonSpanTwo = document.createElement('span');
        imgContainer = document.createElement('img'),
        takeAttr = obj.parentNode.getAttribute('data-status');
        
        // add attr from obj
        setAttr(popupContainer, optionObj.popup.div );
        setAttr(buttonInput, optionObj.popup.input );
        setAttr(buttonLabel, optionObj.popup.label );
        setAttr(buttonSpanOne, optionObj.popup.spanOne );

        buttonLabel.appendChild(buttonSpanOne);
        popupContainer.appendChild(buttonInput);
        popupContainer.appendChild(buttonLabel);
        imgContainer.setAttribute('src', obj.getAttribute('src'))
        imgContainer.setAttribute('height', 225);
        buttonSpanOne.setAttribute('data-status', takeAttr);
        popupContainer.appendChild(imgContainer);

        globSetValue.childStatus = takeAttr; // store status off/on

        buttonSpanOne.onclick = function(){
            console.log(takeAttr + ' stat');
            sock.send(JSON.stringify(globSetValue)); 
            sock.onmessage = function(event)
            {
                let checkOption = JSON.parse(event.data);   

                if(takeAttr === "off"){
                    console.log('zmiana na on');
                    takeAttr = "on"
                } else {
                    console.log('zmiana na off');
                   takeAttr = "off"
                }
                console.log(checkOption.childStatus + '<-- status');
                console.log(checkOption.childNumber + '<-- number');
                    changeStatus(takeAttr, checkOption.childNumber);
            }
        }

        return  document.querySelector('body').appendChild(popupContainer);
}


function changeStatus(status, child) {
    let parentContainer = document.getElementsByClassName("img-container")[child];
        childElem = parentContainer.getElementsByClassName("set-img")[0];
    let imgObj = {
        on:'./img/up.png',
        off: './img/down.png'
    }
    console.log(parentContainer);
    console.log('log');
    if (status ==="on") {
        console.log('off');
        parentContainer.setAttribute('data-status', "off");
         childElem.setAttribute('src', imgObj.off)
    } else {
        console.log('on');
        childElem.setAttribute('src', imgObj.on)
         parentContainer.setAttribute('data-status', "on");
    }
}


function checkPopup(){
    let classCheck = '.pop-up',
        classCounter = document.querySelectorAll(classCheck).length;

        if (classCounter > 0) {
            return (obj = document.querySelector(classCheck)) ? document.querySelector('body').removeChild(obj):false;
        }

}

infoimg.onclick=clickHandler;

function setAttr(el, options) {
    Object.keys(options).forEach(function(attr) {
        el.setAttribute(attr, options[attr]);
    });
}


