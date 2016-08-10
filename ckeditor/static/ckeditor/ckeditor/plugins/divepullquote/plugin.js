CKEDITOR.plugins.add( 'divepullquote', {
    // Miriam's Figure Box widget code.
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
			//allowedContent: 'figure(!inside_story, image_portrait); figcaption(!inside_story_caption); div(figure_content, caption_text, source_text, clearfix);img[src,alt,title,data-imagemodel,data-expandable-url,data-expandable-type]{height, width}(is_expandable)',
			allowedContent: 'div(!pullquote, pq-hr-wrapper, pq-headshot, pq-speaker-details); p(pq-quote, pq-speaker, pq-speaker-title); img[src,alt,title,data-imagemodel,data-expandable-url,data-expandable-type]{height, width}(pq-headshot-img, pq-headshot-img-hidden, is_expandable); hr;',


			// Minimum HTML which is required by this widget to work.
			//requiredContent: 'figure(inside_story); figcaption(inside_story_caption);',
			requiredContent: 'div(pullquote);',

			inline: false,

			// Define two nested editable areas.
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
				console.log(this);
				console.log("-------------");

				// this.element.on('doubleclick', function(evt){
				// 	console.log(this);
				// 	console.log(widget);
				// });

				// var quote = getElementChild(this.element, 'pq-quote cke_widget_editable');
				// var img = getElementChild(this.element, 'pq-headshot-img');
				// var speaker = getElementChild(this.element, 'pq-speaker cke_widget_editable');
				// var speaker_title = getElementChild(this.element, 'pq-speaker-title cke_widget_editable');
				// var wrapper = this.element.getChildren().getItem(1);

				var quote = this.editables.quote;
				var imgDiv = this.editables.imgDiv;
				var speaker = this.editables.speaker;
				var speaker_title = this.editables.speaker_title;

				var img = imgDiv.getFirst().$;

				console.log(quote);
				console.log(img);
				console.log(speaker);
				console.log(speaker_title);


				this.setData('quote_value',quote.getText());

				//todo here
				this.setData('img_src',img.getAttribute('src'));
				console.log(this.data.img_src);

				this.setData('speaker_value',speaker.getText());
				this.setData('speaker_title_value',speaker_title.getText());

				console.log("-------------");
			},
			data: function() {
				var quote = this.editables.quote;
				var imgDiv = this.editables.imgDiv;
				var speaker = this.editables.speaker;
				var speaker_title = this.editables.speaker_title;

				var img = imgDiv.getFirst().$;

				// var quote = getElementChild(this.element, 'pq-quote cke_widget_editable');
				// var img = getElementChild(this.element, 'pq-headshot-img');
				// var speaker = getElementChild(this.element, 'pq-speaker cke_widget_editable');
				// var speaker_title = getElementChild(this.element, 'pq-speaker-title cke_widget_editable');

				console.log(quote);
				console.log(img);
				console.log(speaker);
				console.log(speaker_title);

				quote.setText(this.data.quote_value);

				//todo here
				//if(img){
					img.setAttribute('src', this.data.img_src);
					img.setAttribute('data-cke-saved-src', this.data.img_src);

				// if(this.data.img_src === '' || this.data.img_src === ' '){
				// 	console.log('shit is blank');
				// }
				//}



				speaker.setText(this.data.speaker_value);
				speaker_title.setText(this.data.speaker_title_value);

				// console.log(this.data.quote_value);
				// console.log(this.data.img_src);
				// console.log(this.data.speaker_value);
				// console.log(this.data.speaker_title_value);
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

/**
 * Get a child node of a ckeditor node by the ckeditor DOM element's className
 * Will search recursively until it finds a classname match, or return undefined
 *
 * Used to find the child of the main pullquote div that matches the text input
 * into the plugin dialog.
 *
 *  see 'getChildren()' @ http://docs.ckeditor.com/#!/api/CKEDITOR.dom.element
 *  see http://docs.ckeditor.com/#!/api/CKEDITOR.dom.nodeList
 *
 * @param element    - a ckeditor parent node that you want to search
 * @param childClass - the classname string of the child element
 * @returns {object} - ckeditor node object
 */
function getElementChild(element, childClass){
	//oh lord please help you if you are reading this
	var nodeList = element.getChildren();

	for(var i = 0; i < nodeList.count(); i++){
		var item = nodeList.getItem(i);

		//if(item.$.nodeName == '#text') break;
		//if(item.$.nodeName == 'HR') continue;
		if(!item.$.hasOwnProperty(className)){
			continue;
		}

		if(item.$.className == childClass){
			return item;
		}
		else if(item.getChildCount() != 0){
			item = getElementChild(item, childClass);
			if(item){
				return item;
			}
		}
	}
}