CKEDITOR.dialog.add('divepullquote', function(editor){

	return {
		title: 'Insert pull quote',
		minWidth: 400,
		minHeight: 200,
		contents: [
			{
				id: 'divepullquotedialog',
				elements: [
					{
						type: 'text',
						id: 'pq-quote',
						label: 'Quote',
						validate: CKEDITOR.dialog.validate.notEmpty( "Quote field cannot be empty." ),
						setup: function( widget ) {
							this.setValue(widget.data.quote_value);
						},
						commit: function( widget ) {
							widget.setData('quote_value', this.getValue());
						}
					},
					{
						type: 'text',
						id: 'pq-headshot-img',
						label: 'Pullquote Image URL (ex. http://www.educationdive.com/user_media/diveimage/johndoe.jpg )'/*<br><p style="font-style:italic;">*Manually provide URL for now, working on integrating with CMS images.</p>'*/,
						// validate: CKEDITOR.dialog.validate.notEmpty( "Image source field cannot be empty." ),
						setup: function( widget ) {
							//if(widget.data.img_src){
								this.setValue(widget.data.img_src);
							//}
						},
						commit: function( widget ) {
							//console.log(widget.data);
                            console.log(this.getValue());

							if(this.getValue() === '' || ' '){
								widget.setData('img_src', this.getValue());
								var img = widget.editables.imgDiv.getFirst().$;
								img.className = 'pq-headshot-img-hidden';
							}
							else{
								widget.setData('img_src', this.getValue());
								var img = widget.editables.imgDiv.getFirst().$;
								img.className = 'pq-headshot-img';
							}
							//}

							//widget.setData('img_src', this.getValue());
						}
					},
					{
						type: 'text',
						id: 'pq-speaker',
						label: 'Speaker Name',
						validate: CKEDITOR.dialog.validate.notEmpty( "Speaker name field cannot be empty." ),
						setup: function( widget ) {
							this.setValue(widget.data.speaker_value);
						},
						commit: function( widget ) {
							widget.setData('speaker_value', this.getValue());
						}
					},
					{
						type: 'text',
						id: 'pq-speaker-title',
						label: 'Speaker Title',
						validate: CKEDITOR.dialog.validate.notEmpty( "Speaker title field cannot be empty." ),
						setup: function( widget ) {
							this.setValue(widget.data.speaker_title_value);
						},
						commit: function( widget ) {
							widget.setData('speaker_title_value', this.getValue());
						}
					},
				]
			}
		],
		//onShow: function() {
			// var selection = editor.getSelection();
			// var element = selection.getStartElement();
            //
			// if ( element )
			// //CHANGE OLD
			// //element = element.getAscendant( 'abbr', true );
            //
			// //if the element already exists when the user opens the dialog
			// //find the ascendant of the element where the cursor was that
			// //has a class == 'pullquote' and set it as the element
			// 	element = element.getAscendant(function(el){
			// 		if(el.$.nodeName == 'BODY'){
			// 			return el;
			// 		}
			// 		return el.hasClass('pullquote') == true;
			// 	}, true);
            //
			// console.log(element);
			// if ( !element || element.hasClass('pullquote') != true ) {
			// 	//CHANGE OLD
			// 	//element = editor.document.createElement( 'abbr' );
            //
			// 	element = setUpPullquoteElement(editor);
            //
			// 	this.insertMode = true;
			// }
			// else
			// 	this.insertMode = false;
            //
			// this.element = element;

			// if ( !this.insertMode )
			// 	this.setupContent( this.element );
		//},

		// onOk: function() {
		// 	var dialog = this;
		// 	var	element = dialog.element;
		// 	//defaultImageCheck(editor, element);
        //
		// 	dialog.commitContent( element );
        //
		// 	if ( dialog.insertMode )
		// 		editor.insertElement( element );
		// }

	}
});





	// function setUpPullquoteElement(editor){
	// 	console.log(editor);
	// 	var element = CKEDITOR.dom.element.createFromHtml('' +
	// 		'<div class="pullquote">' +
	// 			'<hr>'+
	// 			'<div class="pq-hr-wrapper">'+
	// 				'<p class="pq-quote">Quote</p>' +
	// 				'<div class="pq-headshot">' +
	// 					'<img class="pq-headshot-img" src="' + this.path + 'resources/wsiwyg_image_replacement_small.png" />' +
	// 				'</div>' +
	// 				'<div class="pq-speaker-details">' +
	// 					'<p class="pq-speaker">Speaker name</p>' +
	// 					'<p class="pq-speaker-title">Speaker title</p>' +
	// 				'</div>' +
	// 			'</div>'+
	// 			'<hr>'+
	// 		'</div>');
	// 	console.log(element);
    //
	// 	// var pullquoteElement = editor.document.createElement('div');
	// 	// pullquoteElement.className = 'pullquote';
	// 	// console.log(pullquoteElement);
	// 	// var element = new CKEDITOR.dom.element('div').addClass('pullquote');
	// 	// var quote = new CKEDITOR.dom.element('p').addClass('quote').appendTo(element);
	// 	// var clearfix = new CKEDITOR.dom.element('div').addClass('clearfix').appendTo(element);
     //    //
	// 	// var headshot = new CKEDITOR.dom.element('div').addClass('headshot')//.appendTo(element);
	// 	// new CKEDITOR.dom.element('img').addClass('headshot-img').appendTo(headshot);
	// 	// headshot.appendTo(element);
     //    //
	// 	// var speakerDetails = new CKEDITOR.dom.element('div').addClass('speaker-details');
	// 	// var name = new CKEDITOR.dom.element('p').addClass('name').appendTo(speakerDetails);
	// 	// var title = new CKEDITOR.dom.element('p').addClass('title').appendTo(speakerDetails);
	// 	// speakerDetails.appendTo(element);
    //
	// 	return element;
	// 	// console.log(element);
	// 	// var nameItem = getElementChild(element, 'name');
	// 	// console.log(nameItem);
	// }

