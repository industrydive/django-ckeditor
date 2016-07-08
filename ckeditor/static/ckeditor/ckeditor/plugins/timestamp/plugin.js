CKEDITOR.plugins.add( 'timestamp', {
    requires: 'widget',

    icons: 'timestamp',

    init: function( editor ) {
        
        editor.widgets.add( 'timestamp', {
            button: 'Insert Timestamp',

            init: function(){
                console.log(this);
            }
        });



        console.log(this);
        console.log(editor);

        editor.addCommand( 'insertTimestamp', {
            exec: function( editor ) {
                var now = new Date();
                editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
            }
        });
        
        editor.ui.addButton( 'Timestamp', {
            label: 'Insert Timestamp',
            command: 'insertTimestamp',
            toolbar: 'Basic,0'
        });
    }
});