/* User details */
var id = 0;
var user = {
  firstName: "",
  lastName: "",
  address: "",
  pincode: 0,
  gender: "",
  foods: [],
  country: "",
  state: ""
};

/* Stores the favorite foods and states */
var foods = [];
var states = [];

/* Countries and states */
const countriesMap = new Map();
countriesMap.set("India", ["Maharashtra", "Karnataka", "West Bengal", "Delhi"]);
countriesMap.set("USA", ["Washington", "Texas", "California"]);

/* Append user record to the table */
var tableBody = document.getElementById("table-body");

/**
 * @param {*} event 
 * Generate table row
 */
function generateTableRow(event) {
  // Preven form submission
  event.preventDefault();

  // Extract values from radio, checkbox options
  getTextBasedValues();

  // Clear stale info
  initUser();
}

/* Get text based values */
function getTextBasedValues() {
  user.firstName = document.getElementById("fname").value;
  user.lastName = document.getElementById("lname").value;
  user.address = document.getElementById("address").value;
  user.pincode = document.getElementById("pincode").value;
  
  // Get gender from radio button
  user.gender = getGender();

  // Get favorite food items
  user.foods = foods;

  if (foods.length < 2) {
    console.log("Length less than 2");
    document.getElementById("warning").classList.remove("hide");
    document.querySelector(".warning").innerHTML = `<p class="error">Atlease 2 favorite foods must be selected!</p>`;
    return;
  } else {
    document.getElementById("warning").classList.add("hide");
  }

  // Create table row
  let userRecord = tableBody.insertRow();
  let col0 = userRecord.insertCell(0);
  let col1 = userRecord.insertCell(1);
  let col2 = userRecord.insertCell(2);
  let col3 = userRecord.insertCell(3);
  let col4 = userRecord.insertCell(4);
  let col5 = userRecord.insertCell(5);
  let col6 = userRecord.insertCell(6);
  let col7 = userRecord.insertCell(7);
  let col8 = userRecord.insertCell(8);

  // Increment id
  id++;

  // Get country
  user.country = getCountry();

  // Populate table row
  col0.innerHTML = id;
  col1.innerHTML = user.firstName;
  col2.innerHTML = user.lastName;
  col3.innerHTML = user.address;
  col4.innerHTML = user.pincode;
  col5.innerHTML = user.gender;
  col6.innerHTML = user.foods;
  col7.innerHTML = user.country;
  col8.innerHTML = user.state;
  
  // Clear inputs
  clearInputs();
}

/* Get the radio button values */
function getGender() {
  let radios = document.getElementsByName("gender");
  for (var i = 0; i < radios.length; i++) {
    let selector = "label[for=" + radios[i].id + "]";
    let label = document.querySelector(selector);

    if (radios[i].checked) {
      let gender = label.innerHTML.trim();
      return gender;
    }
  }
}

/* Get check box values */
function getFavFoods() {
  // Select all the checkboxes
  let checkboxes = document.getElementsByName("fav-food");

  for (let i=0; i<checkboxes.length; i++) {
    let selector = "label[for=" + checkboxes[i].id + "]";
    // Extract all the labels from the selected checkboxes
    let label = document.querySelector(selector);
    
    let dish = label.innerHTML.trim();
    if (checkboxes[i].checked) {
      // Check to avoid duplication foods array 
      if (!foods.includes(dish)) {
        // Item is not in the list remove it now
        foods.push(dish);
      } else {
        // Item is already in the list remove it now
        foods = foods.filter((item) => item === dish);
      }
    } 
  }

  console.log(foods);
}

/* Get options from dropdown */
function getCountry() {
  const section = document.getElementById("country");
  const index = section.value;
  const country = section.options[index].text;
  console.log(index, country);

  let states = [...countriesMap.get(country)];
  console.log("States:", states);
  
  let select = document.getElementById("state");
  select.innerHTML = "";

  let option = document.createElement("option");
  option.selected = true;
  option.innerHTML = "Select State";
  select.append(option);

  for (let i=1; i<states.length; i++) {
    option = document.createElement("option");
    option.value = i;
    option.innerHTML = states[i];
    select.append(option);
  }

  const countyStateMap = {
    country: country,
    states: states
  }

  return country;
}

/* Get state */
function getState() {
  const section = document.getElementById("state");
  const index = section.value;
  const state = section.options[index].text;
  console.log(index, state);

  user.state = state;
  return state;
}

/* Intialize user object */
function initUser() {
  user = {
    firstName: "",
    lastName: "",
    address: "",
    pincode: 0,
    gender: "",
  };
}

/* Clear inputs */
function clearInputs() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("address").value = "";
  document.getElementById("pincode").value = "";

  document.querySelectorAll('input[type="text"]')
    .forEach(el => el.checked = false);

  document.querySelectorAll('input[type="radio"]')
    .forEach(el => el.checked = false);

  document.querySelectorAll('input[type="checkbox"]')
    .forEach(el => el.checked = false);

  document.getElementById("country").value = "Select Country";
}
