CKEDITOR.dialog.add('chartbuilder', function(editor){
	var current_editor = editor;
	return {
		title: "Insert Chart",
		minWidth: 420,
		minHeight: 360,
		contents: [
			{ id: 'main',
				elements: [{ 
					id: 'create_button',
					type: 'button',
					style: 'display:block;margin-top:10px;width:100%;font-size:200%;min-height:3em;',
					align: 'center',
					label: "Create Chart",
					onClick: function() {
						url = CKEDITOR.config.dive_open_chartbuilder_url;
						name = "";

						// matches GRAPPELLI CUSTOM: changed width
						var win = window.open(url, name, 'resizable=yes,scrollbars=yes');
						// var win = window.open(url, name, 'height=500,width=980,resizable=yes,scrollbars=yes');
						win.focus();
						// this.getDialog().getContentElement('main', 'chartbuilder_img_data').
						return false;
					},
				},
				// { id: 'insert_button',
				// 	type: 'button',
				// 	style: 'display:inline-block;margin-top:10px;',
				// 	align: 'center',
				// 	label: "Insert Chart",
				// 	onClick: function() {
				// 		// url = CKEDITOR.config.dive_open_chartbuilder_url;
				// 		// name = "";

				// 		// // matches GRAPPELLI CUSTOM: changed width
				// 		// var win = window.open(url, name, 'resizable=yes,scrollbars=yes');
				// 		// // var win = window.open(url, name, 'height=500,width=980,resizable=yes,scrollbars=yes');
				// 		// win.focus();
				// 		// return false;
				// 	},
				// }
				{ id: 'chartbuilder_img_data',
					type: 'textarea',
					inputStyle: 'display:none;',
					hidden: true,
					onChange: function(evt){


						var json_obj = JSON.parse(this.getValue());
						var img_url = json_obj.thumb_url;
						// var d = this.getDialog();
						// var cp = d.getContentElement('main', 'chartbuilder_preview');
						// cp.setSrc(img_url);
					}
				},
				// { id: 'chartbuilder_preview',
				// 	type: 'html',
				// 	style: 'width:95%;',
				// 	html: '&nbsp;',
				// 	setSrc: function(new_src) {
				// 		var img_html = '<img src="' + new_src + '" />';
				// 		this.getElement().setHtml(img_html);
				// 	}
				// },
				{ id: 'chartbuilder_insert',
					type: 'button',
					align: 'center',
					label: 'Insert Chart',
					onClick: function(evt) {
						this.insertChart(true);
					},
					insertChart: function(close) {
						if (typeof(close) == "undefined") { close = true; };
						var d = this.getDialog();
						var img_data = d.getContentElement('main', 'chartbuilder_img_data').getValue();
						var json_obj = JSON.parse(img_data);
						insert_diveimage_figurebox(current_editor, json_obj);
						if (close) {
							
							d.getButton("ok").click();
						};
					}


				}
				]
			}
		]
	};
});
