 let sock= new WebSocket("ws://localhost:5001"),
                info = document.getElementById('info');

           sock.onmessage = function(event){
                console.log(event.data)
                info.innerHTML = event.data;
            }

            document.querySelector('button').onclick = function() {
                const text = document.getElementById('text').value;
                sock.send(text);
            }
let infoimg = document.querySelector('.container'),
    optionObj = {
        popup: {
            div: {"class": "pop-up"},
            input: {"type":"checkbox", "name" :"onoffswitch", "class":"onoffswitch-checkbox", "id":"myonoffswitch" },
            label: {"class":"onoffswitch-label", "for":"myonoffswitch"},
            spanOne: {"class":"onoffswitch-inner"}
        }
    }

function clickHandler(e){
        checkPopup();
     let elem, 
        myIndex,
        imgContainer = document.getElementsByClassName('img-container');
        evt = e ? e:event;
        if (evt.srcElement)  elem = evt.srcElement;
        else if (evt.target) elem = evt.target;
        myIndex = findIndex(elem, imgContainer);
     
        addPopup(elem, myIndex) ;
}

function findIndex( elem, list ) {
    var i, 
    len = list.length;

    for(i=0; i<len; i++) {
        if (list[i]===elem.parentNode) {
            return i;
        }
    }
    return -1;
}

function addPopup(obj, index) {
    let popupContainer = document.createElement('div');
        buttonInput =  document.createElement('input'),
        buttonLabel = document.createElement('label'),
        buttonSpanOne = document.createElement('span'),
        buttonSpanTwo = document.createElement('span');
        imgContainer = document.createElement('img');

        setAttr(popupContainer, optionObj.popup.div );
        setAttr(buttonInput, optionObj.popup.input );
        setAttr(buttonLabel, optionObj.popup.label );
        setAttr(buttonSpanOne, optionObj.popup.spanOne );

        buttonLabel.appendChild(buttonSpanOne);
        popupContainer.appendChild(buttonInput);
        popupContainer.appendChild(buttonLabel);
        imgContainer.setAttribute('src', obj.getAttribute('src'))
        imgContainer.setAttribute('height', 225)
        popupContainer.appendChild(imgContainer);
        let clickCheck = document.querySelector(".onoffswitch-inner");
        
         return  document.querySelector('body').appendChild(popupContainer);
}



function checkPopup(){
    let classCheck = '.pop-up',
        classCounter = document.querySelectorAll(classCheck).length;
        console.log(classCounter);

        if (classCounter > 0) {
            return (obj = document.querySelector(classCheck)) ? document.querySelector('body').removeChild(obj):false;
        }
}

function setSatus(elem) {
    let imgObj = {
        on:'./img/up.png',
        off: './img/down.png'
    }

    sock.send(cos)
}


infoimg.onclick=clickHandler;

function setAttr(el, options) {
    Object.keys(options).forEach(function(attr) {
        el.setAttribute(attr, options[attr]);
    });
}

