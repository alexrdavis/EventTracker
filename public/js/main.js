let getDate = document.querySelector("#date");
let getName = document.querySelector("#name");
let error = document.querySelector("#error");
let results = document.querySelector("#results");
let form = document.querySelector("#date-form");

// Load local storage
document.addEventListener("DOMContentLoaded", getLocalStorage);

// Validation
document.querySelector("#date-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!getDate || getName.value === "") {
    error.innerHTML = "Please fill in all fields";
  } else if (getDate.value > 2121) {
    error.innerHTML = "Please enter lower date";
  } else if (getDate.value < 1900) {
    error.innerHTML = "Please enter a valid date";
  } else {
    success();
    form.reset();
  }
});

document.querySelector(".table").addEventListener("click", (e) => {
    deleteItem(e.target);
  }); 

function success() {
  // Table
  let list = document.querySelector("#date-body");
  const row = document.createElement("tr");


  // Rows
  row.innerHTML = `
    <td>${getName.value}</td>
    <td>${calculateDate()}</td>
    <td>${getDate.value}</td>
    <td><i class="fa fa-trash-o"></i></td>
  `
  list.appendChild(row);

  // Local Storage
  saveLocalEvents(row.innerHTML);

}

// Delete Event
function deleteItem(el) {
  el.parentElement.parentElement.remove();
  removeLocalStorage(el.parentElement.parentElement);
}


function calculateDate() {
  // Current Date
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // Past Date
  const pastDate = new Date(getDate.value);
  const pastYear = pastDate.getFullYear();

  // Calculate Dates
  let yearSol = year - pastYear;

  if(getDate.value == "2021-01-01") {
    yearSol = 0;
  }

  return yearSol + " Years ";
}

// Save Local Storage //
function saveLocalEvents(event) {
  let events;
  if(localStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem("events"));
  }
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));
}

// Get Local Storage //
function getLocalStorage() {
  let events;
  if(localStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem("events"));
    console.log("Get storage" + events);
  }
  events.forEach(function(event){
    const list = document.querySelector("#date-body");
    const row = document.createElement("tr");
    // Rows
    row.innerHTML = event;
    list.appendChild(row);


  })
}

// Remove Local Storage //
function removeLocalStorage(event) {
  let events;
  if(localStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(localStorage.getItem("events"));
  }
  const eventIndex = event.children[0].innerHTML;
  console.log(eventIndex);
  let x = events.splice((events.indexOf(eventIndex)-1), 1);
  console.log(x);
  console.log("events index" + events.indexOf("alex"));
  localStorage.setItem("events", JSON.stringify(events));
}


