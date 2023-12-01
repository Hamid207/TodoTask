const form = document.querySelector(".formTodo");
const input = document.querySelector(".inputTodo");
const inputValueDeleteBtn = document.querySelector(".input_value_remvuve_btn");
const addBtn = document.querySelector(".add_button");
const result = document.querySelector(".listTodo");
const sortBtn = document.querySelector(".sort");

const items = JSON.parse(localStorage.getItem("items"))
  ? JSON.parse(localStorage.getItem("items"))
  : [];

// document.addEventListener("click", (e) => {
//   console.log(e.target.classList.contains("inputLi"));
// });

//Form - EVENT
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    addElemet(true);
  }
  inputValueDeleteBtnHidden();
});

//AddBtn - EVENT
addBtn.addEventListener("click", () => {
  if (input.value !== "") {
    addElemet(true);
  }
  inputValueDeleteBtnHidden();
});

//InputValueDeleteBtn - EVENT
inputValueDeleteBtn.addEventListener("click", (e) => {
  inputValueDeleteBtnHidden();
});

//SortBtn - EVENT
sortBtn.addEventListener("click", () => {
  items.reverse();
  ``;
  localStoragesetItem(items, "items");
  location.reload();
});

//AddElemets And Events
function addElemet(isNew, element, id) {
  const li = document.createElement("li");
  li.className = "todoLi";
  result.appendChild(li);

  const editForm = document.createElement("form");
  editForm.className = "editForm";
  li.appendChild(editForm);

  const inputLi = document.createElement("input");
  inputLi.className = "inputLi";
  inputLi.value.textContent = input.value;
  editForm.appendChild(inputLi);

  const delBtn = document.createElement("button");
  delBtn.className = "delBtn";
  delBtn.textContent = "X";
  li.appendChild(delBtn);

  //Delete button event
  delBtn.addEventListener("click", () => {
    result.removeChild(li);
    removeItem(id);
  });

  if (isNew == true) {
    addTextInObject(input.value, inputLi, li);
  } else {
    inputLi.value = element.text;
    li.id = id;
  }

  //Edit li - EVENT
  let newTodoIndex = null;
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (id !== undefined) {
      items[items.findIndex((name) => name.id == id)].text = inputLi.value;
      localStoragesetItem(items, "items");
    } else {
      items[newTodoIndex].text = inputLi.value;
      localStoragesetItem(items, "items");
    }
  });

  //InputLi - EVENT
  inputLi.addEventListener("click", () => {
    let index = items.findIndex(
      (name) => name.id == items.find((name) => name.text == inputLi.value).id
    );
    newTodoIndex = index;
  });

  input.value = "";
}

//AddTextInObject
function addTextInObject(text, value, list) {
  const item = {
    text: text,
    id: Math.floor(Math.random() * 1000000000000000),
  };
  items.push(item);
  localStoragesetItem(items, "items");

  items
    .map((elemet) => {
      value.value = elemet.text;
      list.id = elemet.id;
    })
    .join("");
}

//RemoveItem
function removeItem(id) {
  if (items.length !== 0) {
    items.splice(
      items.findIndex((name) => name.id == id),
      1
    );
    localStoragesetItem(items, "items");
  }
}

//Input - EVENT
input.addEventListener("input", () => {
  if (input.value === "") {
    inputValueDeleteBtn.style.opacity = 0;
  } else {
    inputValueDeleteBtn.style.opacity = 1;
  }
});

//InputValueDeleteBtnHidden
function inputValueDeleteBtnHidden() {
  inputValueDeleteBtn.style.opacity = 0;
}

//LocalStoragesetItem
function localStoragesetItem(arr, name) {
  localStorage.setItem(name, JSON.stringify(arr));
}

//Reload
function reload() {
  items
    .map((elemet) => {
      addElemet(false, elemet, elemet.id);
    })
    .join("");
}
reload();
