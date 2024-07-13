// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modalSubmit= document.getElementById('modalSubmit')
const taskTitleInputId= document.getElementById('task-title')
const taskDateInputId= document.getElementById('date')
const taskDescInputId= document.getElementById('task-desc')


function saveTaskLocal(tasks){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function readTasksFromStorage(){
  let tasks= JSON.parse(localStorage.getItem('tasks')); 

  if(!tasks){
    tasks= [];
  } 
  //if nothing is found in local storage, we create an empty array that we can push to later
  return tasks;
}


// Todo: create a function to generate a unique task id
function generateTaskSubmit(event) { 
  event.preventDefault();

  // ? Read user input from the form
  const taskTitle = taskTitleInputId.val()
  const taskDate = taskDateInputId.val(); // yyyy-mm-dd format
  const taskDesc = taskDescInputId.val();
  

  
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard= $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id', task.id);
  const cardHeader= $('<div>').addClass('card-header h4').text(task.name)
  const cardBody= $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.type); //Might need to change .type
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn= $('<button>')
  .addClass('btn btn-danger delete')
  .text('Delete')
  .attr('data-task-id', task.id)
  cardDeleteBtn.on('click', handleDeleteTask)

  //creates the colors for the card based on the due date
  //Will only be applied if the task is not done

  if (task.dueDate && task.status !== 'done'){
    const now=dayjs();
    const taskDueDate= dayjs(task.dueDate, 'DD/MM/YYY');

    if(now.isSame(taskDueDate, 'day')){
      taskCard.addClass('bg-warning text-white'); //if task is due today sets card to be yellow
    } else if (now.isAfter(taskDueDate)){ 
      taskCard.addClass('bg-danger text-white');//if task is past due, makes the card red
    }

  }

  //appends the elements created to the htmlDOM
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn)
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}



// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}
// submitBtn
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

