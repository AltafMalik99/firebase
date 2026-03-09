// step 1. type module in script 
// step 2 . live server 



import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push, remove, update }
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "my-first-project-9f5c0.firebaseapp.com",
  databaseURL: "https://my-first-project-9f5c0-default-rtdb.firebaseio.com",
  projectId: "my-first-project-9f5c0",
  storageBucket: "my-first-project-9f5c0.appspot.com",
  messagingSenderId: "203135643760",
  appId: "1:203135643760:web:78df44e94d52a9b496c4b5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

let currentUser = "";

/* SIGNUP */
function signup() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passPattern = /^[A-Za-z0-9]+$/;

  if (!emailPattern.test(email)) {
    alert("incomplete form");
    return;
  }

  if (!passPattern.test(password)) {
    alert("pleas enter a password");
    return;
  }

  get(child(ref(db), "users")).then((snapshot) => {

    let users = snapshot.val();
    let emailExists = false;
    let usernameExists = false;

    if (users) {
      for (let key in users) {

        if (users[key].email === email) {
          emailExists = true;
        }

        if (key === username) {
          usernameExists = true;
        }

      }
    }

    if (emailExists) {
      alert("Email already used");
      return;
    }

    if (usernameExists) {
      alert("Username already used");
      return;
    }

    set(ref(db, "users/" + username), {
      username: username,
      email: email,
      password: password
    });

    alert("Signup successful");

    document.getElementById("username").value = "";
document.getElementById("email").value = "";
document.getElementById("password").value = "";

  });
}

window.signup = signup;


// LOGIN
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  get(child(ref(db), "users")).then((snapshot) => {
    let users = snapshot.val();
    let found = false;

    for (let key in users) {
      if (users[key].email === email && users[key].password === password) {
        found = true;
        currentUser = key;

        document.querySelector(".container").style.display = "none";
        document.getElementById("todoPage").style.display = "block";

        showTasks();
      }
    }

    if (!found) {
      alert("user not found");
    }
  });
}

window.login = login;


/* ADD TASK */
function addTask() {
  let task = document.getElementById("taskInput").value;

  if (task.trim() === "") {
    alert("please enter a task");
    return;
  }

  let taskRef = push(ref(db, "tasks/" + currentUser));

  set(taskRef, {
    task: task
  });

  document.getElementById("taskInput").value = "";
  showTasks();
}

window.addTask = addTask;


// SHOW TASKS
function showTasks() {
  get(child(ref(db), "tasks/" + currentUser)).then((snapshot) => {
    let data = snapshot.val();
    let ul = document.getElementById("taskList");

    ul.innerHTML = "";

    if (data) {
      for (let key in data) {
        ul.innerHTML += `
<li>
${data[key].task}
<button onclick="deleteTask('${key}')">Delete</button>
<button onclick="editTask('${key}', '${data[key].task}')">Edit</button>
</li>
`;
      }
    }
  });
}


// DELETE 
function deleteTask(id) {

  let confirmDelete = confirm("");

  if (confirmDelete) {
    remove(ref(db, "tasks/" + currentUser + "/" + id));
    showTasks();
  }

}

window.deleteTask = deleteTask;


// EDIT
function editTask(id, oldTask) {

  let newTask = prompt("Edit task", oldTask);

  if (newTask !== null && newTask.trim() !== "") {
    update(ref(db, "tasks/" + currentUser + "/" + id), {
      task: newTask
    });
  }

  showTasks();
}

window.editTask = editTask;



