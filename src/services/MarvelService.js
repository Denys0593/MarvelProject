import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=ddd70e5285b13001396c7637e553169d'
    const _baseOffset = 210;
    const _baseOffsetComics = 0; 



    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffsetComics) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }


    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description ? comics.description : 'There is no description',
            pages: comics.pageCount ? `${comics.pageCount} pages` : 'There is no information',
            language: comics.textObjects.language || "en-us",
            url: comics.urls[0].url,
            price: comics.prices[0].price ? comics.prices[0].price : 'NOT AVAILABLE',
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`
        }
    }

    const _transformCharacter = (char) => {

        let charDescr = !char.description ? 'There is no description for this Character' : char.description

        charDescr = charDescr.length > 100 ? charDescr.slice(0, 100) + '...' : charDescr

        return {
            name: char.name,
            description: charDescr,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;

