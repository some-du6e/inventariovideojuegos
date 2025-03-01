function main() {
  // get rid of loader
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
  const igdb_info = document.getElementById('igdb-info');
  // check if user knows about the igdb stuff
  try {
    const igdb = window.localStorage.getItem('knowaboutigdb');
    if (igdb === null) {
      igdb_info.open = "true"
      window.localStorage.setItem('igdb', igdb);
    }
  } catch (e) {
    console.error(e);
  }
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
function sybau(){
  window.localStorage.setItem('knowaboutigdb', 'true');
  window.location.reload();
}
function dumbahh() {
  const igdb_info = document.getElementById('igdb-info');
  igdb_info.open = "true";
}
function submit() {
  const igdb_url = document.getElementById('igdb-link').value;
  const game_stock = document.getElementById('game-stock').value;
  if (igdb_url === '' || game_stock === '') {
    alert('hagalo todo');
    return;
  }
  if (!igdb_url.startsWith('https://www.igdb.com/games/')) {
    alert('link de igdb no valido');
    return;
  }
}
document.addEventListener('DOMContentLoaded', main);
document.addEventListener('DOMContentLoaded', titlestuff);
document.getElementById('sybau').addEventListener('click', sybau);
document.getElementById('submit').addEventListener('click', submit);
document.getElementById('dumbahh').addEventListener('click', dumbahh);