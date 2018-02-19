/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.extraPlugins = 'notification';
    config.extraPlugins = 'autosave';
    config.autosave = {
        // save every X seconds
        delay: 5,
        // ignore Content older then X
        NotOlderThen : 2880,
        // show in the Status Bar, overriding default "notification"
        // ckeditor upgrade required to use "notification"
        messageType : "statusbar",
    }
};
