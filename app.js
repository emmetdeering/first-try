/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'notesAppObj',

    controllers: ['Notes'],   // make application aware of the notes controller class
                                // by adding to apps controller config
    
    models: [
        'Note'
    ],

    stores: [
        'Notes'
    ],

    views: [                   // declare dependancies using view config
        'NotesList',
        "NoteEditor"  //also instantiate the view in the applications launch function
    ],

    launch: function() {
        var notesListView = {
            xtype :  "noteslistview" // using alias class to replace line below
        };
        //var notesListContainer = Ext.create("notesApp.view.NotesListContainer");
       
        var noteEditorView = {   //instantiate the view in applications launch function
            xtype: "noteeditorview"
        };
        Ext.Viewport.add(notesListView, noteEditorView); 

       // console.log("App Launch");
    }
});