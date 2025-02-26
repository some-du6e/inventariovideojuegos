function main() {
  console.log('Hello World!');
}
function titlestuff() {
  const titles = ["-__Inventario__", "_-_Inventario__", "__-Inventario___", "___Inventario-__", "___Inventario_-_", "___Inventario__-"];
let index = 0;

setInterval(() => {
    document.title = titles[index];
    index = (index + 1) % titles.length;
}, 500);
}

document.addEventListener('DOMContentLoaded', main);
document.addEventListener('DOMContentLoaded', titlestuff);