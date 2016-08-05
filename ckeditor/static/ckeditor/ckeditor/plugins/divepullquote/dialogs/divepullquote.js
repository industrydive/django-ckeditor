"use strict";


CKEDITOR.dialog.add( 'divepullquoteDialog', function ( editor ) {
    console.log(editor);

	var onImgLoadEvent = function() {
		// Image is ready.
		var original = this.originalElement;
		original.setCustomData('isReady', 'true');
		original.removeListener('load', onImgLoadEvent);
		original.removeListener('error', onImgLoadErrorEvent);
		original.removeListener('abort', onImgLoadErrorEvent);

		// Hide loader
		CKEDITOR.document.getById(imagePreviewLoaderId).setStyle('display', 'none');

		this.firstLoad = false;
	};

	var onImgLoadErrorEvent = function() {
		// Error. Image is not loaded.
		var original = this.originalElement;
		original.removeListener('load', onImgLoadEvent);
		original.removeListener('error', onImgLoadErrorEvent);
		original.removeListener('abort', onImgLoadErrorEvent);

		// Set Error image.
		var noimage = CKEDITOR.getUrl(CKEDITOR.plugins.get('diveimage').path + 'images/noimage.png');

		if (this.preview)
			this.preview.setAttribute('src', noimage);

		// Hide loader
		CKEDITOR.document.getById(imagePreviewLoaderId).setStyle('display', 'none');
	};


	var numbering = function(id) {
			return CKEDITOR.tools.getNextId() + '_' + id;
		},
		btnLockSizesId = numbering('btnLockSizes'),
		btnResetSizeId = numbering('btnResetSize'),
		imagePreviewLoaderId = numbering('ImagePreviewLoader'),
		previewLinkId = numbering('previewLink'),
		previewImageId = numbering('previewImage');


	return {
        title: 'Insert Pull Quote',
        minWidth: 400,
        minHeight: 200,

		contents: [
		    {
		        id: 'tab-basic',
		        label: 'Basic Settings',
		        elements: [
		            {
		                type: 'text',
		                id: 'quote',
		                label: 'Quote',
		                validate: CKEDITOR.dialog.validate.notEmpty( "Quote field cannot be empty." ),
		            	setup: function( element ) {
		            		//get the child element of the pullquote div that corresponds to this dialog input
		                    var childElement = getElementChild(element, 'quote');

                            //set the value of the dialog input to the text value of the child element
                            this.setValue( childElement.getText() );
		            	},
		            	commit: function( element ) {
                            //get the child element of the pullquote div that corresponds to this dialog input
		                    var childElement = getElementChild(element, 'quote');

                            //set the value of the child element equal to the dialog input
                            childElement.setText( this.getValue() );
		            	}
		            },
                    {
		                type: 'text',
		                id: 'headshot-img',
		                label: 'Pullquote Image URL (ex. http://www.educationdive.com/user_media/diveimage/johndoe.jpg )'/*<br><p style="font-style:italic;">*Manually provide URL for now, working on integrating with CMS images.</p>'*/,
		                validate: CKEDITOR.dialog.validate.notEmpty( "Image source field cannot be empty." ),
		            	setup: function( element ) {
		            		//get the child element of the pullquote div that corresponds to this dialog input
		                    var childElement = getElementChild(element, 'headshot-img');

                            //set the value of the dialog input to the text value of the child element
                            this.setValue( childElement.$.src );
		            	},
		            	commit: function( element ) {
                            //get the child element of the pullquote div that corresponds to this dialog input
		                    var childElement = getElementChild(element, 'headshot-img');

                            console.log(childElement);

                            //set the value of the child element equal to the dialog input
                            childElement.$.src = this.getValue();
		            	}
		            },
                    //TODO url box from diveimage - may be able to use, but will need work first
					// {
						// 	id: 'txtUrl',
						// 	type: 'text',
						// 	label: editor.lang.common.url,
						// 	required: true,
						// 	onChange: function() {
						// 	var dialog = this.getDialog(),
						// 		newUrl = this.getValue();
                    //
						// 	//Update original image
						// 	if (newUrl.length > 0) //Prevent from load before onShow
						// 	{
						// 		dialog = this.getDialog();
						// 		var original = dialog.originalElement;
                    //
						// 		dialog.preview.removeStyle('display');
                    //
						// 		original.setCustomData('isReady', 'false');
						// 		// Show loader
						// 		var loader = CKEDITOR.document.getById(imagePreviewLoaderId);
						// 		if (loader)
						// 			loader.setStyle('display', '');
                    //
						// 		original.on('load', onImgLoadEvent, dialog);
						// 		original.on('error', onImgLoadErrorEvent, dialog);
						// 		original.on('abort', onImgLoadErrorEvent, dialog);
						// 		original.setAttribute('src', newUrl);
                    //
						// 		// Query the preloader to figure out the url impacted by based href.
						// 		//TODO check out the preview options below
						// 		//previewPreloader.setAttribute('src', newUrl);
						// 		//dialog.preview.setAttribute('src', previewPreloader.$.src);
						// 		//updatePreview(dialog);
						// 	}
						// 	// Dont show preview if no URL given.
						// 	else if (dialog.preview) {
						// 		dialog.preview.removeAttribute('src');
						// 		dialog.preview.setStyle('display', 'none');
						// 	}
                    //
						// 	// wipe the info id
						// 	// if set on site, will be replaced next in sequence
						// 	dialog.getContentElement('advanced', 'dive_id').setValue("-1");
						// },
						// setup: function(type, element) {
						// 	//TODO this was taken out
						// 	//if (type == IMAGE) {
						// 		var url = element.data('cke-saved-src') || element.getAttribute('src');
						// 		var field = this;
						// 		var dialog = this.getDialog();
                    //
						// 		dialog.dontResetSize = true;
                    //
						// 		field.setValue(url); // And call this.onChange()
						// 		// Manually set the initial value.(#4191)
						// 		field.setInitValue();
                    //
						// 		// Manually reset the dive_id
						// 		dialog.getContentElement('advanced', 'dive_id').setup(type, element);
						// 	//}
						// },
						// commit: function(type, element) {
						// 	//TODO this stuff was taken out
						// 	//if (type == IMAGE && (this.getValue() || this.isChanged())) {
						// 		element.data('cke-saved-src', this.getValue());
						// 		element.setAttribute('src', this.getValue());
						// 	// } else if (type == CLEANUP) {
						// 	// 	element.setAttribute('src', ''); // If removeAttribute doesn't work.
						// 	// 	element.removeAttribute('src');
						// 	// }
						// },
						// validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.image.urlMissing)
                    // },
					//TODO possible button to open dive image dialog --- pasted in but there are errors
					// {
					// 	id: 'browse_info',
					// 	type: 'button',
					// 	style: 'display:inline-block;margin-top:10px;',
					// 	align: 'center',
					// 	label: "Choose/Upload Dive Image",
					// 	onClick: function () {
					// 		var url = CKEDITOR.config.dive_open_thumb_url;
					// 		var name = "";
                    //
					// 		// matches GRAPPELLI CUSTOM: changed width
					// 		var win = window.open(url, name, 'height=500,width=980,resizable=yes,scrollbars=yes');
					// 		win.focus();
					// 		return false;
					// 	}
					// },
		            {
		                type: 'text',
		                id: 'name',
		                label: 'Speaker Name',
		                validate: CKEDITOR.dialog.validate.notEmpty( "Speaker name field cannot be empty." ),
		            	setup: function( element ) {
		            		//get the child element of the pullquote div that corresponds to this dialog input
		                    var childElement = getElementChild(element, 'name');

                            //set the value of the dialog input to the text value of the child element
                            this.setValue( childElement.getText() );
		            	},
		            	commit: function( element ) {
                            //get the child element of the pullquote div that corresponds to this dialog input
		                    var childElement = getElementChild(element, 'name');

                            //set the value of the child element equal to the dialog input
                            childElement.setText( this.getValue() );
		            	}
		            },
                    {
		                type: 'text',
		                id: 'title',
		                label: 'Speaker Title',
		                validate: CKEDITOR.dialog.validate.notEmpty( "Speaker title field cannot be empty." ),
		            	setup: function( element ) {
		            		//get the child element of the pullquote div that corresponds to this dialog input
		                    var childElement = getElementChild(element, 'title');

                            //set the value of the dialog input to the text value of the child element
                            this.setValue( childElement.getText() );
		            	},
		            	commit: function( element ) {
                            //get the child element of the pullquote div that corresponds to this dialog input
		                    var childElement = getElementChild(element, 'title');

                            //set the value of the child element equal to the dialog input
                            childElement.setText( this.getValue() );
		            	}
		            },
		        ]
		    },
		    // {
		    //     id: 'tab-adv',
		    //     label: 'Advanced Settings',
		    //     elements: [
		    //         {
		    //             type: 'text',
		    //             id: 'id',
		    //             label: 'Id',
		    //             setup: function( element ) {
		    //             	this.setValue( element.getAttribute( "id" ) );
		    //             },
		    //             commit: function( element ) {
		    //             	var id = this.getValue();
            //
		    //             	if( id )
		    //             		element.setAttribute( 'id', id );
		    //             	else if( !this.insertMode )
		    //             		element.removeAttribute( 'id' );
		    //             }
		    //         }
		    //     ]
		    // }
		],

        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            if ( element )
                //CHANGE OLD
            	//element = element.getAscendant( 'abbr', true );

				//if the element already exists when the user opens the dialog
				//find the ascendant of the element where the cursor was that
				//has a class == 'pullquote' and set it as the element
				element = element.getAscendant(function(el){
					if(el.$.nodeName == 'BODY'){
						return el;
					}
					return el.hasClass('pullquote') == true;
				}, true);

			console.log(element);
            if ( !element || element.hasClass('pullquote') != true ) {
                //CHANGE OLD
            	//element = editor.document.createElement( 'abbr' );

				element = setUpPullquoteElement(editor);

				this.insertMode = true;
            }
            else
                this.insertMode = false;

            this.element = element;

            if ( !this.insertMode )
                this.setupContent( this.element );
        },

		onOk: function() {
			var dialog = this;
			console.log(dialog);
			var	element = dialog.element;
			console.log(element);

            defaultImageCheck(editor, element);


			dialog.commitContent( element );

			if ( dialog.insertMode )
				editor.insertElement( element );
		}

    };
});


