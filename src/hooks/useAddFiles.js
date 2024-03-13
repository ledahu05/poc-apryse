import { useDispatch } from 'react-redux';
import { addFiles as addFilesAction } from '../store';
import useCurrentTab from './useCurrentTab';

const useAddFiles = () => {
    const currentTab = useCurrentTab();
    const dispatch = useDispatch();
    const addFiles = (files) => {
        dispatch(
            addFilesAction({
                files: files.map(({ extension, fileUrl, filename }) => ({
                    name: filename,
                    url: fileUrl,
                    extension
                })),
                useCaseTabIndex: currentTab
            })
        );
    };
    return addFiles;
};

export default useAddFiles;
