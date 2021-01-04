var message = null; //  The central object of this page

class MessageEditor
{
    constructor()
    {
        this.activeMessage = new Message("New Message");    //  Not to be confused with the Message object on file, which appears in the messages list, the activeMessage property stores all the variables and functions to be used with this editor. It is for the purpose of message interactions without being forced to commit changes to file
        this.message       = null;                    //  The Message object on file, which appears in the messages list
        this.moduleName = "Message";
        
        ////////////////////////////////////////////////////////////////////////////////////////
        //  Messages for use with the displayHelp(elementID, message) function
        ////////////////////////////////////////////////////////////////////////////////////////

        this.message =
        {
            //  Main sections
            general:
            {
                id          : messageIDDescription,
                author      : messageAuthorDescription,
                subject     : messageSubjectDescription,
                date        : messageDateDescription,
                category    : messageCategoryDescription,
                message     : messageMessageDescription
            },

            associations:
            {
                blueprints  : messageAssociationDescription,
                pictures    : messageAssociationDescription,
                departments : messageAssociationDescription,
                projects    : messageAssociationDescription,
                phases      : messageAssociationDescription
            },

            replies:
            {
                count       : "",
                list        : messageRepliesDescription
            }

        };

        this.selection = 
        {
            general:
            {
                category : messageCategoryArray
            }
        };
        
        this.emptySelection =
        {
            associations :
            {
                blueprints  : "None",
                pictures    : "None",
                departments : "None",
                projects    : "None",
                phases      : "None"
            }
        };

        this.emptyCollection = {}               //  To stay consistent with the structure

        ////////////////////////////////////////////////////////////////////////////////////////
        //  Array for initializing references to HTML elements and their IDs
        ////////////////////////////////////////////////////////////////////////////////////////
        this.name =
        {
            general                 : ["Id", "Author", "Subject", "Date", "Category", "Message"],
            associations            : ["Blueprints", "Pictures", "Departments", "Projects", "Phases"],
            replies                 : ["Count", "List"]
        }

        //  Generate references to the HTML elements from sections
        this.element =
        {
            general                 : {},
            associations            : {},
            replies                 : {}
        };

        this.fieldValues =
        {
            //  Main sections
            general:
            {
                id          : this.activeMessage.id,
                author      : this.activeMessage.author,
                subject     : this.activeMessage.subject,
                date        : this.activeMessage.date,
                category    : this.activeMessage.category,
                message     : this.activeMessage.message
            },

            associations:
            {
                phases      : this.activeMessage.associatedPhase,
                departments : this.activeMessage.associatedDepartments
            },

            replies:
            {
                list        : this.activeMessage.replies,
                count       : this.activeMessage.replies.length
            }
        };

        initializeEditorReferences(this);      //  Initialize the references to the HTML elements from the data in this.arrays
        validateEditor(this);
        populateEmptySelectOption(this);
        populateSelect(this);
        initializeDescriptions(this);
    }

    /**
     * Populate the table body element identified by bodyID with the content of rows
     * @param {string} bodyID 
     * @param {ObjectConstructor[]} rows 
     */
    populateTable(bodyID, rows)
    {
        let body = document.getElementById(bodyID);

        if (body == null)             throw `The bodyID argument, ${bodyID}, passed to the populateTable(bodyID, rows) function does not refer to an element`;
        if (!Array.isArray(options))    throw `The options argument, ${options}, passed to the populateTable(bodyID, rows) function is not an array`;
        
    }

    updateActiveMessageFromFields()
    {
        if (message == null)
            return;

        //  General Attributes
        this.activeMessage.name           = this.elements.general.title.value;
        this.activeMessage.message      = this.elements.general.category.selectedValue;
    }
    
    populateFieldsFromActiveMessage()
    {
        if (message == null)
            return;

        this.elements.general.name.value        = this.activeMessage.title;
        this.elements.general.description.value = this.activeMessage.category;
    }

    submitMessage()
    {

    }
}
