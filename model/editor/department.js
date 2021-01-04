var department = null; //  The central object of this page

class DepartmentEditor
{
    constructor()
    {
        this.activeDepartment = new Department("New Department");    //  Not to be confused with the Department object on file, which appears in the departments list, the activeDepartment property stores all the variables and functions to be used with this editor. It is for the purpose of Department interactions without being forced to commit changes to file
        this.Department       = null;                    //  The Department object on file, which appears in the departments list
        this.moduleName = "Department";
        
        ////////////////////////////////////////////////////////////////////////////////////////
        //  Departments for use with the displayHelp(elementID, department) function
        ////////////////////////////////////////////////////////////////////////////////////////

        this.message =
        {
            //  Main sections
            general:
            {
                name        : departmentNameDescription,
                description : departmentDescriptionDescription
            },

            members:
            {
                table       : departmentMembersDescription,
                add         : departmentMembersAddDescription,
                remove      : departmentMembersRemoveDescription
            },

            projectHistory:
            {
                table       : departmentProjectsHistoryDescription
            },

            messages:
            {
                list        : messageDescription
            }
        };

        this.selection = 
        {
        };
        
        this.emptySelection =
        {
        };

        this.emptyCollection = {}               //  To stay consistent with the structure

        ////////////////////////////////////////////////////////////////////////////////////////
        //  Array for initializing references to HTML elements and their IDs
        ////////////////////////////////////////////////////////////////////////////////////////
        this.name =
        {
            general                 : ["Name", "Description"],
            members                 : ["Table", "Member", "Role", "Add", "Remove"],
            projectHistory          : ["Table"],
            messages                : ["List"]
        }

        //  Generate references to the HTML elements from sections
        this.element =
        {
            general                 : {},
            members                 : {},
            projectHistory          : {},
            messages                : {}
        };

        this.fieldValues =
        {
            //  Main sections
            general:
            {
                name        : this.activeDepartment.name,
                description : this.activeDepartment.description
            },

            members:
            {
                table       : null
            },

            projectHistory:
            {
                table: "Not implemented yet"
            },

            messages:
            {
                list        : null
            }
        };

        initializeEditorReferences(this);      //  Initialize the references to the HTML elements from the data in this.arrays
        validateEditor(this);
        populateEmptySelectOption(this);
        populateSelect(this);
        initializeDescriptions(this);

        populateSelectFromObjectArray(this.element.members.member, users, "username", ["firstName", "lastName"]);

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

    updateActiveDepartmentFromFields()
    {
        if (department == null)
            return;

        //  General Attributes
        this.activeDepartment.name           = this.elements.general.title.value;
        this.activeDepartment.department      = this.elements.general.category.selectedValue;
    }
    
    populateFieldsFromActiveDepartment()
    {
        if (department == null)
            return;

        this.elements.general.name.value        = this.activeDepartment.title;
        this.elements.general.description.value = this.activeDepartment.category;
    }

    submitDepartment()
    {

    }
}
