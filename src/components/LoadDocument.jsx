// src/components/LoadDocument.js

import { useTabs } from '../context/tabs-context';
import React, { useEffect, useRef } from 'react';
import { useApryse } from '../context/ApryseContext';
import useAddFiles from '../hooks/useAddFiles';

export default function LoadDocument() {
    const addFiles = useAddFiles();
    const { tabs, activeTab, addTab, removeTab, setActive } = useTabs();
    const [instance] = useApryse();

    async function handleFileSelect(event) {
        const files = event.target.files;
        if (!files) return;
        const myFiles = [];

        Array.from(files).forEach((file) => {
            const extension = file.name.split('.').pop(); // Get the file extension
            const fileUrl = URL.createObjectURL(file); // Create URL for the file
            // instance.UI.TabManager.addTab(fileUrl, {
            //     filename: file.name,
            //     setActive: true
            // });
            myFiles.push({ extension, fileUrl, filename: file.name });
        });

        addFiles(myFiles);

        // readFileInputEventAsArrayBuffer(
        //     event,
        //     async function (arrayBuffer, options) {
        //         console.log({ options });
        //         const arr = new Uint8Array(arrayBuffer);
        //         const blob = new Blob([arr], { type: options.fileType });
        //         const { UI } = instance;

        //         // UI.addEventListener(UI.Events.TAB_MANAGER_READY, async () => {
        //         const newtab = await UI.TabManager.addTab(blob, {
        //             filename: options.fileName,
        //             setActive: true
        //         });

        //         addTab(newtab, options.fileName);

        //         setActive(newtab);

        //         console.log({ newtab });
        //         // });
        //         UI.enableFeatures(['MultiTab']);
        //         // instance.UI.loadDocument(blob, { filename: 'myfile.docx' });
        //         // mammoth
        //         //   .convertToHtml({ arrayBuffer: arrayBuffer })
        //         //   .then(displayResult, function(error) {
        //         //     console.error(error);
        //         //   });
        //     }
        // );
    }

    // async function readFileInputEventAsArrayBuffer(event, callback) {
    //     var file = event.target.files[0];
    //     console.log(file);
    //     const [fileName, fileExtension] = file.name.split('.');
    //     console.log({ fileName, fileExtension });
    //     const fileType =
    //         fileExtension === 'docx' ? 'application/docx' : 'application/pdf';

    //     var reader = new FileReader();

    //     reader.onload = function (loadEvent) {
    //         var arrayBuffer = loadEvent.target.result;
    //         // console.log(arrayBuffer);
    //         callback(arrayBuffer, { fileName: file.name, fileType });
    //     };

    //     reader.readAsArrayBuffer(file);
    // }

    // const load = () => {
    //   instance.UI.loadDocument('http://yourwebsite.com/file.pdf');
    // };

    return (
        <div>
            <input
                type='file'
                multiple
                // accept='.docx'
                onChange={handleFileSelect}
                className='mt-4 mb-2 p-2 border border-gray-300 rounded'
            />
        </div>
    );
}
