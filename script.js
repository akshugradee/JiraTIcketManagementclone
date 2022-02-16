// first operation 
// creating a model using + sign


;
let addbtn=document.querySelector('.add-btn');
let addlfag=false;
let removeflag=false;
let removebtn=document.querySelector('.remove-btn');
let modalcontainer=document.querySelector('.modal-container');
let maincontainer=document.querySelector('.main-container');
let textareacont=document.querySelector('.textarea-container');
let lockopen="fa-lock-open";
let lockclose="fa-lock";
let toolboxcolors=document.querySelectorAll('.color');

let ticketArr=[];




// array of color
let colors=['lightpink','lightblue','lightgreen','lightblack'];
//  declairng black as default
let modalPriorityColor=colors[colors.length-1];
let allprioritycolor=document.querySelectorAll('.priority-color');


for(let i=0;i<toolboxcolors.length;i++){
    toolboxcolors[i].addEventListener("click",(e)=>{
        let currtoolboxcolor=toolboxcolors[i].classList[0];

        let filterticket=ticketArr.filter((ticketObj,idx )=>{
                return currtoolboxcolor===ticketObj.ticketcolor;
        })

        let alltickets=document.querySelectorAll(".ticket-container");
        for(let i=0;i<alltickets.length;i++)
        {
            alltickets[i].remove();
        }
         filterticket.forEach((ticketObj)=>{
                createTicket(ticketObj.ticketcolor,ticketObj.tickettask,ticketObj.ticketid)
            })
    })
    toolboxcolors[i].addEventListener('dblclick',(e)=>{
        let alltickets=document.querySelectorAll(".ticket-container");
        for(let i=0;i<alltickets.length;i++)
        {
            alltickets[i].remove();
        }
        ticketArr.forEach((ticketObj,idx)=>{
            createTicket(ticketObj.ticketcolor,ticketObj.tickettask,ticketObj.ticketid);
        })
        
    })
}

// listner for modal priority coloring and for clicking every color
// foreach loop becuase for everycolor so add click functionality and border for them
allprioritycolor.forEach((colorELem,idx)=>{
colorELem.addEventListener("click",(e)=>{
    // removing border from every color
    // remove border if their is any border in any color but display  border where we click later 
    allprioritycolor.forEach((pricoloEle,idx)=>{
        pricoloEle.classList.remove("border");

    })
    // specific color where click happpen we add click target which user click we use border
    colorELem.classList.add("border");
    modalPriorityColor=colorELem.classList[0];
})
})

addbtn.addEventListener('click',(e)=>{
    

    // addflag=true-> model display

    // addflag=flase->model none

    addlfag=!addlfag;
    if(addlfag){
        modalcontainer.style.display="flex";
    
    }else{
        modalcontainer.style.display="none";
    }
    
})

removebtn.addEventListener("click",(e)=>{
    removeflag=!removeflag;
})
// we keyboard functionality if we hold shift the textarea will be quit and create the ticket  
modalcontainer.addEventListener('keydown',(e)=>{
    // tells us what key we have pressed 
    let  mykey=e.key;
    // if we press shift then create the ticket 
    if(mykey==="Shift"){
        // passing the modalpriority because if we click the lighpink so value will be passed here to so we get first value 
        createTicket(modalPriorityColor,textareacont.value);
        // here we diplay  none after press down the shift key and modal area will be down 
        setmmodaldefault();
        // we put value attribute then it set empty in textarea
        textareacont.value='';
    }
})

// it will create a ticket and append it to main container where ticket are generetating
// passing ticket id and priority color inject in ticket so pass as arguments
function createTicket(ticketcolor,tickettask,ticketid){
    let ID= ticketid || shortid();
    let ticketcont=document.createElement('div');
    ticketcont.setAttribute('class','ticket-container');
    ticketcont.innerHTML=
    
    `<div class="ticket-color ${ticketcolor}"></div>
    <div class="ticket-id">#${ticketid}</div>
    <div class="task-area">${tickettask}</div>
    
    <div class="lock-cont">
    <i class="fa-solid fa-lock"></i>
    </div>`;
    
    maincontainer.appendChild(ticketcont);

    // create obj ticket and add to array

    if(!ticketid){
        ticketArr.push({ticketcolor,tickettask,ticketid:ID });
        console.log(ticketArr);
    }
        
   
    removehandel(ticketcont);
    lockhandel(ticketcont);
    colorhandel(ticketcont);

}
function removehandel(ticket){
    ticket.addEventListener("click",(e)=>{
        if(removeflag){
            ticket.remove();
        }
    })


}
function lockhandel(ticket){
    // /access of lock -cont

    let lockcont=ticket.querySelector('.lock-cont');
    let lockpic=lockcont.children[0];
    let taskArea=ticket.querySelector('.task-area')
    lockpic.addEventListener('click',(e)=>{
        if(lockpic.classList.contains(lockclose)){
            lockpic.classList.remove(lockclose);
            lockpic.classList.add(lockopen);
            taskArea.setAttribute("contenteditable",true);
        }
        else{
            lockpic.classList.remove(lockopen);
            lockpic.classList.add(lockclose);
            taskArea.setAttribute("contenteditable",false);

        }
    })

}
function colorhandel(ticket){
    let ticketcol=ticket.querySelector('.ticket-color');
    ticketcol.addEventListener('click',(e)=>{
        let currentcoltick=ticketcol.classList[1];
        let currentcolidx=colors.findIndex((color)=>{
            return currentcoltick === color;
        })
        currentcolidx++;
        let nextcoloridx=currentcolidx%colors.length;
        let nextcolor=colors[nextcoloridx];

        ticketcol.classList.remove(currentcoltick);
        ticketcol.classList.add(nextcolor);
    })
   
}
function setmmodaldefault(ticket){

    modalcontainer.style.display='none';
    addflag=!addlfag;
    modalPriorityColor=colors[colors.length-1];
    allprioritycolor.forEach((pricoloEle,idx)=>{
        pricoloEle.classList.remove("border");

    })
    allprioritycolor[allprioritycolor.length-1].classList.add('border');
}