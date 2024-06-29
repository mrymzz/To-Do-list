var root = document.querySelector(":root");
var body=document.body
var modal =document.getElementById("modal")
var addNewtask = document.getElementById("newTask")
var taskstatusinput =document.getElementById("status")
var taskcategoryinput=document.getElementById("category")
var tasktitleinput=document.getElementById("title")
var taskdescriptioninput=document.getElementById("description")
var addbtn=document.getElementById("addBtn")
var taskarr=[]
var updatedIndex;
var searchInput=document.getElementById("searchInput")

var nextUpCounter = document.getElementById("nextUpCount");
var inProgressCounter = document.getElementById("inProgressCount");
var doneCounter = document.getElementById("doneCount");
var nextUpC = 0
var inProgressC = 0
var doneC = 0

var sections = document.querySelectorAll("section");
var tasksContainer = document.querySelectorAll(".tasks");

var titleRegex = /^\w{3,}(\s\w+)*$/;
var descriptionRegex = /^(?=.{5,100}$)\w{1,}(\s\w*)*$/;

var remainingCounterElement = document.getElementById("remainingCounter");
var remainingCounter = 100;
var modebtn=document.getElementById("mode")
console.log(modebtn)

// if (localStorage.getItem("taskarr")) {
//     taskarr = JSON.parse(localStorage.getItem("taskarr"));
//     for (var i = 0; i < taskarr.length; i++) {
//       displayTask(i)
//     }
//   }

var toDocontainer=document.getElementById("toDo")
var inProgresscontainer=document.getElementById("inProgress")
var donecontainer=document.getElementById("done")
var taskHTML;
// var =document.getElementById("")
// var =document.getElementById("")

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function showmodal (){
    modal.classList.add("d-flex")
    modal.classList.remove("d-none")
    body.style.overflow = "hidden";
    scroll(0,0)

}
function hidemodal (){ 
     modal.classList.add("d-none");
     modal.classList.remove("d-flex");
     addbtn.innerHTML = "Add Task";
     addbtn.classList.remove("btn-update");
     addbtn.classList.add("btn-new-task");

}


function addTask(){if(validate(titleRegex,tasktitleinput) && validate(descriptionRegex,taskdescriptioninput)){
      if (addbtn.innerHTML.trim()=="Add Task"){
      var task ={
          status:taskstatusinput.value,
          category:taskcategoryinput.value,
          title:tasktitleinput.value,
          description:taskdescriptioninput.value,
      };
        taskarr.push(task)
      // savetolocal()
        displayTask(taskarr.length -1)
      // reset()
        resetInputs();}
        else if(addbtn.innerHTML.trim()=="update the task"){
          update(updatedIndex);
        }}}

function resetInputs() {
    taskstatusinput.value = "nextUp";
    taskcategoryinput.value = "education";
    tasktitleinput.value = "";
    taskdescriptioninput.value = "";
}

function displayTask(index){ 
    taskHTML = `
      <div class="task">
        <h3 class="text-capitalize">${taskarr[index].title}</h3>
        <p class="description text-capitalize">${taskarr[index].description}</p>
        <h4 class="category ${taskarr[index].category} text-capitalize">${taskarr[index].category}</h4>
        <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
          <li><i class="bi bi-pencil-square"onclick="getinfo(${index})" ></i></li>
          <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})"></i></li>
          <li><i class="bi bi-palette-fill" onclick="changeColor(event)"></i></li>
        </ul>
    </div>
    `;

    switch (taskarr[index].status) {
        case "nextUp":
        toDocontainer.innerHTML += taskHTML;
        nextUpC++
        nextUpCounter.innerHTML=nextUpC
   
          break;
        case "inProgress":
         inProgresscontainer.innerHTML += taskHTML;
         inProgressC++
         inProgressCounter.innerHTML=inProgressC
        
          break;
        case "done":
          donecontainer.innerHTML += taskHTML;
          doneC++
          doneCounter.innerHTML=doneC
          break; }}


// fnction savetolocal(){
//     localStorage.setItem("taskarr",JSON.stringify(taskarr))
// }

function deleteTask(index){
    console.log(index);
    taskarr.splice(index,1)
 reset()
 resetCounter()
// for(i=0;i<taskarr.length;i++){
//     displayTask(i);}
}

function getinfo(index){
    showmodal();
    taskcategoryinput.value=taskarr[index].status
    taskcategoryinput.value=taskarr[index].category
    taskdescriptioninput.value=taskarr[index].description
    tasktitleinput.value=taskarr[index].title
    addbtn.innerHTML="update the task"
    addbtn.classList.remove("btn-new-task");
  addbtn.classList.add("btn-update");
  updatedIndex=index;}


