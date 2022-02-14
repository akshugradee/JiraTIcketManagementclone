// first operation 
// creating a model using + sign



let addbtn=document.querySelector('.add-btn');
let addlfag=false;
let modalcontainer=document.querySelector('.modal-container');
let maincontainer=document.querySelector('.main-container');
let textareacont=document.querySelector('.textarea-container');

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
// we keyboard functionality if we hold shift the textarea will be quit and create the ticket  
modalcontainer.addEventListener('keydown',(e)=>{
    // tells us what key we have pressed 
    let  mykey=e.key;
    // if we press shift then create the ticket 
    if(mykey==="Shift"){
        createTicket();
        // here we diplay  none after press down the shift key and modal area will be down 
        modalcontainer.style.display='none';
        addflag=!addlfag;
        textareacont.value="";
    }
})

// it will create a ticket and append it to main container where ticket are generetating
function createTicket(){
    let ticketcont=document.createElement('div');
    ticketcont.setAttribute('class','ticket-container');
    ticketcont.innerHTML=
    `<div class="ticket-color"></div>
    <div class="ticket-id">sample_id</div>
    <div class="task-area">Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </div>`;
    maincontainer.appendChild(ticketcont);
}