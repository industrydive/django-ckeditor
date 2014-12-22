// Have to say that cite elements can be editables
// See http://dev.ckeditor.com/ticket/10932
CKEDITOR.dtd.$editable.cite = 1;

CKEDITOR.addCss('blockquote.blockquote {background-color: lightgrey; border-left: gray solid 5px; padding: 5px; margin: 10px auto;}');
CKEDITOR.addCss('aside.pullquote {border-width: 3px 0; border-style: solid; border-color: gray; padding: 15px 5px; margin: 10px auto; max-width: 50%; float:right;}');



// BLOCKQUOTE
// This is a very simple widget, will become more complicated
// as we add options and types of
CKEDITOR.plugins.add( 'customquotewidgets', {
    requires: 'widget,dialog',
    icons: 'customquotewidgets',

    init: function( editor ) {
    	var pluginName = 'customquotewidgets';

		CKEDITOR.dialog.add( 'customquotewidgets', this.path + 'dialogs/customquotewidgets.js' );
		// CKEDITOR.dialog.add( 'customblockquotewidget', this.path + 'dialogs/customblockquotewidget.js' );

		editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName ) );

		editor.ui.addButton && editor.ui.addButton( 'Customquotewidgets', {
			label: "Quote",
			command: 'customquotewidgets',
			toolbar: 'insert,10'
		});

		// Blockquotes
		// TO DO popup
		editor.widgets.add( 'customblockquotewidget', {
		    button: 'Create a block quote',

			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'p b i em strong;blockquote(!blockquote);cite(!cite);a[!href];div(inside_blockquote,quote,citation)',
			// dialog: 'customblockquotewidget',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'blockquote',

			// this is a block element
			inline: false,
			// that can be moved easily
			draggable: true,

			// Define the editable area
			editables: {
				quote: {
					selector: '.quote',
					allowedContent: 'p b i em strong;a[!href];'
				},
				quotecitation: {
					selector: '.cite',
					allowedContent: 'b i em strong;a[!href];'
				}
			},

			template: '<blockquote class="blockquote">' +
						'<div class="inside_blockquote quote">' +
							'<p>REPLACE WITH QUOTE</p>' +
						'</div>' +
						'<cite class="cite">REPLACE WITH CITATION</cite>' +
					'</blockquote>',

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				return element.name == 'blockquote' && element.hasClass( 'blockquote' ) ;
			}
		} );

		// // Pullquotes
		editor.widgets.add( 'custompullquotewidget', {
		    button: 'Create a pull quote',

			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'aside(!pullquote);b;i;em;strong;a[!href];span;',
			// dialog: 'custompullquotewidget',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'aside(!pullquote)',

			// this is a block element
			inline: false,
			// that can be moved easily
			draggable: true,

			// Define the editable area
			editables: {
				words: {
					// Define a CSS selector used for finding the element inside the widget element.
					// Allow editing of the whole thing
					selector: 'aside.pullquote',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'b i em strong span;a[!href];'
				}
			},

			template: '<aside class="pullquote">' +
				'<p>REPLACE WITH QUOTE</p>' +
			'</aside>',

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Simple Box widget)
				// for all <div> elements with a "simplebox" class.
				return element.name == 'aside' && element.hasClass( 'pullquote' ) ;
			}
		} );

    }
} );

