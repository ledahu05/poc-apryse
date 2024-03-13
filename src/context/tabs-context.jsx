import React, { createContext, useState, useContext } from 'react';

// Create a context for managing tabs
const TabsContext = createContext();

// Custom hook to use TabsContext
export const useTabs = () => useContext(TabsContext);

function generateRandomWord() {
    const words = [
        'apple',
        'banana',
        'orange',
        'strawberry',
        'grape',
        'watermelon',
        'pineapple',
        'kiwi',
        'blueberry',
        'peach',
        'mango',
        'pear',
        'apricot',
        'cherry',
        'coconut',
        'fig',
        'lemon',
        'lime',
        'pomegranate',
        'plum',
        'raspberry',
        'blackberry',
        'cranberry'
    ];

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// TabsProvider component to wrap your application
export const TabsProvider = ({ children }) => {
    const [tabs, setTabs] = useState([
        { tabId: 'default' },
        { tabId: 'summary' },
        { tabId: 'details' }
    ]);
    //
    const [activeTab, setActiveTab] = useState({
        tabId: 'default',
        tabIndex: 0
    });

    // Function to add a new tab
    const addTab = (tabId) => {
        const newTabId = tabId || generateRandomWord();
        setTabs((prevTabs) => [...prevTabs, { tabId: newTabId }]);
        //set active tab to the new tab
        // setActiveTab(tabId);
        setActiveTab({ tabId: newTabId, tabIndex: tabs.length });
        // if (activeTab === null) setActiveTab(tabId); // Set active tab if no active tab is set
    };

    // Function to remove a tab
    const removeTab = (tabId) => {
        setTabs((prevTabs) => prevTabs.filter((tab) => tab.tabId !== tabId));
        if (activeTab === tabId) setActiveTab(null); // Reset active tab if removed tab was active
    };

    // Function to set the active tab
    const setActive = (tabId) => {
        console.log('setActive', { tabId });
        setActiveTab(
            tabId,
            tabs.findIndex((tab) => tab.tabId === tabId)
        );
    };

    // Value object to provide in the context
    const value = {
        tabs,
        activeTab,
        addTab,
        removeTab,
        setActive
    };

    return (
        <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
    );
};
