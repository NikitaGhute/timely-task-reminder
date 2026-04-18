
// access the element
const addedTask = document.getElementById("taskText");
const addedTime=  document.getElementById("taskTime");
const task_list=  document.getElementById("display_taskList");
const page_title =document.getElementById("pageTitle");
const search_container= document.getElementById("search-container")
const search_Box= document.getElementById("searchBox");
const addTasksection = document.getElementById("add-task");
const task_Error=document.getElementById("taskError");
const time_error = document.getElementById("timeError");

const addTask = () => {
  const task_name = addedTask.value.trim();
  const task_time = addedTime.value.trim();

  if (task_name === "") {
    // alert("please enter task and time");
    console.log("task name :", task_name)
    addedTask.classList.add("input-error");
    addedTask.classList.remove("input-success");
    task_Error.innerText ="Task is required";
    return;
} 
  else if (!/[a-zA-Z]/.test(task_name)) {
    addedTask.classList.add("input-error");
    addedTask.classList.remove("input-success");
    task_Error.innerHTML = "Enter valid Task";
    return;
  }
else{
    addedTask.classList.remove("input-error");
    addedTask.classList.add("input-success");
    task_Error.innerText = "";
  }
  // return;

  const now = new Date();
  const selectedTime = new Date(task_time);

  if (task_time === "") {
    time_error.innerHTML = "Date is required";
    addedTime.classList.add("input-error");
  //  isValid = false;
   return;
  }
  
  else if (selectedTime < now) {
    // alert("please select future time");
    time_error.innerHTML = "Please enter future date and time";
    addedTime.classList.add("input-error");
    return;
  }
  else{
    addedTime.classList.remove("input-error");
    addedTime.classList.add("input-success");
    time_error.innerText = "";
  }

  


  if (editId) {
    // edit task
    taskList = taskList.map(task => {
      if (task.id === editId) {
        return {
          ...task,
          taskName: task_name,
          taskTime: task_time
        };
      }
      return task;
    });

    editId = null;

  } else {
    // object for task fields 
    const task_obj = {
      id: Date.now(),
      taskName: task_name,
      taskTime: task_time,
      isImportant:false,
      isCompleted:false,
      isDeleted:false,
  
    };

    taskList.push(task_obj);
  }

  //save after update task
  localStorage.setItem("tasks", JSON.stringify(taskList));   //update task into array       
  renderTaskList();
  
  addedTask.value = "";  //reset value of task name field
  addedTime.value = "";  //reset value of task time field
};

    addedTask.addEventListener("input", () =>{
      addedTask.classList.remove("input-error");
    });
    addedTime.addEventListener("input", () =>{
      addedTime.classList.remove("input-error");
    });

// search state 
let searchText="";

// handle search input and store search text and re-render ui/task list
const handleSearch = (value)=>{
  searchText= value.toLowerCase().trim();
  renderTaskList();
};

// apply search filter for all task
// if(searchText){
//   filteredTask = filteredTask.filter(task =>
//     task.taskName.toLowerCase().includes(searchText)
//   );
// }

