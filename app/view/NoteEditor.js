Ext.define("notesAppObj.view.NoteEditor", {
	extend: "Ext.form.Panel",
	requires: "Ext.form.FieldSet",
	alias: "widget.noteeditorview",
	config: {
		scrollable: 'vertical'
	},
	initialize: function() {

		this.callParent(arguments);

		var backButton = {
            xtype: "button",
            ui: "back",
            text: "Home",
            handler: this.onBackButtonTap,
            scope: this
        };

        var saveButton = {
            xtype: "button",
            ui: "action",
            text: "Save",
            handler : this.onSaveButtonTap, //handler config defines handler function that runs when user taps btn
            scope: this                     // make sure we run handler in the scope of th NoteEditor
        };

        var topToolbar = {  //define top Toolbar with 2 buttons
            xtype: "toolbar",	//home button and back btn(above)
            docked: "top",
            title: "Edit Note",
            items: [
                backButton,
                { xtype: "spacer" },
                saveButton
            ]
        };

        var deleteButton = {
            xtype: "button",
            iconCls: "trash",
            iconMask: true,
            handler: this.onDeleteButtonTap,  //using handler and scope configs to map the function
            scope: this
        };

        var bottomToolbar = { //define btm toolbar with delete button
            xtype: "toolbar",
            docked: "bottom",
            items: [
                deleteButton
            ]
        };

        var noteTitleEditor = {  //edit notes title
            xtype: 'textfield',
            name: 'title',
            label: 'Title',
            required: true
        };

        var noteNarrativeEditor = {	//edit note narrative
            xtype: 'textareafield',
            name: 'narrative',
            label: 'Narrative'
        };

        


        this.add([		// after views defined, add to the view
            topToolbar,
            { xtype: "fieldset", //also add Ext.form.Fieldset to enhance apperance of the form
                items: [noteTitleEditor, noteNarrativeEditor]
            },
            bottomToolbar
        ]);	

    },
           
    onSaveButtonTap: function() {  //define onSaveButtonTap() function to save (btn above)
        console.log("saveNoteCommand");
        this.fireEvent("saveNoteCommand", this);
    },

    onDeleteButtonTap: function () {
        console.log("deleteNoteCommand");
        this.fireEvent("deleteNoteCommand", this);
    },

    onBackButtonTap: function () {
        console.log("backToHomeCommand");
        this.fireEvent("backToHomeCommand", this);
    }
});