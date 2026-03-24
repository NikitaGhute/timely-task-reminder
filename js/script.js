
// access the element
const addedTask = document.getElementById("taskText");
const addedTime= document.getElementById("taskTime");
const task_list=document.getElementById("display_taskList");


const addTask =()=>{
    const task_name=addedTask.value;
    const task_time=addedTime.value;
    console.log( "task time added",task_name);

     if (task_name.length === 0) return;
    

// create array of object to push task list into array
  const task_obj={
    id:Date.now(),
    taskName:task_name,   //key:value, key our given var like and value is the task_name.value
    taskTime:task_time,
  }

  // array for tasks list
   taskList.push(task_obj);  // push objects into array, to store multiple fields
     
  //render UI
   renderTaskList();
    addedTask.value="";
    addedTime.value="";
}

// create array
let taskList= [];
console.log("taskList array", taskList)

// create list item dynami  callly and render as UI
const renderTaskList=()=>{
      task_list.innerHTML= "";  

    //  use for each for render everry task
    taskList.forEach((task) =>{
      const list_create= document.createElement("li");
      // const list_row=document.createElement("div");

      list_create.innerHTML=`
        <div class="list_row">
          <span>${task.taskName}</span>
          <span>${task.taskTime}</span>
          <button class="edit_task"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="delete_task"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      `
      task_list.appendChild(list_create);
    });

}
