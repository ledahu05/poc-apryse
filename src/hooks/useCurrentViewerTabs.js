import { useSelector } from 'react-redux';
const useCurrentViewerTabs = (activeTab) => {
    return useSelector((state) => {
        const tabs = state.uploadedDocuments[activeTab]
            ? state.uploadedDocuments[activeTab].viewerTabs
            : [];
        const files = state.uploadedDocuments[activeTab]
            ? state.uploadedDocuments[activeTab].documents
            : [];
        return { tabs, files };
    });
};

export default useCurrentViewerTabs;
