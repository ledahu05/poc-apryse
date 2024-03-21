import React from 'react';
import { useTabs } from '../context/tabs-context';
import { Page } from './Page';
import { useDispatch } from 'react-redux';

const TabList = () => {
    const dispatch = useDispatch();
    const { tabs, activeTab, removeTab, setActive, addTab } = useTabs();
    // const instance = useInstance();

    const handleSetActive = (tabId) => {
        // instance.UI.TabManager.setActiveTab(tabId, false);
        setActive({ tabId });
    };

    console.log('TabList', activeTab);
    return (
        <div className='flex flex-col h-screen'>
            <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>
                Multi Instance of Webviewer
            </p>
            <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
                {tabs.map((tab) => (
                    <li
                        key={tab.tabId}
                        className={`cursor-pointer p-2 ${
                            activeTab.tabId === tab.tabId
                                ? 'me-2 inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
                                : 'me-2 inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                        }`}
                        onClick={() => handleSetActive(tab.tabId)}
                    >
                        <span className='mr-2'>{tab.tabId}</span>
                    </li>
                ))}
                <li
                    className='cursor-pointer me-2 inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                    onClick={() => addTab()}
                >
                    +
                </li>
            </ul>
            <Page tabId={activeTab.tabId} />
        </div>
    );
};

export default TabList;
