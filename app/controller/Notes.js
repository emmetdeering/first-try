Ext.define("notesAppObj.controller.Notes", {
    extend: "Ext.app.Controller",
     requires: [
        'Ext.MessageBox'
    ],

    config: {
    	refs: { 		// we are going to look up our views by alias
    		notesListView: "noteslistview",
            noteEditorView: "noteeditorview",  //to activate Note Editor view in controller, need to acquirereference to view
    	    notesList: '#notesList'                           //this ref automatically creates a getNoteEditor function in the controller
    	},                              //which can be used to refer to NoteEditor instance and make it active view
       
        control: {
            notesListView: {       //commands fired by the notes list container
                newNoteCommand: 'onNewNoteCommand',
                editNoteCommand: 'onEditNoteCommand' //add editNoteCommand handlerto controller
            },

            noteEditorView: {   //saveNoteCommand not enough for controller to be able to listen need to tell controller where this event is coming from
               //commands fired by the note editor
                saveNoteCommand: 'onSaveNoteCommand',
                deleteNoteCommand: 'onDeleteNoteCommand',
                backToHomeCommand: 'onBackToHomeCommand'
            }       
        }
    },

    //Transitions       
    slideLeftTransition: {  // define variable for activateNoteEditor() function 
        type: 'slide',
        direction: 'left'
    },

    slideRightTransition: {  // define variable for activateNoteEditor() function 
        type: 'slide',
        direction: 'right'
    },

//Helper functions
    getRandomInt: function (min, max) {     //getRandomInt helper function to generate unique id
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    activateNoteEditor: function (record) { //activateNoteEditor() function will load the new note into the Note Editor and
                                                //make the Editor active
        var noteEditorView = this.getNoteEditorView();
        noteEditorView.setRecord(record); // load() is deprecated. // make use of setRecord() function which allows us to load the values of a model
                                        //instance into the forms fields whose names match those of the models fields
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
            //:{type: 'slide',direction: 'left'});//bring in Note Editor into view with slide
    },

    activateNotesList: function() {
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },

    //COMMANDS

    onNewNoteCommand: function () {
        console.log("onNewNoteCommand");

        var now = new Date();                      //getRandomInt helper function to generate unique id
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create("notesAppObj.model.Note", {
            id: noteId,
            dateCreated: now,
            title: "",              //creating a new note and passing it to activateNoteEditor() function
            narrative: ""
        });

        this.activateNoteEditor(newNote); 
    },

    onEditNoteCommand: function (list, record) { //onEditNoteCommand event
        console.log("onEditNoteCommand");
        this.activateNoteEditor(record);  //code to activate NoteEditor
    },  

    onSaveNoteCommand: function () {  //define function

        console.log("onSaveNoteCommand");

        var noteEditorView = this.getNoteEditorView();  //first acquire references to the note being edited

        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();   //and the values in the form fields

        // Update the current note's fields with form values. / transfer new values to the loaded note
        currentNote.set("title", newValues.title);
        currentNote.set("narrative", newValues.narrative);

                    //validate new values we loaded into model instance
        var errors = currentNote.validate();  //first call models validate function

        if (!errors.isValid()) { //then call isValid() function on errors object returned by validate()
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentNote.reject();    //title is only field with validation. if model invalid, display alert and call models reject function. 
            return;                             //this function reverts field back to original vaklues before exiting
        }

        var notesStore = Ext.getStore("Notes"); //if note valid save it to devivce

        if (null == notesStore.findRecord('id', currentNote.data.id)) {  // as process works for new or edited notes, 
            notesStore.add(currentNote);     //have to find out if note is new by searching the store using its findRecord() function
        }

        notesStore.sync(); //asks the stores proxy to process all the changes, saving new or edited or removing deleted

        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]); // after stores records updated sort by date

        this.activateNotesList();
    },

    onDeleteNoteCommand: function() {
        console.log("onDeleteNoteCommand");

        var me = this;

        Ext.Msg.confirm("Warning", "Are you sure Delete?", function(btn, text) {
        if(btn == 'yes') {
        var noteEditorView = me.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore("Notes");

        notesStore.remove(currentNote);
        notesStore.sync();
        me.activateNotesList();
        }
        });
    },

/*    onDeleteNoteCommand: function () {

        console.log("onDeleteNoteCommand");

        var noteEditorView = this.getNoteEditorView();  //this function created by framework when editor declared in refs:
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore("Notes");

        notesStore.remove(currentNote); //remove current note
        notesStore.sync();              // make permanent

        this.activateNotesList(); // activate notes list container view
    },*/

    onBackToHomeCommand: function () {

        console.log("onBackToHomeCommand");
        this.activateNotesList();
    },

    //Bass Class functions
    launch: function () {     // the controllers launch() function is invoked after the Applications launch() function runs
        this.callParent(arguments);	
        Ext.getStore('Notes').load(); //invoking the stores load() function
        console.log("launch");
    },
    init: function () {   //init function is invoked by framework before the Applications
        this.callParent();   		// launch() function
        console.log("init");
    }
});