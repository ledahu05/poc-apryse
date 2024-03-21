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

    console.log('tabData', tabData);

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
        console.log('tabData setInstanceData', data);
        const clonedViewerRef = { ...data.viewerRef };
        const clonedBeenInitialsedRef = { ...data.beenInitialisedRef };
        console.log('tabData setInstanceData', {
            clonedViewerRef,
            clonedBeenInitialsedRef
        });

        const newRef = clonedViewerRef.current
            ? { viewerRef: clonedViewerRef }
            : {};

        setData(tabIndex, {
            ...data,
            beenInitialisedRef: clonedBeenInitialsedRef,
            ...newRef
        });
    };

    return [getInstance(), setInstanceData];
};
