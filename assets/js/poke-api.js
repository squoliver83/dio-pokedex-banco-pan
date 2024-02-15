
const pokeApi = {}

function convertApiPokemonToPokemonModel(apiPokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.idNumber = apiPokemonDetail.id;
    pokemon.idNumber = pokemon.idNumber.toString().padStart(3, '0');
    pokemon.name = apiPokemonDetail.name;
    
    const types = apiPokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.type = type;
    pokemon.types = types;

    pokemon.artwork = apiPokemonDetail.sprites.other["official-artwork"].front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertApiPokemonToPokemonModel)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
            .then((res) => res.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailRequest) => Promise.all(detailRequest))
            .then((pokemonsDetails) => pokemonsDetails)
}

