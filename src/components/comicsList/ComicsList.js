import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {

    const {loading, error, getAllComics} = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [dis, setDis] = useState(false);
    const [useSpinner, setUseSpinner] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, getSpinner) => {
        const comicsSpinner = getSpinner ? setUseSpinner(true) : setUseSpinner(false);
        setDis(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (NewComicsList) => {
        setComicsList([...comicsList, ...NewComicsList]);
        setOffset(offset + 8);
        setDis(false);
    }

    const renderComics = (arr) => {
        const comics = arr.map((item, i) => {
            
            return (
                <li className="comics__item" key={i}>
                    <Link to={`${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
            
        });

        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        )
    } 
    
    const finalComics = renderComics(comicsList);
    const spinner = loading && useSpinner ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {finalComics}
            {spinner}
            {errorMessage}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={dis}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList;