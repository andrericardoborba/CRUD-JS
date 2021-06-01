const inputName = document.querySelector("#inputName");
let globalNames = ["HTML", "CSS", "JAVASCRIPT", "NODE", "VUE"];
let currentIndex = null;
let isEditing = false;

const preventFormSubmit = () =>{
  const handleFormSubmit = (event)=> {
    event.preventDefault();
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

const activateInput = () =>{
  const insertName = (newName)=> {
    globalNames = [...globalNames, newName];
    render();
  }

  const updateName = (newName)=> {
    globalNames[currentIndex] = newName;
  }

  const handleTyping = (event)=> {
    const isNotInputEmpty = event.key === "Enter" && event.target.value.trim() !== ""
    if (isNotInputEmpty) {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

const render = () =>{
  const createDeleteButton = (index)=> {
    const deleteName = () =>{
      globalNames = globalNames.filter((_, i) => i !== index);
      render();
    }
    const button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "x";

    button.addEventListener("click", deleteName);

    return button;
  }

  const createSpan = (name,index)=> {
    const editItem = () =>{
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    const span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = name;

    span.addEventListener("click", editItem);

    return span;
  }

  const divNames = document.querySelector("#names");
  divNames.innerHTML = "";
  //Criar ul
  const ul = document.createElement("ul");

  //Fazer n li's, conforme o tamanho de globalNames
  for(let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];

    const li = document.createElement("li");

    const button = createDeleteButton(i);
    const span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

const clearInput = () =>{
  inputName.value = "";
  inputName.focus();
}

preventFormSubmit();
activateInput();
render();