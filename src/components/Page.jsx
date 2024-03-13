import LoadDocument from './LoadDocument';
import ApryseViewer from './ApryseViewer';
import useCurrentViewerTabs from '../hooks/useCurrentViewerTabs';
import { useTabs } from '../context/tabs-context';
export const Page = ({ tabId }) => {
    const { activeTab } = useTabs();
    const { files } = useCurrentViewerTabs(activeTab.tabId);
    return (
        <div className='p-4 flex-1 flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
                {tabId}
            </h1>
            <LoadDocument />
            {files.length > 0 && (
                <ApryseViewer files={files} tabIndex={activeTab.tabIndex} />
            )}
        </div>
    );
};
