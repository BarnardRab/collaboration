var project = null; //  The central object of this page

class ProjectEditor
{
    constructor()
    {
        this.activeProject      = new Project("New Project");   //  Not to be confused with the Project object on file, which appears in the Projects list, the activeProject property stores all the variables and functions to be used with this editor. It is for the purpose of user interactions without being forced to commit changes to file
        this.project            = null;                         //  The Project object on file, which appears in the Projects list

        this.phaseEditor        = new PhaseEditor();

//        this.selectedPhase      = new Phase("New Phase");
        this.selectedSubProject = new Project("New Sub Project");
        this.moduleName         = "Project";
        
        ////////////////////////////////////////////////////////////////////////////////////////
        //  Messages for use with the displayHelp(elementID, message) function
        ////////////////////////////////////////////////////////////////////////////////////////

        let descriptionArray = getProjectPropertyDescriptions();
        this.message =
        {
            //  Main sections
            general:
            {
                presets         : "Project / Presets is an autoconfiguration setting determined by the Project Category selected.\\n\\nTime can be saved while creating frequently started projects of a particular category by reapplying phase settings. \\n\\nPreset configurations can be overwritten in this editor on a case by case basis by making changes after selecting a Category.",
                markCategory    : `Project / ${descriptionArray[2]}`,
                title           : `Project / ${descriptionArray[0]}`,
                description     : `Project / ${descriptionArray[1]}`,
                category        : `Project / ${descriptionArray[3]}`,
                lead            : `Project / ${descriptionArray[4]}`,
                priority        : `Project / ${descriptionArray[5]}`,
                budget          : `Project / ${descriptionArray[7]}`,
                budgetWarning   : `Project / ${descriptionArray[8]}`,
                dueDate         : `Project / ${descriptionArray[9]}`,
                dueDateWarning  : `Project / ${descriptionArray[10]}`
            },
    
            subProjects         :
            {
                title           : `Sub-Project / ${descriptionArray[0]}`,
                description     : `Sub-Project / ${descriptionArray[1]}`,
                category        : `Sub-Project / ${descriptionArray[3]}`,
                lead            : `Sub-Project / ${descriptionArray[4]}`,
                priority        : `Sub-Project / ${descriptionArray[5]}`,
                budget          : `Sub-Project / ${descriptionArray[7]}`,
                budgetWarning   : `Sub-Project / ${descriptionArray[8]}`,
                dueDate         : `Sub-Project / ${descriptionArray[9]}`,
                dueDateWarning  : `Sub-Project / ${descriptionArray[10]}`,

                create          : "Create a new Sub-Project.\\n\\nSub-Projects appear in the Project Tree and can form nested hierachies if those projects themselves have Sub-Projects.",
                edit            : "Edit an existing Sub-Project selected from the Project Tree.\\n\\nSub-Projects appear in the Project Tree and can form nested hierachies if those projects themselves have Sub-Projects.",
                add             : "Add an existing independent Project from the complete Projects List to the Project Tree.\\n\\nSub-Projects appear in the Project Tree and can form nested hierachies if those projects themselves have Sub-Projects.",
                remove          : "Remove an existing Sub-Project.\\n\\nTake note that this does not delete the project itself, but dissassociates it from this project, making it independent.",
                delete          : "Remove an existing Sub-Project and deletes it from the entire Project Management database.\\n\\nThere is usually no need to delete a project because setting the Progression Status of the phases removes it from the main listing"
            },
        };

        this.selection = 
        {
            general :
            {
                priority        : getProjectPriorities()
            },

            subProjects :
            {
                priority        : getProjectPriorities()
            }
        };
        
        let category = "No Category Selected";
        let lead = "No User Selected";

        this.emptySelection =
        {
            general :
            {
                category        : category,
                lead            : lead
            },

            subProjects :
            {
                category        : category,
                lead            : lead
            }
        };

        this.emptyCollection = {}               //  To stay consistent with the structure


        ////////////////////////////////////////////////////////////////////////////////////////
        //  Array for initializing references to HTML elements and their IDs
        ////////////////////////////////////////////////////////////////////////////////////////
        this.name =
        {
//            overview    : ["OverviewTitle", "OverviewProjectUpdates", "OverviewCount", "OverviewUpdates", "OverviewLimits", "OverviewLead", "OverviewDescription"],
            general     : ["Presets", "MarkCategory", "Title", "Category", "Description", "Budget", "BudgetWarning", "DueDate", "DueDateWarning", "Priority", "Lead"],
            subProjects : ["Search", "Tree", "TableBody", "Title", "Category", "Description", "Budget", "BudgetWarning", "DueDate", "DueDateWarning", "Priority", "Lead", "Create", "Edit", "Add", "Remove", "Delete"]
        }

        //  Generate references to the HTML elements from sections
        this.element =
        {
  //          overview    : {},
            general     : {},
            subProjects : {},
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

    updateActiveProjectFromFields()
    {
        if (project == null)
            return;

        //  General Attributes
        this.activeProject.title           = this.elements.general.title.value;
        this.activeProject.category        = this.elements.general.category.selectedValue;
        this.activeProject.description     = this.elements.general.description.value;
        this.activeProject.priority        = this.elements.general.priority.selectedValue;
        this.activeProject.lead            = this.elements.general.lead.selectedValue;

        //  Totals
        this.activeProject.budget          = this.elements.general.budget.value;
        this.activeProject.budgetWarning   = this.elements.general.budgetWarning.value;
        this.activeProject.dueDate         = this.elements.general.dueDate.value;
        this.activeProject.dueDateWarning  = this.elements.general.dueDateWarning.value;
    }
    
    populateFieldsFromActiveProject()
    {
        if (project == null)
            return;

        this.elements.general.title.value               = this.activeProject.title;
        this.elements.general.category.selectedValue    = this.activeProject.category;
        this.elements.general.description.value         = this.activeProject.description;
        this.elements.general.priority.selectedValue    = this.activeProject.priority;
        this.elements.general.lead.selectedValue        = this.activeProject.lead;
    
        //  Totals
        this.elements.general.budget.value              = this.activeProject.budget
        this.elements.general.budgetWarning.value       = this.activeProject.budgetWarning
        this.elements.general.dueDate.value             = this.activeProject.dueDate 
        this.elements.general.dueDateWarning.value      = this.activeProject.dueDateWarning
    }


    /**  Add list item elements to the unordered list element called Subprojects Tree
    * Plans for a nested tree to illustrate project hierachy is considered, but not a priority at the moment. 
    * When that is eventually implemented, any subprojects that have subprojects of their own will be represented by list elements within ListItem elements.*/
    populateSubprojectFields()
    {
        for (let index = 0; index < project.subProjects.length; index++)
        {
            let subproject = project.subProjects[index];        //  Shortcut variable to reduce probability of error
            let listItem = document.createElement("li");
            listItem.appendChild(subproject.title);

            listItem.setAttribute("id", `ProjectEditorSubprojectsTree${subproject.title}ID`);
            listItem.setAttribute("value", subproject.title);
        }
    }

    submitProject()
    {

    }

    addNewPhase()
    {
        let phase = this.phaseEditor.createRecord();
        let phases = this.activeProject.phases;                         //  Shortcut variable to reduce the probability of error

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
        let phases = this.activeProject.phases;

        for (let index = 0; index < phases.length; index++)
            if (phases[index].title == value)
            {
                this.phaseEditor.populateFields(phases[index]);
                return;
            }
    }

        /** When the budget is specified, set that value as the max attribute for warning because it would not make sense for the warning to exceed the budget*/
        updateBudgetWarningMax()
        {
            let budget = document.getElementById("ProjectEditorGeneralBudgetID");
            let phaseBudget = document.getElementById("PhaseEditorFinanceBudgetID");
            let warning = document.getElementById("ProjectEditorGeneralBudgetWarningID");
            warning.setAttribute("max", budget.value);

            let subprojectBudget = document.getElementById("ProjectEditorSubProjectsBudgetID");
            let subprojectWarning = document.getElementById("ProjectEditorSubProjectsBudgetWarningID");
            subprojectWarning.setAttribute("max", subprojectBudget.value);

            phaseBudget.setAttribute("max", budget.value);
        }
    
            /** When the due date is specified, set that value as the max attribute for warning because it would not make sense for the warning to exceed the due due date*/
        updateDateWarningMax()
        {
            let dueDate = document.getElementById("ProjectEditorGeneralDueDateID");
            let phaseDueDate = document.getElementById("PhaseEditorLimitationDueDateID");
            let warning = document.getElementById("ProjectEditorGeneralDueDateWarningID");
            warning.setAttribute("max", dueDate.value);

            let subprojectDueDate = document.getElementById("ProjectEditorSubProjectsDueDateID");
            let subprojectWarning = document.getElementById("ProjectEditorSubProjectsDueDateWarningID");
            subprojectWarning.setAttribute("max", subprojectDueDate.value);

            phaseDueDate.setAttribute("max", dueDate.value);

        }

        addExistingSubproject()
        {
            console.log("addExistingSubproject not implemented yet");
        }

        createNewSubproject()
        {
            console.log("createNewSubproject not implemented yet");
        }

        editSelectedSubproject()
        {
            console.log("editSelectedSubproject not implemented yet");
        }

        removeSelectedSubproject()
        {
            console.log("removeSelectedSubproject not implemented yet");
        }

        deleteSelectedSubproject()
        {
            console.log("deleteSelectedSubproject not implemented yet");
        }
}

const projectsListMessageCreateQuick    = "Create new project without enduring the verbose editor. Fill out the required fields in the footer (last row of the table) and press the Submit Quickset New Project button.\\n\\nThe required fields are Title, Description, Category and Lead.";
const projectsListMessageCreate         = "Create a new project with a verbose editor."
const projectsListMessageCreateCategory = "Create a new category.";
const projectsListMessageCreateBlueprint= "Create a graphical representation of the project.";
const projectsListMessageFilterColumns = "Display or hide columns of the table.";
const projectsListMessageFilterProjects     = "Filter table rows based on criteria such as user or due date"
const projectsListMessageHome               = "Go back to the main page."

//  Status
const projectListMessageStatusProposed = "A proposed project is one that is not committed to, but considered. This status is useful for evaluating ideas and options, and sharing them with the department.\\n\\nA proposed project may be in conjunction with another project.";
const projectListMessageStatusPlanned  = "A project received the green light, but has not been started yet. This is the time to assess all the needs, costs and benefits of the project. This Phase gives relevant parties the opportunity to plan ahead and raise concerns that may not have been considered."
