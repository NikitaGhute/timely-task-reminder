let currentFilter = "inbox";


const setFilter = (filterType)=>{
    currentFilter=filterType;
    console.log("inbox all tasks")
    renderTaskList;
}
// const setFilter = (filterType) => {
//   currentFilter = filterType;
//   renderTaskList();
// };

const all_inbox=document.getElementById("all_inbox");
