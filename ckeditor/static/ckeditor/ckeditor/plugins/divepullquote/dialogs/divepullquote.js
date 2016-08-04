"use strict";


CKEDITOR.dialog.add( 'divepullquoteDialog', function ( editor ) {
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
		                id: 'abbr',
		                label: 'Abbreviation',
		                validate: CKEDITOR.dialog.validate.notEmpty( "Abbreviation field cannot be empty." ),
		            	setup: function( element ) {
		            		this.setValue( element.getText() );
		            	},
		            	commit: function( element ) {
		            		element.setText( this.getValue() );
		            	}
		            },
		            {
		                type: 'text',
		                id: 'title',
		                label: 'Explanation',
		                validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." ),
		                setup: function( element ) {
		                	this.setValue( element.getAttribute( "class" ) );
		                },
		                commit: function( element ) {
		                	element.setAttribute( "class", this.getValue() );
		                }
		            }
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
			console.log(element);

            if ( element )
                //CHANGE OLD
            	//element = element.getAscendant( 'abbr', true );

				//if the element already exists when the user opens the dialog
				//find the ascendant of the element where the cursor was that
				//has a class == 'pullquote' and set it as the element
				element = element.getAscendant(function(el){
					console.log(el.$.nodeName);
					if(el.$.nodeName == 'BODY'){
						console.log('THIS IS THE BODY');
						return el;
					}
					return el.hasClass('pullquote') == true;
				}, true);

			console.log(element);
            if ( !element || element.hasClass('pullquote') != true ) {
                //CHANGE OLD
            	//element = editor.document.createElement( 'abbr' );
				console.log(this);

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
			var	pullquote = dialog.element;
			console.log(pullquote)

			dialog.commitContent( pullquote );

			if ( dialog.insertMode )
				editor.insertElement( pullquote );
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
    var img = new CKEDITOR.dom.element('img').appendTo(headshot);
    headshot.appendTo(element);

    var speakerDetails = new CKEDITOR.dom.element('div').addClass('speaker-details');
    var name = new CKEDITOR.dom.element('p').addClass('name').appendTo(speakerDetails);
    var title = new CKEDITOR.dom.element('p').addClass('title').appendTo(speakerDetails);
    speakerDetails.appendTo(element);

    console.log(element);
}


function getPullquoteChild()


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