Ext.define("notesAppObj.store.Notes", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    config: {
        model: "notesAppObj.model.Note",  //NOTES CAN NOW SAVE AND READ DATA FROM LOCAL STORAGE
        proxy: {
            type: 'localstorage',  //LocalStorageProxy uses the HTML5 localStorage API to save Model data on the client browser. 
            id: 'notes-app-store'  //This proxy is ideal for storing multiple records of similar data. And it requires that we provide the id config, 
        },                          //which is the key that will identify our data in the localStorage object.
        sorters: [{ property: 'dateCreated', direction: 'DESC'}],
    

    //rendering the cached notes grouped by date
        grouper: {
            sortProperty: "dateCreated", //sortProperty config defines the value used to sort groups
            direction: 'DESC',              //direction specifies direction to sort group
            groupFn : function (record) { //groupFn config is the function used to generate the label for the group
                                                //label will be the date
                if (record && record.data.dateCreated) {
                    return record.data.dateCreated.toDateString();
                }else {
                    return '';
                }
            }
        }
    }

});






//////// hARDCODED NOTES ////////////

/*Ext.define("notesApp.store.Notes", {       
	extend:'Ext.data.Store',

	requires: "Ext.data.proxy.LocalStorage",

	config: {                          
		model: "notesApp.model.Note", // contains instances of the Note model
        data: [                         //contains some hardcoded records
            { title: "Note 1", narrative: "narrative 1" },
            { title: "Note 2", narrative: "narrative 2" },
            { title: "Note 3", narrative: "narrative 3" },
            { title: "Note 4", narrative: "narrative 4" },
            { title: "Note 5", narrative: "narrative 5" },
            { title: "Note 6", narrative: "narrative 6" }
        ],
        sorters: [{property: 'dateCreated', direction: 'DESC' //want notes to render by creation date
    	}]
	}
});*/