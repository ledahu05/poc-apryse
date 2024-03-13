import React from 'react';
import { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';
import { useApryse } from '../context/ApryseContext';

const ApryseViewer = ({ files, tabIndex }) => {
    const viewerRef = useRef(null);
    const [data, setInstanceData] = useApryse();
    const { instance, viewerRef: contextViewerRef } = data || {};
    const usedViewerRef = contextViewerRef || viewerRef;
    const beenInitialised = useRef(false);
    console.log('ApryseViewer files', files);

    useEffect(() => {
        async function loadDocuments() {
            if (instance && instance.UI) {
                const allTabs = await instance.UI.TabManager.getAllTabs();

                for (const tab of allTabs) {
                    await instance.UI.TabManager.deleteTab(tab.index);
                }

                // After all tabs are deleted, add new tabs
                files.forEach(({ filename, url }) => {
                    console.log('filename', filename);
                    instance.UI.TabManager.addTab(url, {
                        filename: filename,
                        setActive: true
                    });
                });
            }
        }
        loadDocuments();
    }, [instance, files, tabIndex]);

    console.log('ApryseViewer instance', instance);
    useEffect(() => {
        // if (!instance && ) {
        // if (
        //     !beenInitialised.current
        //     // && !USE_CASES_WITHOUT_APRYSE.includes(currentTab)
        // ) {
        // console.log('beenInitialised', beenInitialised.current);
        // beenInitialised.current = true;
        // setInstanceData({
        //     instance: null,
        //     viewerRef: finalViewerRef,
        //     initializedRef: beenInitialised
        //     // beenInitialised: hasBeenInitialised
        // });
        if (!instance) {
            WebViewer(
                {
                    fullAPI: true,
                    licenseKey: '',
                    path: '/webviewer/lib',
                    enableOfficeEditing: false,
                    disabledElements: [
                        // 'header',
                        'ribbons',
                        'searchButton',
                        'toggleNotesButton',

                        'dropdown-item-toolbarGroup-Annotate',
                        'dropdown-item-toolbarGroup-Shapes',
                        'dropdown-item-toolbarGroup-Insert',
                        'dropdown-item-toolbarGroup-Edit',
                        'dropdown-item-toolbarGroup-Forms',
                        'dropdown-item-toolbarGroup-Drop',
                        'toolbarGroup-Annotate',
                        'toolbarGroup-Shapes',
                        'toolbarGroup-Insert',
                        'toolbarGroup-Edit',
                        'toolbarGroup-Forms',
                        'toolbarGroup-Drop',
                        'contextMenuPopup',
                        'textPopup',
                        'rubberStampToolGroupButton',
                        'freeTextToolGroupButton',
                        'crossStampToolButton',
                        'checkStampToolButton',
                        'dotStampToolButton',
                        'dateFreeTextToolButton',
                        'variables',
                        'freeHandToolGroupButton',
                        'menuButton'
                    ]
                },
                viewerRef.current
            ).then((loadedInstance) => {
                loadedInstance.UI.enableFeatures([
                    loadedInstance.UI.Feature.MultiTab
                ]);
                loadedInstance.UI.setHeaderItems(function (header) {
                    // this depends on the version of WebViewer. You'll want to remove the "divider" object
                    // the "divider" should be at position 1 in version 8.8
                    header.headers.default.splice(1, 10);
                });
                // loadedInstance.UI.disableElements(['header']);
                // loadedInstance.UI.disableElements(['ribbons']);
                // loadedInstance.UI.disableElements(['toolsHeader']);
                // loadedInstance.UI.disableElements(['toolbarGroup-Shapes']);
                // loadedInstance.UI.disableElements(['toolbarGroup-Edit']);
                // loadedInstance.UI.disableElements(['toolbarGroup-Insert']);
                // setInstance(loadedInstance);
                setInstanceData({
                    instance: loadedInstance,
                    viewerRef: viewerRef
                });
            });
        }
        // }
        // }
        // if (!hasBeenInitialised.current) {
        // }
    }, [tabIndex]);

    return (
        <div className='flex flex-col w-full flex-1' key={tabIndex}>
            <div
                className='flex-1 w-full h-full overflow-hidden relative'
                ref={usedViewerRef}
            ></div>
        </div>
    );
};

//     return (
//         <div className={`${styles['apryse-viewer__root']}`}>
//             {/* <button onClick={search}>Search</button> */}
//             {/* <div className='header'>React sample</div> */}
//             <div className={`${styles['webviewer']}`} ref={viewer}></div>
//         </div>
//     );
// };

export default ApryseViewer;
