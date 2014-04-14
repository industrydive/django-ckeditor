CKEDITOR.plugins.add( 'chartbuilder', {
    icons: 'chartbuilder',
    init: function( editor ) {
        alert('y');
        editor.addCommand( 'launchChartbuilder', {
            exec: function( editor ) {
                window.open('/admin/diveimage/chartbuilder/'
                ,'_blank');
            }
        });

        editor.ui.addButton('Chartbuilder', {
            label: 'Launch Chartbuilder',
            command: 'launchChartbuilder',
            toolbar: 'insert'
        });
    }
});
