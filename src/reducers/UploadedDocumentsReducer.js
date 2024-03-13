import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     0: { // First UseCaseTab
//         documents: [
//             {
//                 id: 0,
//                 filename: 'document1.pdf',
//                 url: 'blob:http://localhost:3000/7dfe2cbf-a830-4df5-ae79-b6a95054a7db'
//
//             }
//         ],
//         viewerTabs: [0] //Viewer first tabs display document with id 0
//         activeViewerTab: 0 // The active tab is the first one
//     },
//     1: {// Second UseCaseTab
//         documents: [
//             {
//                 id: 0,
//                 filename: 'document2.docx'
//                 url: 'blob:http://localhost:3000/7dfe2cbf-a830-4df5-ae79-b6a95054a7db'
//             },
//             {
//                 id: 1,
//                 filename: 'document3.jpg'
//                 url: 'blob:http://localhost:3000/7dfe2cbf-a830-4df5-ae79-b6a95054a7db'
//             },
//             {
//                 id: 2,
//                 filename: 'document4.xlsx'
//                 url: 'blob:http://localhost:3000/7dfe2cbf-a830-4df5-ae79-b6a95054a7db'
//             }
//         ],
//         viewerTabs: [0, 1, 2] //Viewer has 3 tabs, each displaying a different document (id 0, 1, 2)
//         activeViewerTab: 1 // The active tab is the first one
//     }
// };

const initialState = {
    apryseInstance: null
};

const uploadedDocumentsSlice = createSlice({
    name: 'uploadedDocuments',
    initialState,
    reducers: {
        resetUseCaseTab: (state, action) => {
            const { useCaseTabIndex } = action.payload;
            state[useCaseTabIndex] = {};
        },
        addFiles: (state, action) => {
            const { useCaseTabIndex, files, type = 'create' } = action.payload;

            console.log('addFiles', type);
            //files is an array of file. Each file contains the id of the document to be displayed and the filename

            if (state[useCaseTabIndex] === undefined) {
                state[useCaseTabIndex] = {
                    documents: files.map((file, index) => {
                        return {
                            id: file.name,
                            filename: file.name,
                            url: file.url,
                            extension: file.extension
                        };
                    }),
                    viewerTabs: files.map((file, index) => {
                        return file.name;
                    }),
                    //set the active tab to the last one
                    activeViewerTab: files[files.length - 1].name
                };
            } else if (type === 'append') {
                //if the use case tab exists, add the files to the documents array
                state[useCaseTabIndex].documents.push(
                    ...files.map((file, index) => {
                        return {
                            id: file.name,
                            filename: file.name,
                            url: file.url
                        };
                    })
                );
                state[useCaseTabIndex].viewerTabs.push(
                    ...files.map((file, index) => {
                        return file.name;
                    })
                );
                state[useCaseTabIndex].activeViewerTab =
                    files[files.length - 1].name;
            } else {
                //default to create aka owervrite
                state[useCaseTabIndex] = {
                    documents: files.map((file, index) => {
                        return {
                            id: file.name,
                            filename: file.name,
                            url: file.url
                        };
                    }),
                    viewerTabs: files.map((file, index) => {
                        return file.name;
                    }),
                    //set the active tab to the last one
                    activeViewerTab: files[files.length - 1].name
                };
            }
        },
        closeFile: (state, action) => {
            const { useCaseTabIndex, fileId } = action.payload;
            const documentIndex = state[useCaseTabIndex].documents.findIndex(
                (document) => document.id === fileId
            );
            state[useCaseTabIndex].documents.splice(documentIndex, 1);
            //set active tab to the last one
            state[useCaseTabIndex].viewerTabs.splice(viewerTabIndex, 1);
        },
        selectViewerActiveTab(state, action) {
            const { useCaseTabId, fileId } = action.payload;
            state.useCaseTabs[useCaseTabId].activeViewerTab = fileId;
        }
        // ... other reducers for uploading, removing documents etc.
    }
});

export const { resetUseCaseTab, addFiles, closeFile, selectViewerActiveTab } =
    uploadedDocumentsSlice.actions;
export default uploadedDocumentsSlice.reducer;
