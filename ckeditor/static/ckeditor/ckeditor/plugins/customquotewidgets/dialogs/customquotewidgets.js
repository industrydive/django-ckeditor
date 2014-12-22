CKEDITOR.dialog.add('customquotewidgets', function(editor){

	return {
		title: 'Add a quote',
		minWidth: 150,
		minHeight: 150,
		buttons: [CKEDITOR.dialog.cancelButton],
		contents: [
			{
				id: 'customquotewidgetsdialog',
				elements: [
					{
						id: 'insert_pullquote',
						type: 'button',
						label: 'Pull Quote',

						onClick: function() {
							editor.execCommand( 'custompullquotewidget' );
							CKEDITOR.dialog.getCurrent().hide();
						}
					},
					{
						id: 'insert_blockquote',
						type: 'button',
						label: 'Block Quote',

						onClick: function() {
							editor.execCommand( 'customblockquotewidget' );
							CKEDITOR.dialog.getCurrent().hide();
						}

					}
				]
			}
		]

	}


});