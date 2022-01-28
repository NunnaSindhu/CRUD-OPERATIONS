//select the target element to display the data source
const display = document.querySelector(".user-list");
display.innerHTML = "";
const url = "https://61ea3a257bc0550017bc65e1.mockapi.io/user";
async function getData() {
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let result = await data.json();   
    return result;
  } catch (e) {
    display.innerHTML=e;
  }
}


//logic to display the data
async function displayData() { 
  display.innerHTML=""; 
  let usersData = await getData();
  usersData.forEach((user) => {
    // console.log(user.name);
    display.innerHTML += `       
        <div class="user-container">
        <img class="user-avatar" src="${user.avatar}" alt="avatar">
        <div class="username"><h5>${user.name}</h5>
        <h6>ID:${user.id}</h6>
        <button onclick="deleteUser(${user.id})">Delete</button>
        <button onclick="editUser(${user.id})">Edit</button>
        </div>
        </div>`;
  });
}
displayData();


//Logic to create and send the data to api
async function addUser() { 
  //select the input elements
let addUserName = document.querySelector(".add-user-name").value;
let addAvatar = document.querySelector(".add-user-avatar").value;
  let userdata = {
    name: addUserName,
    avatar: addAvatar,
  };
     
  try {
    let data = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: { "Content-Type": "application/json" },
    });
    const users = await data.json();
    displayData(users);
    //Logic to clear input fields after creating data
document.querySelector(".add-user-name").value ="";
document.querySelector(".add-user-avatar").value ="";
  } catch (e) {
    display.innerHTML = e;
  }  
}


//Logic to delete userdata from api
async function deleteUser(id) {
  try {
    let data = await fetch(
      `https://61ea3a257bc0550017bc65e1.mockapi.io/user/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const users = await data.json();
    // console.log(users);
    displayData();
  } catch (e) {
    display.innerHTML = e;
  }
}

//Logic to update the data in api
async function editUser(id) {  
  let usersData = await getData();
  // console.log(usersData,id);
 const data=usersData.find(u => u.id == id);
  console.log(data);
  let addUserName = document.querySelector(".add-user-name");
  let addAvatar = document.querySelector(".add-user-avatar");
    addUserName.value=data.name;
    addAvatar.value=data.avatar;
    let userdata = {
        name: addUserName.value,
        avatar: addAvatar.value,
      };
      console.log(addUserName,addAvatar); 
  try {
    const data = await fetch(
      `https://61ea3a257bc0550017bc65e1.mockapi.io/user/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(userdata),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result= await data.json();
    displayData();
  } catch (e) {
    display.innerHTML = e;
  }
}
