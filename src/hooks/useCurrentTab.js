import { useTabs } from '../context/tabs-context';

const useCurrentTab = () => {
    const { activeTab } = useTabs();
    return activeTab.tabId;
};

export default useCurrentTab;