function setUpPullquoteElement(editor){
	// var pullquoteElement = editor.document.createElement('div');
	// pullquoteElement.className = 'pullquote';
	// console.log(pullquoteElement);
    var element = new CKEDITOR.dom.element('div').addClass('pullquote');
    var quote = new CKEDITOR.dom.element('p').addClass('quote').appendTo(element);
    var clearfix = new CKEDITOR.dom.element('div').addClass('clearfix').appendTo(element);

    var headshot = new CKEDITOR.dom.element('div').addClass('headshot')//.appendTo(element);
    new CKEDITOR.dom.element('img').addClass('headshot-img').appendTo(headshot);
    headshot.appendTo(element);

    var speakerDetails = new CKEDITOR.dom.element('div').addClass('speaker-details');
    var name = new CKEDITOR.dom.element('p').addClass('name').appendTo(speakerDetails);
    var title = new CKEDITOR.dom.element('p').addClass('title').appendTo(speakerDetails);
    speakerDetails.appendTo(element);

    return element;
    // console.log(element);
    // var nameItem = getElementChild(element, 'name');
    // console.log(nameItem);
}

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
    var nodeList = element.getChildren();

    for(var i = 0; i < nodeList.count(); i++){
        var item = nodeList.getItem(i);

        if(item.$.nodeName == '#text') break;

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


function defaultImageCheck(editor, element){
    console.log(element);
    var imgElement =  getElementChild(element, 'headshot-img');
    console.log(imgElement);
    console.log(imgElement.$.src);
    if(!imgElement.$.src){
        //console.log('IMage source was blank');
        imgElement.$.src = editor.plugins.divepullquote.path + 'resources/wsiwyg_image_replacement_small.png';
    }
}

// <div class="pullquote">
//   <p class="quote">“By 2023, whites will comprise less than half of the U.S. population under age 30.”</p>
//   <div class="clearfix"></div>
//   <div class="headshot">
//     <img src="http://www.educationdive.com/user_media/diveimage/william_frey_znzDrca.jpg">
//   </div>
//   <div class="speaker-details">
//     <p class="name">William Frey</p>
//     <p class="title">Author of “Diversity Explosion” and demographer at Brookings Institution's Metropolitan Policy Program</p>
//   </div>
// </div>