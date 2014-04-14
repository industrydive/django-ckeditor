CKEDITOR.plugins.add( 'chartbuilder', {
    icons: 'chartbuilder',
    init: function( editor ) {
        editor.addCommand( 'launchChartbuilder', {
            exec: function( editor ) {
                window.open('.','_blank');
            }
        });

        editor.ui.addButton('Chartbuilder', {
            label: 'Launch Chartbuilder',
            command: 'launchChartbuilder',
            toolbar: 'insert'
        });
    }
});
