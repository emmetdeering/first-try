Ext.define("notesAppObj.view.NotesList", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.noteslistview",

    config: {    //taking advantage of the config object to define the view items
    	layout: {			//and the event listeners needed for the New button and the disclose buttons of the notes List
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "My Notes",
            docked: "top",
            items: [
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    text: 'New',
                    ui: 'action',
                    itemId: "newButton"
                }
            ]
        }, {
            xtype: "list",
            store: "Notes",
            itemId:"notesList",
            loadingText: "Loading Notes...",
            emptyText: '<div class="notes-list-empty-text">No notes found.</div>',
            onItemDisclosure: true,
            grouped: true,
            itemTpl: '<div class="list-item-title">{title}</div><div class="list-item-narrative">{narrative}</div>'
        }],
        listeners: [{ //defining event listeners
            delegate: "#newButton", //delegate config is the value of the itemid config of the btn
            event: "tap",
            fn: "onNewButtonTap" //fn config is a pointer to the onNewButton Tap function
        }, {
            delegate: "#notesList",  //delegate points to the list's itemid
            event: "disclose",
            fn: "onNotesListDisclose"
        }]
    },
    		// onNewButtonTap and onNotesListDisclose functions remain unchanged, 
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    }
});

