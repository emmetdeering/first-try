Ext.define("notesAppObj.model.Note", {
	extend: "Ext.data.Model",
	
	config: {
		idProperty: 'id', //the field the framework can use to uniquely identify a note
		fields: [					// note with four fields
			{ name: 'id', type: 'int'},
			{ name: 'dateCreated', type: 'date', dateFormat: 'c'},
			{ name: 'title', type: 'string' },
			{ name: 'narrative', type: 'string' }
		],
		validations: [		// these 3 fields in Note model mandatory
			{ type: 'presence', field: 'id' },
			{ type: 'presence', field: 'dateCreated' },
			{ type: 'presence', field: 'title', message: 'Please enter a title for this note.' }
		]
	}
})