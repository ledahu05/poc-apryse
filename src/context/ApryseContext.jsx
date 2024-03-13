import React, { createContext, useContext, useMemo, useState } from 'react';

// Create a context
const ApryseContext = createContext(null);
import useCurrentTab from '../hooks/useCurrentTab';
// Create a provider component
export const ApryseProvider = ({ children }) => {
    const [tabInstances, setTabInstances] = useState({});

    const setInstance = (tabId, instance) => {
        setTabInstances((prevInstances) => ({
            ...prevInstances,
            [tabId]: instance
        }));
    };

    console.log('tabInstances', tabInstances);

    const contextValue = useMemo(
        () => ({
            tabInstances,
            setInstance
        }),
        [tabInstances]
    );

    return (
        <ApryseContext.Provider value={contextValue}>
            {children}
        </ApryseContext.Provider>
    );
};

// Custom hook to access the context
// export const useApryse = (tabId) => {

//     const { tabInstances, setInstance } = useContext(ApryseContext);
//     if (!tabInstances.hasOwnProperty(tabIndex)) {
//         throw new Error('Tab instance not found');
//     }
//     return [tabInstances[tabIndex], setInstance.bind(null, tabIndex)];
// };

export const useApryse = (tabId) => {
    const currentTab = useCurrentTab();
    const tabIndex = 'default';
    const { tabInstances, setInstance } = useContext(ApryseContext);

    const getInstance = () => {
        if (!tabInstances.hasOwnProperty(tabIndex)) {
            return null;
            // setInstance(tabIndex, /* initial instance */); // You need to provide an initial instance here
        }
        return tabInstances[tabIndex];
    };

    return [getInstance(), setInstance.bind(null, tabIndex)];
};
