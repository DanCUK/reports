
/* 
Student Report app

This app:
1. Accepts input from user.
2. Generates dropdown options that include the student name.
3. when the button is clicked, it joins all of the options in a report.
4. Reloads the page when the user wants to create a new report.
*/

/*
Inputs and Selections
*/

// Target the formContainer
let formContainer = document.querySelector('.formContainer');
// Target Student Name Input
let inputStudentName = document.querySelector('input.inputStudentName');
// Create empty student name
let studentName = ``;
// Select Student Name Button
let buttonStudentName = document.querySelector('button.buttonStudentName');
// Target Collate Button
let buttonCollateReport = document.querySelector('button.buttonCollateReport');
// Create Empty Array for Collated Report
let collatedArray = [];
// Target the Restart Button
let buttonRestartReport = document.querySelector('button.buttonRestartReport');
// Target Dropdown
let dropDownConfig;
// Pronoun Defaults
let pronoun = "unknown";
let pronounAlternative = "unknown";

/* 
Function to define gender 
*/

function getPronoun() {
  let pronounSelector = document.getElementById("pronounSelector");
  let pronounOptions = document.querySelectorAll('#pronounSelector option');

  let pronounReplace = [
    [ "he", "his" ],
    [ "she", "her"],
    [ "they", "they" ]
  ];

  /*
  If else to set pronoun and pronounAlternative
  */
  if (pronounSelector.value == pronounOptions[0].value) {
    console.log(`You have not selected an option: ${pronounOptions[0].value}`);
  } else if (pronounSelector.value == pronounOptions[1].value) {
    console.log(`You selected the first option: ${pronounOptions[1].value}`);
    pronoun = "he";
    pronounAlternative = "his";
  } else if (pronounSelector.value == pronounOptions[2].value) {
    console.log(`You selected the second option: ${pronounOptions[2].value}`);
    pronoun = "she";
    pronounAlternative = "her";
  } else if (pronounSelector.value == pronounOptions[3].value) {
    console.log(`You have not selected an option: ${pronounOptions[3].value}`);
    pronoun = "they";
    pronounAlternative = "they";
  }
}


 /*
 For Loop iterating over each selection and changing the pronoun and pronounAlternative values.
 NEED HELP HERE
 */
      // for ( let i = 0; i < pronounOptions.length; i++ ) {
      //   for ( let j = 0; j < pronounReplace.length; j++ ) {
      //       if (pronounOptions[i].value == pronounSelector.value ) {
      //       pronoun = pronounReplace[i][0];
      //       pronounAlternative = pronounReplace[i][j];
      //       console.log(`The pronoun is: ${pronoun}
      //       <br />
      //       pronounAlternative is: ${pronounAlternative}`);
      //     }
      //   }
      // }



/*
Function to Populate the Selectors
*/

function populateSelects(dropDownConfig) {

  if (inputStudentName.value == '' || pronoun == 'unknown') {
    pronoun = "No name";
    studentName = "None";
    console.log(`You have not entered a student name: ${studentName}.`);
    console.log(`You have selected pronoun: ${pronoun}.`);

    document.querySelector('.errorContent').innerHTML += `
    <strong>Oops!</strong> You must enter a student name AND a gender before you can begin.
    `;
  } else {
    
    document.querySelector('.hiddenForm').style.display = "block";
    studentName = document.querySelector('input.inputStudentName').value;
  
    //  Dropdown Options
    let progressOptions = [`${studentName} has made excellent progress, ${pronoun} has worked hard, and ${pronounAlternative} future looks bright.`,
   `${studentName} has made good progress, ${pronoun} has put a lot of effort into their work, and ${pronounAlternative} work is always completed to a high standard..`,
   `${studentName} has made poor progress, ${pronoun} has not been committed to their work, and ${pronounAlternative} work is often of a poor standard.`];
    let behaviourOptions = [`${studentName} has excellent behaviour`, `${studentName} has good behaviour`, `${studentName} has poor behaviour`];
    let attendanceOptions = [`${studentName} has excellent attendance`, `${studentName} has good attendance`, `${studentName} has poor attendance`];
    let punctualityOptions = [`${studentName} has excellent punctuality`, `${studentName} has good punctuality`, `${studentName} has poor punctuality`];
    let improvementsOptions = [`${studentName} should carry on as they have`, `${studentName} could make some improvements`, `${studentName} must improve`];

    // Create Dropdown Config Object
    dropDownConfig = [{
      id: "progressDropdown",
      categoryOptions: progressOptions
    },
    {
      id: "behaviourDropdown",
      categoryOptions: behaviourOptions
    },
    {
      id: "attendanceDropdown",
      categoryOptions: attendanceOptions
    },
    {
      id: "punctualityDropdown",
      categoryOptions: punctualityOptions
    },
    {
      id: "improvementsDropdown",
      categoryOptions: improvementsOptions
    },
    ];
    
    for (let di = 0; di < dropDownConfig.length; di++) {
      for (let i = 0; i < dropDownConfig[di].categoryOptions.length; i++) {
        let opt = dropDownConfig[di].categoryOptions[i];

        let el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        document.getElementById(dropDownConfig[di].id).add(el);
      }
    }
  }
}

/*
Button to Add Student Name
*/

buttonStudentName.addEventListener('click', () => {
  populateSelects(dropDownConfig);
});
 
/*
Function which will collate all of the selections in a finalReport
*/

function printSelection(e) {
  let selection = e.value;
    if (selection === e.value) {
      collatedArray.push(e.value);
      console.log(collatedArray);
    } else {
  }
}

/*
Add listener to buttonCollateReport button
*/

buttonCollateReport.addEventListener('click', () => {
  document.querySelector('.formContainer').innerHTML = `
  <h2>${studentName}'s Report</h2>
  <h4>Progress</h4>
  <p class="reportP">${collatedArray[0]}</p>
  <h4>Behaviour</h4>
  <p>${collatedArray[1]}</p>
  <h4>Attendance</h4>
  <p>${collatedArray[2]}</p>
  <h4>Punctuality</h4>
  <p>${collatedArray[3]}</p>
  <h4>Improvement</h4>
  <p>${collatedArray[4]}.</p>
  <hr>
  <button class="buttonRestartReport" onClick="window.location.reload()">Create new report</button>
  `;
});
