"use strict";

CKEDITOR.plugins.add( 'divepullquote', {
    icons: 'pullquote',
    init: function( editor ) {
        console.log(this);
        
        // editor.addCommand( 'doDivepullquote', {
        //     exec: function( editor ) {
        //         //var now = new Date();
        //
        //         // var test = '<div class="slider-center"><div><img src="https://placebear.com/200/500" /></div><div><img src="https://placebear.com/300/300" /></div><div><img src="https://placebear.com/500/200" /></div></div>';
        //         //
        //         // //editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
        //         // editor.insertHtml( test );
        //     }
        // });

        //ties a button press editor command to a dialog command
        editor.addCommand('doDivepullquote', new CKEDITOR.dialogCommand( 'divepullquoteDialog' ) );

        //adds a dialog to the plugin
        CKEDITOR.dialog.add( 'divepullquoteDialog', this.path + 'dialogs/divepullquote.js' );

        editor.ui.addButton( 'PullQuote', {
            label: 'Insert Pull Quote',
            command: 'doDivepullquote',
            toolbar: 'basic'
        });



        //to edit the element that's already be put in ('abbr' in the tutorial case')

        if ( editor.contextMenu ) {
            editor.addMenuGroup( 'divepullquoteGroup' );
            editor.addMenuItem( 'divepullquoteItem', {
                label: 'Edit Abbreviation',
                icon: this.path + 'icons/pullquote.png',
                command: 'doDivepullquote',
                group: 'divepullquoteGroup'
            });


            // editor.contextMenu.addListener( function( element ) {
            //     if ( element.getAscendant( 'abbr', true ) ) {
            //         return { divepullquoteItem: CKEDITOR.TRISTATE_OFF };
            //     }
            // });
        }

    }
});