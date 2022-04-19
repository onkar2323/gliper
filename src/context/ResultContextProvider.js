import React, { useContext, useState, createContext } from 'react';

const ResultContext = createContext();

const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState('Elon Musk');

    const getResults = async (type) => {
        setIsLoading(true);

        const response = await fetch(baseUrl + type, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': 'c38e92afabmsh412dee2f5861afbp1560e8jsn5c68d5f6d647'
            }
        });

        const data = await response.json();

        
        if(type.includes('/news')){
            setResults(data.entries);
        } else if(type.includes('/image')){
            setResults( data.image_results);
        } else{
            setResults(data.results);
        }

        
        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchData, setSearchData, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);