/**
 divepullquote plugin - adds icon to editor that opens a dialog with 4 text inputs that allow a user to create a pull quote.
 Pull quote is a chunk of html that gets added into the editor--you can click on the text elements to directly edit them once
 the pull quote is placed in the editor, and you can double click the image or the div that contains the pull quote to reopen the
 pull quote dialog.

 - This plugin is a widget (made using the widget plugin) to allow users to directly edit text fields and drag the pull quote
 	within the editor.
 - There is some interaction with the diveimage plugin to stop the diveimage dialog from opening when you interact with
 	the image inside of a pullquote. ctrl+f 'divepullquote' in diveimage/plugin.js to find the code.

 */
CKEDITOR.plugins.add( 'divepullquote', {
    // Hayden's pullquote widget code.
    requires: 'widget,dialog',
    icons: 'divepullquote',


    init: function( editor ) {
    	CKEDITOR.dialog.add('divepullquote', this.path + 'dialogs/divepullquote.js');

		editor.widgets.add( 'divepullquote', {
		    button: 'Create a pull quote',
			dialog: 'divepullquote',


			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'div(!pullquote, pq-hr-wrapper, pq-headshot, pq-speaker-details); p(pq-quote, pq-speaker, pq-speaker-title); img[src,alt,title,data-imagemodel,data-expandable-url,data-expandable-type]{height, width}(pq-headshot-img, pq-headshot-img-hidden, is_expandable); hr;',


			// Minimum HTML which is required by this widget to work.
			requiredContent: 'div(pullquote);',

			inline: false,

			// Define the nested editable areas.
			editables: {
				imgDiv: {
					// Define a CSS selector used for finding the element inside the widget element.
					selector: '.pq-headshot',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'img[!src, title, alt]{height, width}(pq-headshot-img, pq-headshot-img-hidden);'
				},
				quote: {
					selector: '.pq-quote',
					//I kept the p-tag allowed content the same as Miriam's figurebox plugin code that I took this from,
					//but we may not need to allow this content - Hayden
					allowedContent: 'strong em; a[!href]'
				},
				speaker: {
					selector: '.pq-speaker',
					allowedContent: 'em; a[!href]'
				},
				speaker_title: {
					selector: '.pq-speaker-title',
					allowedContent: 'em; a[!href]'
				}
			},

			/*	default code that is made when a user first hits the plugin button---the text values from the paragraphs
				and the src from the image are inserted into the starting dialog that the user sees.

				!!IMPORTANT!! - the source is supposed to be a blank space. If it is not present or not a blank space ("")
				then it currently gets filtered out by
			*/
			template:
				'<div class="pullquote">' +
					'<hr>'+
					'<div class="pq-hr-wrapper">'+
						'<p class="pq-quote">Quote</p>' +
						'<div class="pq-headshot">' +
							'<img class="pq-headshot-img" src=" "/>' +
						'</div>' +
						'<div class="pq-speaker-details">' +
							'<p class="pq-speaker">Speaker name</p>' +
							'<p class="pq-speaker-title">Speaker title</p>' +
						'</div>' +
					'</div>'+
					'<hr>'+
				'</div>',

			init: function() {
				//gets references to editable elements defined above
				var quote = this.editables.quote;
				var imgDiv = this.editables.imgDiv;
				var speaker = this.editables.speaker;
				var speaker_title = this.editables.speaker_title;

				//the div surrounding the img element is the editable element, so we
				//need to get the reference to the img child of the surrounding div
				if(imgDiv.getChildCount() > 0){
					var img = imgDiv.getFirst().$;
					//store the default src value of the img element in the widget data
					this.setData('img_src',img.getAttribute('src'));
				}

				//store the default text values of the editable paragraph elements in the widget data
				this.setData('quote_value',quote.getText());
				this.setData('speaker_value',speaker.getText());
				this.setData('speaker_title_value',speaker_title.getText());
			},
			//called everytime the setData function is called on a widget
			//--- data associated with each editable element is edited by the used in the dialog window,
			// and then the data function gets those changed data values and edits the dom elements
			data: function() {
				//gets references to editable elements defined above
				var quote = this.editables.quote;
				var imgDiv = this.editables.imgDiv;
				var speaker = this.editables.speaker;
				var speaker_title = this.editables.speaker_title;

				//the div surrounding the img element is the editable element, so we
				//need to get the reference to the img child of the surrounding div
				if(imgDiv.getChildCount() > 0) {
					var img = imgDiv.getFirst().$;

					//set both the src and 'data-cke-saved-src' of the img element...idk just what works with ckeditor
					img.setAttribute('src', this.data.img_src);
					img.setAttribute('data-cke-saved-src', this.data.img_src);
				}

				//set the text of the ckeditor elements associated with the changed data values
				quote.setText(this.data.quote_value);
				speaker.setText(this.data.speaker_value);
				speaker_title.setText(this.data.speaker_title_value);
			},

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Figure Box widget)
				// for all <div> elements with a "figurebox" class.
				return element.name == 'div' && element.hasClass( 'pullquote' );
			}


		} );
    }

});
