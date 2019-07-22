const randomAPIurl = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, login, phone, dob &noinfo &nat=US`;
const gridContainer = document.getElementById('grid-container');
const overlay = document.querySelector(".overlay")
const modalContent = document.querySelector(".modal-content");



//fetch random employee API

fetch(randomAPIurl)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


//using data from fetch to display in html

function displayEmployees(personData) {
    employees = personData;
    let employeeHTML = "";
    employees.forEach((employee, index) => {
      let { email, location: { city, street, state, postcode}, login: {username}, name, phone, picture } = employees[index] || {};
        employeeHTML += `
        <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}">
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        </div>
        </div>
        `
    });
  gridContainer.innerHTML = employeeHTML;
}


  // modal window display function

  function displayModal(index, callback) {
  			let { name, dob, phone, email, location: { city, street, state, postcode}, picture} = employees[index];
  			let date = new Date(dob.date);
  			const modalHTML = `
            <button class="modal-close">X</button>
  					<img class="avatar" src="${picture.large}" />
  					<div class="text-container">
  					<h2 class="name">${name.first} ${name.last}</h2>
  					<p class="email">${email}</p>
  					<p class="city">${city}</p>
  					<hr />
  					<p class="phone">${phone}</p>
  					<p class="address">${street}, ${state} ${postcode}</p>
  					<p class="birthday">Date of birth: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  					</div>	`;
  			overlay.classList.remove("hidden");
  			modalContent.innerHTML = modalHTML;

        //close modal window display on X
        const modalClose = document.querySelector(".modal-close")
        modalClose.addEventListener("click", () => {
            overlay.classList.add("hidden");
          });
  }

  //click on card to open modal window

  gridContainer.addEventListener("click", () => {
    const card = event.target.closest(".card");
    const index = card.getAttribute("data-index");
    displayModal(index);
  });
