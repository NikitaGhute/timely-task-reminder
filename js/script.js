
// access the element
const addedTask = document.getElementById("taskText");
const addedTime=  document.getElementById("taskTime");
const task_list=  document.getElementById("display_taskList");

const addTask = () => {
  const task_name = addedTask.value.trim();
  const task_time = addedTime.value.trim();

  if (task_name === "" && task_time === "") {
    alert("please enter task and time");
    return;
  }

  if (task_name === "") {
    alert("please enter task name");
    return;
  }

  if (!/[a-zA-Z]/.test(task_name)) {
    alert("Task must contain at least one letter");
    return;
  }

  if (task_time === "") {
    alert("please enter task time");
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
      taskTime: task_time
    };

    taskList.push(task_obj);
  }

  //save after update task
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
  
  addedTask.value = "";
  addedTime.value = "";
};


  // edit task function to be called on click
    const edit_task = (id)=>{
      
      const task =taskList.find(t => t.id === id);
      console.log("edit id found")

      addedTask.value =task.taskName;
      addedTime.value =task.taskTime;

      editId = id;
    }


  // array for tasks list
  //  taskList.push(task_obj);  // push objects into array, to store multiple fields
     

// create array
// let taskList= [];
let editId = null;
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];  //conversion happends from string to array
console.log("taskList array", taskList)


// create list item dynamicallly and render as UI
const renderTaskList=()=>{
  console.log("render called");
      task_list.innerHTML= "";  
      
   if (taskList.length === 0){
     task_list.innerHTML = "<p>No task yet </p>" ;
     console.log("no task yet")
      return;
    }

    //  use for each for render everry task
    taskList.forEach((task) =>{
      const list_create= document.createElement("li");

      list_create.innerHTML=`
        <div class="list_row">
          <span>${task.taskName}</span>
          <span>${task.taskTime}</span>
          <button class="edit_task" onclick="edit_task(${task.id})"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="delete_task" onClick="delete_task(${task.id})"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      `
      task_list.appendChild(list_create);
    });
}


  //render UI
  renderTaskList();
     addedTask.value="";
     addedTime.value="";


const delete_task = (id) => {
  taskList = taskList.filter(item => item.id !== id);

  // save after delete
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
};
// renderTaskList();