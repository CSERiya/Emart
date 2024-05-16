import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <>
        <MetaData title="Search A Product -- ECOMMERCE" />
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input
                    type='text'
                    placeholder='Search a Product ...'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type='submit' value='Search' />
            </form>
        </>
    );
};

export default Search;

