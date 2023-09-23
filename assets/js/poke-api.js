
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.photoDetail = pokeDetail.sprites.other.home.front_default

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.experience = pokeDetail.base_experience
    pokemon.height = pokeDetail.height

    const statsNames = pokeDetail.stats.map((statsName) => statsName.stat.name)
    const [statsName] = statsNames
    pokemon.statsNames = statsNames
    pokemon.statsName = statsName

    const stats = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat)
    const [stat] = stats
    pokemon.stats = stats
    pokemon.stat = stat
    
    pokemon.weight = pokeDetail.weight
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        
}

// // Adicione um evento de clique aos elementos da lista
// document.addEventListener("DOMContentLoaded", () => {
//     const listContainer = document.getElementById("pokemonList");

//     pokemonList.forEach(pokemonSelected => {
//         const listItem = document.createElement("li");
//         listItem.textContent = pokemonSelected;

//         listItem.addEventListener("click", () => {
//             fillPokemonDetails(pokemonSelected);
//         });

//         listContainer.appendChild(listItem);
//     });
// });