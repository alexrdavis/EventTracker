let getDate = document.querySelector("#date");
let getName = document.querySelector("#name");
let error = document.querySelector("#error");
let results = document.querySelector("#results");
let form = document.querySelector("#date-form");


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


}

// Delete Event
function deleteItem(el) {
  el.parentElement.parentElement.remove();
}


function calculateDate() {
  // Current Date
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // Past Date
  const pastDate = new Date(getDate.value);
  const pastYear = pastDate.getFullYear();

  // Calculate Dates
  const yearSol = year - pastYear;

  return yearSol + " Years ";
}