function update(index){
    taskarr[index].status=taskstatusinput.value;
    taskarr[index].category=taskcategoryinput.value;
    taskarr[index].description=taskdescriptioninput.value;
    taskarr[index].title=tasktitleinput.value;
    reset()
    resetCount()
    resetInputs();
 
    addbtn.innerHTML="Add Task"
    addbtn.classList.add("btn-new-task");
  addbtn.classList.remove("btn-update");}

function reset(){
    toDocontainer.innerHTML="";
  inProgresscontainer.innerHTML="";
  donecontainer.innerHTML="";
for(i=0;i<taskarr.length;i++){
    displayTask(i);
}}

function search(){
 resetforsearch()
 resetCounter()
     console.log(searchInput.value);
    for(var i=0;i<taskarr.length;i++){
        if(taskarr[i].title.includes(searchInput.value)||
        taskarr[i].category.includes(searchInput.value)
        
        ){displayTask(i)
           } }}



function resetforsearch(){
    toDocontainer.innerHTML="";
    inProgresscontainer.innerHTML="";
    donecontainer.innerHTML="";
}


function resetCounter() {

    nextUpC = 0;
    inProgressC = 0;
    doneC = 0;
    nextUpCounter.innerHTML = nextUpC;
    inProgressCounter.innerHTML = inProgressC;
    doneCounter.innerHTML = doneC;
  }
  
  function generateColor(){
    var color="#"
    var char = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    
    for(var i=1;i<=6;i++){
        var randomindex =Math.trunc(Math.random()*16)
        color+=char[randomindex]
    }
    return color
  }

function changeColor(event){
    var taskColor = event.target.parentElement.parentElement.parentElement;
    taskColor.style.backgroundColor = generateColor();
}


function changeToBars() {
    gridBtn.classList.remove("active");
    barsBtn.classList.add("active");
  
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.remove("col-md-6", "col-lg-4");
      sections[i].style.overflow = "auto";
    }
  
    for (var j = 0; j < tasksContainer.length; j++) {
      tasksContainer[j].setAttribute("data-view", "bars");
    }
  }
  
  function changeToGrid() {
    barsBtn.classList.remove("active");
    gridBtn.classList.add("active");
  
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.add("col-md-6", "col-lg-4");
    }
  
    for (var j = 0; j < tasksContainer.length; j++) {
      tasksContainer[j].removeAttribute("data-view");
    }
  }
  
  function validate(regex, element) {
    if (regex.test(element.value)) {
      element.classList.add("is-valid")
      element.classList.remove("is-invalid")
      element.parentElement.nextElementSibling.classList.replace(
        "d-block",
        "d-none")
    } else {
      element.classList.add("is-invalid")
      element.classList.remove("is-valid")
      element.parentElement.nextElementSibling.classList.replace(
        "d-none",
        "d-block")}
    return regex.test(element.value) }

    function changeMode() {
      if (modebtn.dataset.mode == "night") {
        root.style.setProperty("--main-black", "#f1f1f1");
        root.style.setProperty("--sec-black", "#ddd");
        root.style.setProperty("--text-color", "#222");
        root.style.setProperty("--gray-color", "#333");
        root.style.setProperty("--mid-gray", "#f1f1f1");
        modebtn.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
        modebtn.dataset.mode = "light";
      } else if (modebtn.dataset.mode == "light") {
        root.style.setProperty("--main-black", "#0d1117");
        root.style.setProperty("--sec-black", "#161b22");
        root.style.setProperty("--text-color", "#a5a6a7");
        root.style.setProperty("--gray-color", "#dadada");
        root.style.setProperty("--mid-gray", "#474a4e");
        modebtn.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
        modebtn.dataset.mode = "night";
      }
    }
// ------------------------------------------------------------------------------------------------------------------------

addNewtask.addEventListener("click",showmodal)
modal.addEventListener("click",function(event){
    if(event.target.id=="modal"){
        hidemodal();
    }
})
addbtn.addEventListener("click",addTask)
addbtn.addEventListener("click",hidemodal)
searchInput.addEventListener("input",search)
barsBtn.addEventListener("click", changeToBars);
gridBtn.addEventListener("click", changeToGrid);

tasktitleinput.addEventListener("input",function(){
  validate(titleRegex,tasktitleinput)
})
taskdescriptioninput.addEventListener("input", function () {
  validate(descriptionRegex,taskdescriptioninput);
  remainingCounter = 100 -taskdescriptioninput.value.split("").length;
  remainingCounterElement.innerHTML = remainingCounter;
});
modebtn.addEventListener("click",changeMode)
