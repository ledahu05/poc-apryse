// src/components/LoadDocument.js

import React, { useEffect, useRef, useState } from 'react';

export default function SearchDocument() {
    const instance = useInstance();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const search = () => {
        const { documentViewer, Annotations, Search } = instance.Core;
        documentViewer.setSearchHighlightColors({
            searchResult: new Annotations.Color(0, 0, 255, 0.5),
            activeSearchResult: 'rgba(0, 255, 0, 0.5)'
        });
        console.log('document loaded');

        const mode = Search.Mode.PAGE_STOP | Search.Mode.HIGHLIGHT;
        const searchOptions = {
            // If true, a search of the entire document will be performed. Otherwise, a single search will be performed.
            fullSearch: true,
            // The callback function that is called when the search returns a result.
            onResult: (result) => {
                console.log('result', result);
                // with 'PAGE_STOP' mode, the callback is invoked after each page has been searched.
                if (result.resultCode === Search.ResultCode.FOUND) {
                    documentViewer.displaySearchResult(result);
                    const textQuad = result.quads[0].getPoints(); // getPoints will return Quad objects
                    console.log(textQuad);
                    // now that we have the result Quads, it's possible to highlight text or create annotations on top of the text
                }
            }
        };

        documentViewer.textSearchInit(searchQuery, mode, searchOptions);

        documentViewer.setSearchHighlightColors({
            // setSearchHighlightColors accepts both Annotations.Color objects or 'rgba' strings
            searchResult: new Annotations.Color(0, 0, 255, 0.5),
            activeSearchResult: 'rgba(0, 255, 0, 0.5)'
        });
    };
    // const load = () => {
    //   instance.UI.loadDocument('http://yourwebsite.com/file.pdf');
    // };

    return (
        <div className='max-w-md mx-auto'>
            <label
                htmlFor='default-search'
                className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
                Search
            </label>
            <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                    <svg
                        className='w-4 h-4 text-gray-500 dark:text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        />
                    </svg>
                </div>
                <input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    type='search'
                    id='default-search'
                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Search quote'
                    required
                />
                <button
                    onClick={search}
                    className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Search
                </button>
            </div>
        </div>
    );
}
