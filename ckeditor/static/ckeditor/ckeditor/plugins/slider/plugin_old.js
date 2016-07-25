"use strict";

CKEDITOR.plugins.add( 'slider', {
    icons: 'slider',
    init: function( editor ) {
        console.log(this);
        
        editor.addCommand( 'doSlider', {
            exec: function( editor ) {
                //var now = new Date();
                
                var test = '<div class="slider-center"><div><img src="https://placebear.com/200/500" /></div><div><img src="https://placebear.com/300/300" /></div><div><img src="https://placebear.com/500/200" /></div></div>';

                //editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
                editor.insertHtml( test );
            }
        });

        //ties a button press editor command to a dialog command
        //editor.addCommand('doSlider', new CKEDITOR.dialogCommand( 'sliderDialog' ) );

        //adds a dialog to the plugin
        //CKEDITOR.dialog.add( 'sliderDialog', this.path + 'dialogs/slider.js' );

        editor.ui.addButton( 'Slider', {
            label: 'Insert Slider',
            command: 'doSlider'
        });



        //to edit the element that's already be put in ('abbr' in the tutorial case')
        /*
        if ( editor.contextMenu ) {
            editor.addMenuGroup( 'sliderGroup' );
            editor.addMenuItem( 'sliderItem', {
                label: 'Edit Abbreviation',
                icon: this.path + 'icons/slider.png',
                command: 'doSlider',
                group: 'sliderGroup'
            });

            console.log( editor.contextMenu );

            editor.contextMenu.addListener( function( element ) {
                if ( element.getAscendant( 'abbr', true ) ) {
                    return { sliderItem: CKEDITOR.TRISTATE_OFF };
                }
            });
        }
        */
    }
});