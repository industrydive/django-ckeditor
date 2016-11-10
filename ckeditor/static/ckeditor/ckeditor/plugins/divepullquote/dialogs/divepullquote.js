/**
Pullquote plugin - adds icon to editor that opens a dialog with 4 text inputs that allow a user to create a pull quote.
This dialog shows the user 4 text inputs, and allows them to input a quote, image url, speaker name, and speaker-title

- This plugin is a widget (made using the widget plugin), so this dialog edits the widget's data property that
corresponds to the pullquote element that the user is editing in the dialog

*/
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
						//image url input -- dont validate for empty input...see commit function below
						type: 'text',
						id: 'pq-headshot-img',
						label: 'Pullquote Image URL (ex. http://www.educationdive.com/user_media/diveimage/johndoe.jpg )',
						//validate: CKEDITOR.dialog.validate.notEmpty( "Image source field cannot be empty." ),
						setup: function( widget ) {
							this.setValue(widget.data.img_src);
						},
						commit: function( widget ) {
							//get the actual img dom element, not some ckeditor psuedo element wrapped bullshit
							var img = widget.editables.imgDiv.getFirst().$,
                                // Placeholder to set empty img src to before we hide it. We can't just remove
                                // the img if the src is empty bc editors might want to add an img later and the
                                // element still needs to be there.
                                placeholder = https://d12v9rtnomnebu.cloudfront.net/dive_static/diveimages/corporate_site/teampage/square_profiles/placeholder-200.png

							//checks for an empty value or one space so we can delete image
							if(this.getValue() === '' || this.getValue() === ' '){
								widget.setData('img_src', placeholder);
								img.className = 'pq-headshot-img-hidden';
							}
							//if the user provides a url we set the widget's data.img_src property and make sure the image
							//has a class that will show up on the page
							else{
								widget.setData('img_src', this.getValue());
								img.className = 'pq-headshot-img';
							}
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
					}
				]
			}
		]
	}
});


