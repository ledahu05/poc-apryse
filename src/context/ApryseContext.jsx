import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useRef
} from 'react';

// Create a context
const ApryseContext = createContext(null);
import useCurrentTab from '../hooks/useCurrentTab';
// Create a provider component
export const ApryseProvider = ({ children }) => {
    const [tabData, setTabData] = useState({});

    const setData = (tabId, data) => {
        setTabData((prevData) => ({
            ...prevData,
            [tabId]: data
        }));
    };

    console.log('tabData finalViewerRef', tabData);

    const contextValue = useMemo(
        () => ({
            tabData,
            setData
        }),
        [tabData]
    );

    return (
        <ApryseContext.Provider value={contextValue}>
            {children}
        </ApryseContext.Provider>
    );
};

export const useApryse = (tabId) => {
    const currentTab = useCurrentTab();

    const tabIndex = tabId || currentTab;
    const { tabData, setData } = useContext(ApryseContext);

    const getInstance = () => {
        if (!tabData.hasOwnProperty(tabIndex)) {
            return {
                instance: null,
                viewerRef: null,
                initializedRef: null
            };
        }

        return tabData[tabIndex];
    };

    const setInstanceData = (data) => {
        const clonedViewerRef = { ...data.viewerRef };
        setData(tabIndex, { ...data, viewerRef: clonedViewerRef });
    };

    return [getInstance(), setInstanceData];
};
