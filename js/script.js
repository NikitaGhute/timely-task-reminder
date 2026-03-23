

// code for if task not present there
// if (tasks.length === 0) {
//   list.innerHTML = "<p>No tasks yet 🚀</p>";
//   return;
// }

// access the element
const addedTask = document.getElementById("taskText");
const addedTime= document.getElementById("taskTime");



const addTask =()=>{
    const task_name=addedTask.value;
    const task_time=addedTime.value;
    console.log("task_name.value -", task_name)
    console.log("task_time.value", task_time)
    addedTask.value = "";   //reset value after click on add task button
    addedTime.value="";
    console.log("addedTask.value", addedTask.value)
    console.log("addedTime.value", addedTime.value)


    if (task_name === " ")  return;
// create array of object to push task list into array
  const task_obj={
    id:Date.now(),
    taskName:task_name,   //key:value, key our given var like and value is the task_name.value
    taskTime:task_time,
  }
  
  // array for tasks list
   taskList.push(task_obj);  // push objects into array, to store multiple fields
   console.log("taskList", taskList)

   //render UI
   renderTaskList();
}

// create array
let taskList= [];

// create list item dynamicallly and render as UI
const renderTaskList=()=>{
     taskList.innerHTML= "";  

    //  use for each for render everry task
    taskList.forEach()

}
