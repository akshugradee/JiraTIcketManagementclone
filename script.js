// button access
let addbtn=document.querySelector(".add-btn");
let addflag=false;
 // remove ticket if we click
 let removebtn=document.querySelector(".remove-btn");
let removeflag=false;
let lock="fa-lock";
let lockopen="fa-lock-open";
let modalcont=document.querySelector(".modal-container");
let maincont=document.querySelector('.main-container');
let textareacont=document.querySelector(".textarea-container");
let toolboxcolors=document.querySelectorAll(".color");
let ticketsArr=[];


if(localStorage.getItem("jira_tickets")){
    // retive my data and display
    ticketsArr=JSON.parse(localStorage.getItem("jira_tickets"));
    ticketsArr.forEach((ticketobj)=>{
        createTicket(ticketobj.ticketcolor,ticketobj.tickettask,ticketobj.ticketID);
    })
    
}
for(let i=0;i<toolboxcolors.length;i++){
    toolboxcolors[i].addEventListener('click',(e)=>{
        let currenttoolboxcolor=toolboxcolors[i].classList[0];


        // filtering 
        let filterticket=ticketsArr.filter((ticketobj,idx)=>{
                return currenttoolboxcolor === ticketobj.ticketcolor;
        })

        // remove previous tickets
        let allticketscont=document.querySelectorAll(".ticket-container");
        for(let i=0;i<allticketscont.length;i++){
            allticketscont[i].remove();
        }

        // display new filtertickets
        filterticket.forEach((ticketobj,idx)=>{
            // again click we genereate duplicay  of same ticket 
            createTicket(ticketobj.ticketcolor,ticketobj.tickettask,ticketobj.ticketID);
        })
    })
   toolboxcolors[i].addEventListener("dblclick",(e)=>{

 let allticketscont=document.querySelectorAll(".ticket-container");
        for(let i=0;i<allticketscont.length;i++){
            allticketscont[i].remove();
        }
        ticketsArr.forEach((ticketobj,idx)=>{
            createTicket(ticketobj.ticketcolor,ticketobj.tickettask,ticketobj.ticketID);
        })

    })
    

}



let colors=["lightpink","lightblue","lightgreen","lightblack"];
// defalut color for modal;
let modalpriocolor=colors[colors.length-1];

let allpriocolor=document.querySelectorAll(".priority-color");

// listner for modal priority listening 

allpriocolor.forEach((colorele,idx)=>{
    colorele.addEventListener('click',(e)=>{
        // removing border
        allpriocolor.forEach((priocolor)=>{
                priocolor.classList.remove("border");
            
        })
        colorele.classList.add("border");
        modalpriocolor=colorele.classList[0];
    })
})
addbtn.addEventListener('click',(e)=>{
    // display modal


    
    // addflag =true --display modal 

    // add flag - false - remove modal

    addflag=!addflag;
    // state change for every click;

   
    

    
    if(addflag=true){

        modalcont.style.display="flex";
    }
    else{
        modalcont.style.display="none";
    }
})
removebtn.addEventListener('click',(e)=>{
    removeflag=!removeflag; //toggle remove btn

})
modalcont.addEventListener("keydown",(e)=>{
    let key=e.key; 
    if(key==="Shift"){
        createTicket(modalpriocolor,textareacont.value);
        addflag=false;
         setmodaldefault();
       
        
        
    }
})
function createTicket(ticketcolor,tickettask,ticketID){
    let id=ticketID || shortid();
    let ticketcont=document.createElement('div');
    ticketcont.setAttribute("class","ticket-container");
    ticketcont.innerHTML=`
    <div class ="ticket-color ${ticketcolor}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="task-area">${tickettask}</div>
    <div class="lock-cont">
    <i class="fa-solid fa-lock"></i></div>`;
    // create objj of ticket and add to array
    // push when no ticket id 
    if(!ticketID){
    ticketsArr.push({ticketcolor,tickettask,ticketID:id})
    localStorage.setItem("jira_tickets",JSON.stringify(ticketsArr))
};
    maincont.appendChild(ticketcont);
    handelremoval(ticketcont,id);
    handellock(ticketcont,id);
    handelcolor(ticketcont,id);
}
function handelremoval(ticket,id){
    // remove flag is true  ->remove
    ticket.addEventListener("click",(e)=>{
        if(removeflag){

            let idx=getticketidx(id);
            ticketsArr.splice(idx,1)
            let stringticketarr=JSON.stringify(ticketsArr);
            localStorage.setItem("jira_tickets",stringticketarr);
            ticket.remove();
        }
    })
   

}
function handellock(ticket,id){
    let ticketlockele=ticket.querySelector(".lock-cont");
    let ticketlock=ticketlockele.children[0];
    let tickettaskarea=ticket.querySelector('.task-area');
    ticketlock.addEventListener('click',(e)=>{
        let ticketidx=getticketidx(id);
       
        if(ticketlock.classList.contains(lock)){
            ticketlock.classList.remove(lock);
            ticketlock.classList.add(lockopen);
            // edit text using content editable attribute 
            tickettaskarea.setAttribute("contenteditable","true");

            

        }else{
            ticketlock.classList.add(lock);
            ticketlock.classList.remove(lockopen);
            tickettaskarea.setAttribute("contenteditable","false");

        }
        // modify data in local storage for ticket task
    ticketsArr[ticketidx].tickettask=tickettaskarea.innerText;
    localStorage.setItem("jira_tickets",JSON.stringify(ticketsArr));

    })
}


function handelcolor(ticket,id){
    let ticektcolorss=ticket.querySelector(".ticket-color");
    ticektcolorss.addEventListener('click',(e)=>{
         // getticketindx from the ticket array
         let ticketidx=getticketidx(id);
    let currentticketcolor=ticektcolorss.classList[1];
    // find current color
    // acccesing index
    let currentcolorindex=colors.findIndex((color)=>{
        return currentticketcolor===color;
    })
    currentcolorindex++;
    // for making it again 0  because we dont have 4 index for color
    let newcoloridx=currentcolorindex%colors.length;
    let newcolor=colors[newcoloridx];
    ticektcolorss.classList.remove(currentticketcolor);
    ticektcolorss.classList.add(newcolor);

    // modfiy data in storage

    ticketsArr[ticketidx].ticketcolor=newcolor;
    localStorage.setItem("jira_tickets",JSON.stringify(ticketsArr));

    

    })
}
function getticketidx(id){
    let ticketidx=ticketsArr.findIndex((ticketobj)=>{
        return ticketobj.ticketID===id;
    })
return ticketidx;
}
function setmodaldefault(ticket){
    // remove modal
    modalcont.style.display='none';
    
    // textareacont.innerText="";  value should be empty
    textareacont.value="";
    modalpriocolor=colors[colors.length-1];
    allpriocolor.forEach((priocolor)=>{
        priocolor.classList.remove("border");
    })
    allpriocolor[allpriocolor.length-1].classList.add("border");
    
}
