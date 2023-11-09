//função de mudar imagem pelo id e pela url
function changeImage(id, url) {
  document.getElementById(id).src = url;
}
//função de mudar texto pelo id e pelo texto
function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

// Daqui para baixo voce ira escrever
// o código para resolver o desafio

// Utilitários
const APIURL  = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292";
const POKEMONS = [];
let actual = 0;

// Procurar imagem pela url
async function fetchImage(url){
  return await fetch(url).then((response)=>response.json())
                  .then((data) => data.sprites.front_default);
}

// Popular array
async function fetchPokemons(){
  await fetch(APIURL).then((response)=>response.json())
  .then((data)=>data.results.map((results)=> POKEMONS.push(results)));
}

// Mudar dados no frontend
function changeData(img){
  changeImage("img_sprite_front_default",img);
  changeText("name",POKEMONS[actual].name)
}

async function previousPokemon() {
  if(POKEMONS.length == 0)
    await fetchPokemons();

  actual == 0 ? actual = 1291 : actual--;

  changeData(await fetchImage(POKEMONS[actual].url));
}

async function nextPokemon() {
  if(POKEMONS.length == 0)
    await fetchPokemons();

  actual == 1291 ? actual = 0 : actual++;

  changeData(await fetchImage(POKEMONS[actual].url));
}