// toggle button for important task
const toggleImportant=(id) =>{
  taskList = taskList.map(task=>{
    if(task.id === id){
      return{
        ...task,
        isImportant :!task.isImportant
      };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
};


// function for completed task
  const toggleCompleted=(id)=>{
    taskList = taskList.map(task =>{
      if (task.id === id){
        return{
          ...task,
          isCompleted :!task.isCompleted
        };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  };

  // trash restored function 
  const restoreTask = (id) =>{
    taskList = taskList.map(task =>{
      if(task.id === id){
        return{...task, isDeleted: false};
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  };
    const deleteForever = (id) =>{
      taskList = taskList.filter(task => task.id !==id);

      localStorage.setItem("tasks", JSON.stringify(taskList));
      renderTaskList();
    };



  // edit task function to be called on click
    const edit_task = (id)=>{
      
      const task =taskList.find(t => t.id === id);
      console.log("edit id found")

      addedTask.value =task.taskName;
      addedTime.value =task.taskTime;

      editId = id;
    }
     

// create array
// let taskList= [];
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];  //conversion happends from string to array as localhost dont understand string
let editId = null;
let currentFilter ="inbox";    //set default value of filter as inbox
console.log("taskList array", taskList)

const setFilter = (type, element)=>{
  console.log("clicked on filter", type)
    currentFilter=type;     //type, this value come from html, 

    document.querySelectorAll(".sidebar li").forEach(li =>
      li.classList.remove("active")
    );
    element.classList.add("active");

    if(type === "search"){
      addTasksection.style.display = "none";
      search_container.style.display="flex";
      // renderTaskList = "";

      // document.getElementById("searchBox").focus();
    }
    else {
      addTasksection.style.display = "flex";
      search_container.style.display = "none";

      searchText = "";
    }
    renderTaskList();
}


// create list item dynamicallly and render as UI
const renderTaskList=()=>{
  console.log("render called");
      task_list.innerHTML= "";      //ui list will be empty before enter task
      
    //create filter task
    let filteredTask= [];

   switch (currentFilter) {
  case "today":
    filteredTask = taskList.filter(task =>
      !task.isDeleted &&
      new Date(task.taskTime).toDateString() === new Date().toDateString()
    );
    break;

  case "important":
    filteredTask = taskList.filter(task =>
      !task.isDeleted && task.isImportant
    );
    break;

  case "completed":
    filteredTask = taskList.filter(task =>
      !task.isDeleted && task.isCompleted
    );
    break;

  case "trash":
    filteredTask = taskList.filter(task => task.isDeleted);
    break;

  case "search":
    filteredTask = taskList.filter(task => !task.isDeleted);
    break;

  default:
    filteredTask = taskList.filter(task => !task.isDeleted);
 }

 if (currentFilter === "search" && searchText){
  filteredTask = filteredTask.filter(task =>
    task.taskName.toLowerCase().includes(searchText)
  )
 }

         // display page name dynamically
    const filterName= currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
    const count = filteredTask.length;
    
    page_title.innerText=`Task Manager - ${filterName} (${count})`;

    if(filteredTask.length === 0){
      task_list.innerHTML = currentFilter === "search"
        ? `<p>No matching tasks found</p>`
        : `<p> No ${filterName}</p>`;
         return;
    }


    //  use for each for render every task
    filteredTask.forEach((task) => {
  const list_create = document.createElement("li");

  if (currentFilter === "trash") {
    list_create.innerHTML = `
      <div class="list_row">
        <span>${task.taskName}</span>
        <span>${task.taskTime}</span>

        <button onclick="restoreTask(${task.id})">Restore</button>
        <button onclick="deleteForever(${task.id})">Delete Permanently</button>
      </div>
    `;
  } 
  else {
    list_create.innerHTML = `
      <div class="list_row">
        <span>${task.taskName}</span>
        <span>${task.taskTime}</span>

        <button class="tooltip-btn" onclick="toggleImportant(${task.id})">
        <span class="tooltip-text">Important Task</span>
          ${task.isImportant 
            ? '<i class="fa-solid fa-star important"></i>' 
            : '<i class="fa-regular fa-star"></i>'}
        </button>

        <button class="tooltip-btn" onclick="toggleCompleted(${task.id})">
        <span class="tooltip-text">Complete task</span>
          ${task.isCompleted 
            ? '<i class="fa-solid fa-circle-check completed-icon"></i>' 
            : '<i class="fa-regular fa-circle"></i>'}
        </button>

        <button class="tooltip-btn" onclick="edit_task(${task.id})">
        <span class="tooltip-text">Edit Task</span>
          <i class="fa-regular fa-pen-to-square"></i>
        </button>

        <button class="tooltip-btn" onclick="delete_task(${task.id})">
        <span class="tooltip-text">Delete</span>
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;
  }

  task_list.appendChild(list_create);
});
          

      page_title.classList.remove("animate__animated", "animate__fadeInDown")
        //triger animation again and again
        void page_title.offsetWidth;
        page_title.classList.add("animate__animated", "animate__fadeInDown")

      console.log("currentFilter:", currentFilter);
      console.log("taskList:", taskList);
       console.log("filteredTasks:", filteredTask);
};


  //render UI
  renderTaskList();
     addedTask.value="";
     addedTime.value="";


const delete_task = (id) => {          //id works as parameter
  // taskList = taskList.filter(item => item.id !== id); //delete task permenantly
      taskList= taskList.map(task =>{
        if(task.id === id){
          return{
            ...task,
            isDeleted:true
          };
        }
        return task;
      })
  // save after delete
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();         //update list after remove items
};
