function main() {
  console.log('Hello World!');
}
function titlestuff() {
  const titles = [
    'Xxx_Inventario_xxx',
    'xXx_Inventario_xxx',
    'xxX_Inventario_xxx',
    'xxx_Inventario_Xxx',
    'xxx_Inventario_xXx',
    'xxx_Inventario_xxX',
  ];
  let index = 0;
  const stupidahhtitle = document.getElementById('sigmaboytitle');
  setInterval(() => {
    document.title = titles[index];
    stupidahhtitle.innerText = titles[index];
    index = (index + 1) % titles.length;
  }, 500);
}

document.addEventListener('DOMContentLoaded', main);
document.addEventListener('DOMContentLoaded', titlestuff);
document.getElementById('add-button').addEventListener('click', function () {
  alert('sigma');
});
