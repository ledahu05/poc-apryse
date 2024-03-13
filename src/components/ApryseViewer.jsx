import React from 'react';
import { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';
import { useApryse } from '../context/ApryseContext';

const ApryseViewer = ({ files, tabIndex }) => {
    const viewerRef = useRef(null);
    const [instance, setInstance] = useApryse();
    const beenInitialised = useRef(false);
    console.log('ApryseViewer files', files);

    useEffect(() => {
        async function loadDocuments() {
            if (instance) {
                // const allTabs = await instance.UI.TabManager.getAllTabs();

                // for (const tab of allTabs) {
                //     await instance.UI.TabManager.deleteTab(tab.index);
                // }

                // After all tabs are deleted, add new tabs
                files.forEach(({ filename, url }) => {
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
        if (!beenInitialised.current) {
            beenInitialised.current = true;
            WebViewer(
                {
                    fullAPI: true,
                    licenseKey:
                        'demo:1710169127353:7f3d779a0300000000d154925f75cb63510fe00b60d0c6de40d80d0e6e',
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
                setInstance(loadedInstance);
            });
        }
        // console.log('ApryseViewer instance', instance);
        // if (instance) return;
    }, []);

    return (
        <div className='flex flex-col w-full flex-1'>
            <div
                className='flex-1 w-full h-full overflow-hidden relative'
                ref={viewerRef}
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
