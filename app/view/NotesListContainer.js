Ext.define("notesAppObj.view.NotesListContainer", {
    extend: "Ext.Container",
    alias: "widget.noteslistcontainer", //alias config defines an xtypefor our class
                                        //we can refer to NotesListContainer class with the xtype=2noteslistcontainer config
    

    initialize: function() {  //initialize used to perform logic after class created
        this.callParent(arguments);   //invoking callParent()

        var newButton = {           //define newButton
            xtype: 'button',                
            text: 'New',
            ui: 'action',
            handler: this.onNewButtonTap, //added a tap handler using handler config
            scope: this
        };

        var topToolBar = {
            xtype: 'toolbar',
            title: 'My Notes',
            docked: 'top',
            items: [
                {xtype: 'spacer' },
                newButton
            ]
        };

        var notesList = {
            xtype: "notesList",
            store: Ext.getStore('Notes'), //add store to notesList declaration
            listeners: {        //setting a listener for the disclose event of the list
                disclose: { 
                    fn: this.onNotesListDisclose, scope: this 
                }
            }
        };

        this.add([topToolBar, notesList]);
    },
    
    onNewButtonTap: function() {                // this function will capture tap events on button
        console.log("newNoteCommand");          //& transform them into event more specific and descriptive of application business logic
        this.fireEvent("newNoteCommand", this); // call this event newNoteCommand
    },                                            // newNoteCommand, which will be captured by the controller
                                                //-event was captured by controller, now capturing event within the view and broadcasting a new event

    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record)
    },                                      
                                              
    config: {
        layout: {                          
            type: "fit"
        }   
    }
});





//ORIGINAL START TO NOTESAPP

/*Ext.define("notesApp.view.NotesListContainer", { //define an extension to Ext.Container class
    extend: "Ext.Container",

    }

    requires: [
        'Ext.Toolbar'
    ],

    config: {
        items: [{
            xtype: "toolbar", //way to creat components without having to use Ext.create & specify full class name
            docked: "top",
            title: "My Notes",
            items: [{
                xtype: "spacer" //place new button on right end of toolbar
            }, {
                xtype: "button",
                text: "New",
                ui: "action", //give button a specific look
                id:"new-note-btn"
            }]
        }]
    }
});*/