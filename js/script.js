
let tasksDB = [];

function addtask() { 
    const taskinput = document.getElementById("todo-input");
    const taskdate = document.getElementById("due-date");

    console.log(taskinput.value);
    console.log(taskdate.value);

    if (validateinput(taskinput.value, taskdate.value )) {
        const newtask={
            task: taskinput.value,
            date: taskdate.value,
        }

        tasksDB.push(newtask);

        renderTask();
    } 
}

function renderTask() { const tasklist = document.getElementById("task-list");
    tasklist.innerHTML = "";

    tasksDB.forEach((task, index)=> {
        tasklist.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${task.task}</td>
            <td>${task.date}</td>
            <td><button onclick="deletetask(${index})">Delete</button></td>
        </tr>
        `;
    });
}

function deleteAllTasks(){
    tasksDB = [];
    renderTask();

}

function filtertask(){
    const filterdate = document.getElementById("filter-task").value;

}

function validateinput(task, date){
    if (task.trim() === "" || date.trim() === "") {
        alert("Please enter both task and due date.");
        return false;
    }
    return true;
}