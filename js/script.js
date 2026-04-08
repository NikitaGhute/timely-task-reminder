
// access the element
const addedTask = document.getElementById("taskText");
const addedTime=  document.getElementById("taskTime");
const task_list=  document.getElementById("display_taskList");
const page_title =document.getElementById("pageTitle");

const addTask = () => {
  const task_name = addedTask.value.trim();
  const task_time = addedTime.value.trim();

  if (task_name === "" && task_time === "") {
    alert("please enter task and time");
    return;
  }

  if (task_time === "") {
    alert("please enter task time");
    return;
  }

   if (!/[a-zA-Z]/.test(task_name)) {
    alert("Task must contain at least one letter");
    return;
  }

  const now = new Date();
  const selectedTime = new Date(task_time);

  if (selectedTime < now) {
    alert("please select future time");
    return;
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
      isSearch:false,
    };

    taskList.push(task_obj);
  }

  //save after update task
  localStorage.setItem("tasks", JSON.stringify(taskList));   //update task into array       
  renderTaskList();
  
  addedTask.value = "";  //reset value of task name field
  addedTime.value = "";  //reset value of task time field
};

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

    //toggle between active and in active style
    // class="animate_animated animate_zoomIn" 
    document.querySelectorAll(".sidebar li").forEach(li =>{
      li.classList.remove("active");
    });
    element.classList.add("active");
    searchText = "";

    // if else for search option
   if (type === "search"){
      searchBox.style.display="block";
   }
   else{
      searchBox.style.display="none";
   }

    renderTaskList();
}


// create list item dynamicallly and render as UI
const renderTaskList=()=>{
  console.log("render called");
      task_list.innerHTML= "";      //ui list will be empty before enter task
      

    //create filter task
    let filteredTask= [];

    switch (currentFilter){
      case "today":
        console.log("set filter for input")
        filteredTask = taskList.filter(task =>
          !task.isDeleted && 
          new Date(task.taskTime).toDateString() === new Date().toDateString()
        );
        break;

        case "upcoming":
          filteredTask = taskList.filter(task => 
            !task.isDeleted &&
            new Date (task.taskTime) > new Date()
          );
        break;

        case "important":
         console.log("set filter for important")
            filteredTask = taskList.filter(task => !task.isDeleted && task.isImportant === true
            );
        break;

        case "completed":
              filteredTask = taskList.filter(task => !task.isDeleted && task.isCompleted === true
              ); 
              console.log("set filter for completed task")
        break;
        
        case "trash" :
          filteredTask =taskList.filter(task =>task.isDeleted);
          break;

          case "search" :
            filteredTask = taskList.filter(task => !task.isSearch);
            break;
            
         default:
              filteredTask =taskList; 
      }
        if (searchText){
        filteredTask = filteredTask.filter(task =>
          task.taskName.toLowerCase().includes(searchText)
        );
      }
  
         // display page name dynamically
    const filterName= currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
    const count = filteredTask.length;
    
    page_title.innerText=`Task Manager - ${filterName} (${count})`;

    if (count === 0){
      task_list.innerHTML=`<p>No ${filterName}</p>`;
      return;
    }

    if(filteredTask.length === 0){
      task_list.innerHTML=`<p>No matching tasks found</p>`
      return;
    }
      


    //  use for each for render every task
    filteredTask.forEach((task) =>{
      const list_create= document.createElement("li");

      list_create.innerHTML=`
        <div class="list_row">
          <span>${task.taskName}</span>
          <span>${task.taskTime}</span>
          <button onclick="toggleImportant(${task.id})">
            ${task.isImportant ? '<i class="fa-solid fa-star important"></i>' : '<i class="fa-regular fa-star"></i>'
            }
            </button>
            <button onclick="toggleCompleted(${task.id})">
              ${task.isCompleted 
                ? '<i class="fa-solid fa-circle-check completed-icon"></i>' 
                : '<i class="fa-regular fa-circle"></i>'}
            </button>
            <button class="edit_task" onclick="edit_task(${task.id})"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="delete_task" onClick="delete_task(${task.id})"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      `
      task_list.appendChild(list_create);
    });


      page_title.classList.remove("animate__animated", "animate__fadeInDown")
        //triger animation again and again
        void page_title.offsetWidth;
        page_title.classList.add("animate__animated", "animate__fadeInDown")

            // trash filter function for delete 
      if (currentFilter === "trash"){
        list_create.innerHTML =`
        <div class="list_row">
        <span>${task.taskName}</span>
        <span>${task.taskTime}</span>

        <button onclick="restoreTask(${task.id})">Restored</button>
        <button onclick="deleteForever(${task.id})">Delete</button>
        </div>
        `;
      }

      if(currentFilter === "trash"){
        list.create.innerHTML = `
          <div class="list_row">
            <span>${task.taskName}</span>
            <span>${task.taskTime}</span>

            <button onclick="restoredTask(${task.id})"> Restored </button>
            <button onclick="deleteForever(${task.id})"> Delete Permenently</button>
          </div>
        `;
      }

      console.log("currentFilter:", currentFilter);
      console.log("taskList:", taskList);
       console.log("filteredTasks:", filteredTask);
};

// search task function here
let searchText= " ";

const handleSearch = (value)=>{
    searchText=value.toLowerCase().trim();
    console.log("searched task is: ",searchText);
    renderTaskList();

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
