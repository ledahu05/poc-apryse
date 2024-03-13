import React, { useState } from 'react';
import { TabsProvider } from './context/tabs-context';
import TabList from './components/TabsList';
import { ApryseProvider } from './context/ApryseContext';
import { store } from './store';
import { Provider } from 'react-redux';
const App = () => {
    return (
        <Provider store={store}>
            <TabsProvider>
                <ApryseProvider>
                    <TabList />
                </ApryseProvider>
            </TabsProvider>
        </Provider>
    );
};

export default App;
