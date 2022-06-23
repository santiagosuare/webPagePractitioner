const socket = io();
const btnSave = document.querySelector("#btn-save");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const url = document.querySelector("#url");
const container = document.getElementById("hbs-products");

console.log(btnSave);
btnSave.addEventListener("click", saveProduct);

function saveProduct() {
  socket.emit("client:newProduct", {
    name: name.value,
    price: price.value,
    url: url.value,
  });
  clearForm();
}

function clearForm() {
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#url").value = "";
}

socket.on("server:sendProducts", async (products) => {
  const resp = await fetch("./products.hbs");
  const hbs = await resp.text();
  const template = Handlebars.compile(hbs);
  const html = template({ products });
  container.innerHTML = html;
});
