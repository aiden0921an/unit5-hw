// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modalSubmit= document.getElementById('modalSubmit')
const taskTitleInputId= document.getElementById('task-title')
const taskDateInputId= document.getElementById('date')
const taskDescInputId= document.getElementById('task-desc')


function saveTaskLocal(task){
  localStorage.setItem('task', JSON.stringify(task))
}

function readTasksFromStorage(){
  let tasks= JSON.parse(localStorage.getItem('task')); 

  if(!tasks){
    tasks= [];
  } 
  //if nothing is found in local storage, we create an empty array that we can push to later
  return tasks;
}


// Todo: create a function to generate a unique task id
function generateTaskSubmit(event) { 
  event.preventDefault();
  event.preventDefault();
  // Read user input from the form
  const taskTitle = taskTitleInputId.val()
  const taskDate = taskDateInputId.val(); // yyyy-mm-dd format
  const taskDesc = taskDescInputId.val();

  //creates a random id for each for the tasks
  const newTask= {
    id: crypto.randomUUID(),
    title: taskTitle,
    dueDate: taskDate,
    description: taskDesc,
    status: 'to-do',
  };

  

  
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

  //appends the elements created to the DOM
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn)
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}



// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();

  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for (let task of tasks) {
    if (task.status === 'to-do') { 
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }
  //^Loops through and checks for the status for each task, and then will append it to the created card(s)

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();
    // Read user input from the form
    const taskTitle = taskTitleInputId.val()
    const taskDate = taskDateInputId.val(); // yyyy-mm-dd format
    const taskDesc = taskDescInputId.val();

    //creates a random id for each for the tasks
    const newTask= {
      id: crypto.randomUUID(),
      title: taskTitle,
      dueDate: taskDate,
      description: taskDesc,
      status: 'to-do',
    };
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const tasks = readTasksFromStorage(); //read from local
  const tasksId = ui.draggable[0].dataset.taskId;
  const newStatus= event.target.id;

  for (let task of tasks){
    if (task.id=== tasksId){
      task.status = newStatus;
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  saveTaskLocal(tasks);
  renderTaskList();


}

modalSubmit.on('submit', handleAddTask);

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

