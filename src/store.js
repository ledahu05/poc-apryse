import { configureStore } from '@reduxjs/toolkit';
import uploadedDocumentsReducer from './reducers/UploadedDocumentsReducer';
export const store = configureStore({
    reducer: {
        uploadedDocuments: uploadedDocumentsReducer
    }
});

export {
    resetUseCaseTab,
    addFiles,
    closeFile,
    selectViewerActiveTab
} from './reducers/UploadedDocumentsReducer';
