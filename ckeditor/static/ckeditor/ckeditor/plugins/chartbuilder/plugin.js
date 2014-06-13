CKEDITOR.plugins.add( 'chartbuilder', {
    icons: 'chartbuilder',
    init: function( editor ) {
        editor.addCommand( 'launchChartbuilder', {
            exec: function( editor ) {
                window.open(CKEDITOR.config.dive_open_chartbuilder_url);
            }
        });

        editor.ui.addButton('Chartbuilder', {
            label: 'Launch Chartbuilder',
            command: 'launchChartbuilder',
            toolbar: 'insert'
        });
    }
});
