var user = null; //  The central object of this page

class UserEditor
{
    constructor()
    {
        this.activeUser = new User("New User");    //  Not to be confused with the user object on file, which appears in the users list, the activeUser property stores all the variables and functions to be used with this editor. It is for the purpose of user interactions without being forced to commit changes to file
        this.user       = null;                    //  The User object on file, which appears in the users list
        this.moduleName = "User";
        
        ////////////////////////////////////////////////////////////////////////////////////////
        //  Messages for use with the displayHelp(elementID, message) function
        ////////////////////////////////////////////////////////////////////////////////////////

        this.message =
        {
            //  Main sections
            general:
            {
                username    : userUsernameDescription,
                password    : userPasswordDescription,
                firstName   : userFirstNameDescription,
                lastName    : userLastNameDescription,
                email       : userEmailDescription,
                phone       : userPhoneDescription
            },

            pictures:
            {
                main        : userMainPhotoDescription,
                remove      : userMainPhotoRemoveDescription,
                list        : userPhotoListDescription,
                delete      : userPhotoDeleteDescription,
                setMain     : userMainPhotoSetDescription,
                upload      : userPhotoUploadDescription
            },

            projectHistory:
            {
                leadList        : userProjectsLeadDescription,
                participatedList: userProjectsPartcipatedDescription
            },

            stylePreferences:
            {

            }
        };

        // let projectsLead            = [];
        // let projectsParticipated    = [];

        // populateSelectFromObjectArray(this.element.projectHistory.leadList, projects, "title", ["title"], {includeProperty: {propertyName: "lead", propertyValue: this.activeUser}})

        this.selection = 
        {
            // projectHistory :
            // {
            //     leadList            : "Not implemented yet",
            //     participatedList    : "Not implemented yet"
            // }
        };
        
        this.emptySelection =
        {
            projectHistory :
            {
                leadList            : "Not implemented yet",
                participatedList    : "Not implemented yet"
            }
        };

        this.emptyCollection = {}               //  To stay consistent with the structure

        ////////////////////////////////////////////////////////////////////////////////////////
        //  Array for initializing references to HTML elements and their IDs
        ////////////////////////////////////////////////////////////////////////////////////////
        this.name =
        {
            general                 : ["Username", "Password", "FirstName", "LastName", "Email", "Phone"],
            pictures                : ["Main", "Remove", "List", "Delete", "SetMain", "Upload"],
            projectHistory          : ["LeadList", "ParticipatedList", "Edit"],
            notificationPreferences : ["Table", "Check", "Uncheck"],
            stylePreferences        : ["Table"]
        }

        //  Generate references to the HTML elements from sections
        this.element =
        {
            general                 : {},
            pictures                : {},
            projectHistory          : {},
            notificationPreferences : {},
            stylePreferences        : {}
        };

        this.fieldValues =
        {
            //  Main sections
            general:
            {
                username    : this.activeUser.username,
                password    : "(confidential)",
                firstName   : this.activeUser.firstName,
                lastName    : this.activeUser.lastName,
                email       : this.activeUser.email,
                phone       : this.activeUser.phone
            },

            pictures:
            {
                main        : this.activeUser,
                list        : ["Not Implemented yet"]
            },

            projectHistory:
            {
                leadList        : "Not implemented yet",
                participatedList: "Not implemented yet"
            },

            stylePreferences:
            {
                
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

    updateActiveUserFromFields()
    {
        if (user == null)
            return;

        //  General Attributes
        this.activeUser.title           = this.elements.general.title.value;
        this.activeUser.category        = this.elements.general.category.selectedValue;
        this.activeUser.description     = this.elements.general.description.value;
        this.activeUser.priority        = this.elements.general.priority.selectedValue;
        this.activeUser.lead            = this.elements.general.lead.selectedValue;

        //  Totals
        this.activeUser.budget          = this.elements.general.budget.value;
        this.activeUser.budgetWarning   = this.elements.general.budgetWarning.value;
        this.activeUser.dueDate         = this.elements.general.dueDate.value;
        this.activeUser.dueDateWarning  = this.elements.general.dueDateWarning.value;
    }
    
    populateFieldsFromActiveUser()
    {
        if (user == null)
            return;

        this.elements.general.title.value               = this.activeUser.title;
        this.elements.general.category.selectedValue    = this.activeUser.category;
        this.elements.general.description.value         = this.activeUser.description;
        this.elements.general.priority.selectedValue    = this.activeUser.priority;
        this.elements.general.lead.selectedValue        = this.activeUser.lead;
    
        //  Totals
        this.elements.general.budget.value              = this.activeUser.budget
        this.elements.general.budgetWarning.value       = this.activeUser.budgetWarning
        this.elements.general.dueDate.value             = this.activeUser.dueDate 
        this.elements.general.dueDateWarning.value      = this.activeUser.dueDateWarning
    }

    submitUser()
    {

    }

    addNewPhase()
    {
        let phase = this.phaseEditor.createRecord();
        let phases = this.activeUser.phases;                         //  Shortcut variable to reduce the probability of error

        if (phase.title == "")
        {
            document.getElementById("helpbox").value = "Every phase must have a title for which to identify. Make sure to fill out the title field under Progression > General.";
            return;
        }

        for (let index = 0; index < phases.length; index++)             //  Loop through the array of phase objects to verify that a phase with this name hasn't been added
            if (phases[index].title == phase.title)                     //  If a duplicate is detected, notifiy the user in the helpbox and abort the execution of the method
            {
                document.getElementById("helpbox").value = `A phase with the name, ${phase.title}, already exists.`;
                return;
            }
        
        phases.push(phase);

        let select  = document.getElementById("PhaseEditorMainListID");
        let option  = document.createElement("option");
        option.appendChild(document.createTextNode(phase.title));
        option.setAttribute("value", phase.title);

        if (select.options[0].getAttribute("value") == "None")          //  If this is the first phase to be added, then remove the "No phases created" option in the list
            select.remove(0);
        select.appendChild(option);

    }

    updatePhaseFields()
    {
        let value = document.getElementById("PhaseEditorMainListID").value;
        let phases = this.activeUser.phases;

        for (let index = 0; index < phases.length; index++)
            if (phases[index].title == value)
            {
                this.phaseEditor.populateFields(phases[index]);
                return;
            }
    }
}
