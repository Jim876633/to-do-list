const form = document.querySelector(".form");
const formBtn = form.querySelector("button");
const clearBtn = document.querySelector(".list__clear");
const text = document.querySelector(".form__text");
const alert = document.querySelector(".alert__text");
const list = document.querySelector(".list");
let editId = "";

//渲染 alert
function showAlert(color, text) {
    alert.innerHTML = `<p>${text}</p>`;
    alert.classList.add(color);
    //0.6s 後消失
    timeID = setTimeout(() => alert.classList.remove(color), 1000);
}

//加入 item
function addItem() {
    const itemsArg = JSON.parse(localStorage.getItem("list")) || [];
    if (text.value == "") {
        showAlert("red", "Please Enter Value");
    } else {
        showAlert("green", "Add To The List");
        const id = String(Date.now());
        itemsArg.push({
            id: id,
            item: text.value,
        });
        localStorage.setItem("list", JSON.stringify(itemsArg));
        showList();
    }
    form.reset();
}

//渲染畫面
function showList() {
    const itemsArg = JSON.parse(localStorage.getItem("list")) || [];
    list.innerHTML = itemsArg
        .map(
            (item) => `
                <li class="list__item" id=${item.id}>
                    <p class="list__item--text">${item.item}</p>
                    <button class="list__item--edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="list__item--delet">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </li>`
        )
        .join("");
}

//刪除 item
function deletItem(element) {
    const itemsArg = JSON.parse(localStorage.getItem("list"));
    newArg = itemsArg.filter((item) => item.id !== element.id);
    localStorage.setItem("list", JSON.stringify(newArg));
    showAlert("red", "Delet Item");
    showList();
}

//編輯 item
function editItem(target) {
    form.removeEventListener("submit", (e) => {
        e.preventDefault();
        if (formBtn.textContent == "Edit") changeItem(target);
    });
    text.value = target.querySelector(".list__item--text").textContent;
    text.classList.add("edit");
    formBtn.textContent = "Edit";
    editId = target.id;
}

//提交編輯後 item
function changeItem() {
    const itemsArg = JSON.parse(localStorage.getItem("list"));
    if (text.value == "") {
        showAlert("red", "Please Enter Value");
    } else {
        showAlert("green", "Changed Item");
        const newArg = itemsArg.map((item) => {
            if (item.id == editId) return { id: editId, item: text.value };
            return item;
        });
        localStorage.setItem("list", JSON.stringify(newArg));
        showList();
        formBtn.textContent = "Submit";
        text.classList.remove("edit");
        form.reset();
    }
}

//清除全部
function clearList() {
    showAlert("red", "Clear All");
    localStorage.removeItem("list");
    editId = "";
    showList();
}

//監聽事件
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formBtn.textContent == "Submit") addItem();
    if (formBtn.textContent == "Edit") changeItem();
});
clearBtn.addEventListener("click", clearList);
window.addEventListener("DOMContentLoaded", showList);
list.addEventListener("click", (e) => {
    if (!e.target.matches(".fa-solid")) return;
    if (e.target.matches(".fa-trash"))
        deletItem(e.target.parentNode.parentNode);
    if (e.target.matches(".fa-pen-to-square"))
        editItem(e.target.parentNode.parentNode);
});

console.log("new-featrue");
