class PhaseEditor
{
    constructor()
    {
        this.moduleName = "Phase";
        this.activePhase = new Phase("New Phase");

        //  Progression
        this.message =
        {
            main :
            {
                list                : "The Phase List provides customization options for the phases of this project.\\n\\nThe contents of General, Requirements, Limitation Attributes, Finance, Team, Pictures, Blueprints and Message Board are all associated with individual phases.\\n\\nWhen adding a new phase, the contents of the fields will not clear automatically. This is useful if many attributes do not change between phases, such as team members. If you would like to quickly clear all fields, use the Reset Fields option in the Actions list.\\n\\nSelect a phase and the aforementioned subsections will update accordingly.",
            },
            
            general :
            {
                title               : "Phase / Title is a brief description for this phase of this project.",
                description         : "Phase / Description is where the details on this phase of this project should be described.\\n\\nSpecific tasks should be entered into the Requirements subsection.",
                dateStarted         : `Phase / Date Started shows when this phase of the project began.\\n\\nThis value is only set when the Progression Status selection is set to Started`,
                timeWorked          : "Phase / Time Worked is the amount of time spent on this phase of this project.",
                progressionStatus   : `Phase / Progression Status is the current state of this phase of this project.\\n\\nNotifications can be configured to be issued based on which option this status is set to.`,
                punctualStatus      : "Phase / Punctuality Status is automatically adjusted based on the due date specified.",
            },

            requirements :
            {
                title               : "The name that uniquely identifies the requirement to be created, edited or deleted.",
                description         : "The description associated with the requirement that appears in this help box.",
                selected            : "The selected requirement displays which requirement is set to be affected if the Edit or Delete button is pressed",
                add                 : "Create a new requirement with the parameters specified by the title and description fields.",
                edit                : "Edit a selected requirement.\\n\\nRequirements can be selected without modifying their completion status by clicking the number next to its title.",
                delete              : "Delete a selected requirement.\\n\\nRequirements can be selected without modifying their completion status by clicking the number next to its title."
            },

            limitation :
            {
                dueDate             : "Phase / Due Date is the latest date for which this phase of this project is expected to complete.\\n\\nThis value cannot exceed the value specified for the project as a whole as specified in the General section.",
                warning             : "Phase / Warning specifies when an alert should be issued prior to nearing the due date of the this phase of this project.\\n\\nThis value cannot exceed the value specified for Due Date"
            },

        
            finance :
            {
                budget              : "Finance / Budget is the maximum amount of funds alotted to a phase of this project. If the budget is exceeded, an alert is issued to the project lead.\\n\\nThis value cannot exceed the value specified for the project as a whole as specified in the General section.",
                warning             : "Finance / Warning specifies a numerical value for which an alert should be issued regarding nearing the limit of the budget of that phase of the project.\\n\\nThis value cannot exceed the value specified for Budget.",
                description         : "Finance / Description is where the details on the general expenses of this particular phase of the project should be described.\\n\\nText areas can be resized with the mouse.",
                costsAccrued        : "Finance / Costs Accrued is the fees incurred on the project, summed from the contents of the Expenses list.",
                expenses            : "Finance / Expenses is a list detailing each expense of a particular phase of the project with a title, description and cost value.\\n\\nEach entry comes in the format of [monetary value], [Cost title], [Detailed description]",
                status              : "Finance / Status is automatically adjusted based on the budget and warning parameters specified."
            },

                team :
                {
                    table           : "Phase / Team Members are the users who work together on this phase of the project."
                },

                pictures :
                {
                    list            : "Phase / Pictures is a collection of images associated with this phase.\\n\\nPictures can be embedded into messages, description sections or blueprints.\\n\\nClicking a picture name will make that picture appear next to this list. Select multiple options to display multiple pictures."
                },

                blueprints :
                {
                    list            : "Phase / Blueprints is a collection of customizable illustrations for use with planning.\\n\\nThe blueprints use scalable vector graphics to allow zooming and panning of the graphic.\\n\\nBlueprints can be embedded into messages or description sections.\\n\\nClicking a blueprint name will make that blueprint appear next to this list. Select multiple options to display multiple blueprints."
                },

                messages :
                {
                    category        : "The message board will allow for messages of various classifications such as progress reports, questions, setbacks, revisions, and notes.\\n\\nNotifications can be configured to go to specified individuals based on which category is selected.",
                    departments     : "Specifying an associated department is useful for filtering messages that may not be relevant to other members.\\n\\nThis is particularly useful if multiple departments are involved in a project."
                }
        }

        this.emptySelection =
        {
            main        : { list            : "No phases created"},
            team        : { member          : "No users selected", department: "No department selected", supervisor: "No supervisor selected"},
            pictures    : { list            : "No pictures uploaded"},
            blueprints  : { list            : "No blueprints created or uploaded"},
            messages    : { departments      : "No department selected", category: "No Category selected"}
        }

        this.emptyCollection =
        {
            team        : { quantity        : "There are no team members associated with this phase."},
            pictures    : { quantity        : "There are no pictures associated with this phase."},
            blueprints  : { quantity        : "There are no blueprints associated with this phase."},
            finance     : { expenses        : "No expenses Accrued"},
            messages    : { quantity        : "No messages posted yet. When messages are posted, the most recent ones will appear here first."}
        }

        this.selection =
        {
            general :
            {
                progressionStatus   : projectProgressionStatusArray,
                punctualStatus      : ["On Time", "Nearly Overdue", "Overdue"]
            },

            finance :
            {
                status              : ["Not Overbudget", "Nearly Overbudget", "Overbudget"],
            },

            messages :
            {
                category     : messageCategoryArray
            }
        }

        this.name =
        {
            main        : ["List", "NewPhase", "EditPhase"],
            general     : ["Title", "Description", "ProgressionStatus", "PunctualStatus", "DateStarted", "TimeWorked"],
            requirements: ["Title", "Description", "Selected", "Add", "Edit", "Delete", "List"],
            limitation  : ["Warning", "DueDate"],
            finance     : ["Budget",  "Warning", "Description", "CostsAccrued", "Status", "Expenses"],
            team        : ["Table", "Quantity", "Member", "Role", "Department", "Wage", "Schedule", "Supervisor"],
            pictures    : ["Search", "Quantity", "List", "Upload", "Layout"],
            blueprints  : ["Search", "Quantity", "List", "Upload", "Layout"],
            messages    : ["Search", "Quantity", "List", "Add", "Id", "Author", "Subject", "Date", "Category", "Departments", "Phase", "Message"]
        }

        this.element =
        {
            main        : {},
            general     : {},
            limitation  : {},
            requirements: {},
            finance     : {},
            team        : {},
            pictures    : {},
            blueprints  : {},
            messages    : {}
        };

        initializeEditorReferences(this);      //  Initialize the references to the HTML elements from the data in this.arrays
        validateEditor(this);
        populateEmptySelectOption(this);
        generateQuantityMessage(this);
        populateSelect(this);                   //  Planned should be the default for progressionStatus, but I'll deal with that later
        initializeDescriptions(this);

                //  Set the option elements after Started (3) to disabled because those statuses are not applicable to a phase that was not started.
        for (let index = 3; index < this.element.general.progressionStatus.options.length; index++)
            this.element.general.progressionStatus.options[index].setAttribute("disabled", "disabled");

        //  If Started (options index 2) is clicked, then enable the remaining ProgressionStatuses and set the Date Started value to the current date
        this.element.general.progressionStatus.options[2].setAttribute("onclick", "projectEditor.elements.phase.dateStarted.value = new Date(); for (let index = 0; index < projectEditor.elements.phase.progressionStatus.options.length; index++) projectEditor.elements.phase.progressionStatus.options[index].removeAttribute('disabled');");

        let projectLead      = document.getElementById("ProjectEditorGeneralLeadID");
        let projectCategory  = document.getElementById("ProjectEditorGeneralCategoryID");
        let messageDepartment = document.getElementById("PhaseEditorMessagesDepartmentsID");
        let teamDepartments = document.getElementById("PhaseEditorTeamDepartmentID");
        let teamMember      = document.getElementById("PhaseEditorTeamMemberID");
        let teamSupervisor  = document.getElementById("PhaseEditorTeamSupervisorID");

        populateSelectFromObjectArray(projectCategory, projects, "title", ["title"], {includeProperty: {propertyName: "isCategory", propertyValue: true}}); //  Populate the category select element with Project objects

        populateSelectFromObjectArray(messageDepartment, departments, "name", ["name"]);
        populateSelectFromObjectArray(teamDepartments, departments, "name", ["name"]);

        populateSelectFromObjectArray(projectLead, users, "username", ["firstName", "lastName"]);
        populateSelectFromObjectArray(teamMember, users, "username", ["firstName", "lastName"]);
        populateSelectFromObjectArray(teamSupervisor, users, "username", ["firstName", "lastName"]);
        populateSelectFromObjectArray(teamSupervisor, users, "username", ["firstName", "lastName"]);
        
    }

    getDataFromFields()
    {
        let data =
        {
            //  General attributes
            title               : this.element.general.title.value,
            description         : this.element.general.description.value,
            dateStarted         : new Date(),
            progressionStatus   : this.element.general.progressionStatus.value,
            punctualStatus      : this.element.general.punctualStatus.value,
            //  Limitation attributes
            warning             : this.element.limitation.warning.value,
            dueDate             : this.element.limitation.dueDate.value,
            //  Finance
            budget              : this.element.finance.budget.value,
            financeDescription  : this.element.finance.description.value,
            financeWarning      : this.element.finance.warning.value,
            financeStatus       : this.element.finance.status.value,
            //  Finance / Expenses
            expenses :
            {
                cost            : document.getElementById("PhaseEditorFinanceExpenseCostID").value,
                title           : document.getElementById("PhaseEditorFinanceExpenseTitleID").value,
                description     : document.getElementById("PhaseEditorFinanceExpenseDescriptionID").value,
                phaseBudget     : "Not implemented yet",
                projectBudget   : "Not implemented yet"
            },

            team                :
            {
                member          : document.getElementById("PhaseEditorTeamMemberID").value,
                role            : document.getElementById("PhaseEditorTeamRoleID").value,
                department      : "Not implemented yet",
                wage            : document.getElementById("PhaseEditorTeamWageID").value,
                schedule        : document.getElementById("PhaseEditorTeamScheduleID").value,
                supervisor      : "Not implemented yet"
            },

            message             :
            {
                subject         : document.getElementById("PhaseEditorMessagesSubjectID").value,
                category        : document.getElementById("PhaseEditorMessagesCategoryID").value,
                department      : document.getElementById("PhaseEditorMessagesDepartmentsID").value,
                message         : document.getElementById("PhaseEditorMessagesMessageID").value,
            }
        };

        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now

        console.log("Data object returned from the getDataFromFields() function:");
        console.log(data);
        return data;
    }

    /**Executes when the user selects an existing phase from the list
     * @param {Phase} phase 
     */
    populateFields(phase)
    {
        //  General
        this.element.general.title              .value  = phase.title;
        this.element.general.description        .value  = phase.description;
        this.element.general.dateStarted        .valueAsDate  = phase.dateStarted;
        this.element.general.progressionStatus  .value  = phase.progressionStatus;
        this.element.general.punctualStatus     .value  = phase.punctualStatus;
        //  Limitation attributes
        this.element.limitation.warning         .value  = phase.warning;
        this.element.limitation.dueDate         .value  = phase.dueDate;
        //  Finance
        this.element.finance.budget             .value  = phase.finance.budget;
        this.element.finance.description        .value  = phase.finance.description;
        this.element.finance.warning            .value  = phase.finance.warning;
        this.element.finance.status             .value  = phase.finance.status;
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    createRecord()
    {
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now

        let data    = this.getDataFromFields();        
        return new Phase(data.title, data.description, new Date(), data.dueDate, data.warning, data.progressionStatus, data.punctualStatus, null, new Finance(data.budget, data.financeDescription, data.financeWarning, data.financeStatus));
    }

    addRequirement()
    {
        addRecordToCollection(["PhaseEditorRequirementsTitleID", "PhaseEditorRequirementsDescriptionID"],
        "PhaseEditorRequirementsListID", "PhaseEditorRequirementsTitleID", "Requirement", this.activePhase.requirements, "title");
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    editRequirement()
    {
        editRecordFromCollection(["PhaseEditorRequirementsTitleID", "PhaseEditorRequirementsDescriptionID"],
        "PhaseEditorRequirementsListID", "PhaseEditorRequirementsTitleID", "PhaseEditorRequirementsSelectedID", "Requirement", this.activePhase.requirements, "title");
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    deleteRequirement()
    {
        deleteRecordFromCollection("PhaseEditorRequirementsListID", "PhaseEditorRequirementsSelectedID", "Requirement", this.activePhase.requirements, "title");
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    /** When the budget is specified, set that value as the max attribute for warning because it would not make sense for the warning to exceed the budget*/
    updateBudgetWarningMax()
    {
        let budget = document.getElementById("PhaseEditorFinanceBudgetID");
        let warning = document.getElementById("PhaseEditorFinanceWarningID");
        warning.setAttribute("max", budget.value);
    }

        /** When the due date is specified, set that value as the max attribute for warning because it would not make sense for the warning to exceed the due due date*/
    updateDateWarningMax()
    {
        let dueDate = document.getElementById("PhaseEditorLimitationDueDateID");
        let warning = document.getElementById("PhaseEditorLimitationWarningID");
        warning.setAttribute("max", dueDate.value);
    }

    /**Support function for use with the addExpense(), editExpense() and deleteExpense() functions.
     * A boolean value will be passed to the calling function to determine whether the function should continue or abort execution
     */
    validateExpense()
    {
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now

        let budgetElement = document.getElementById("PhaseEditorFinanceBudgetID");
        if (budgetElement.value == "")
        {
            document.getElementById('helpbox').value = "A phase budget must be set if expenses are to be applied. The phase budget may reach but not exceed the Project Budget."
            return false;
        }

        if (this.activePhase.finance == null)
            this.activePhase.finance = new Finance(budgetElement.value, document.getElementById("PhaseEditorFinanceWarningID").value, document.getElementById("PhaseEditorFinanceDescriptionID").value, document.getElementById("PhaseEditorFinanceStatusID").value);
        return true;
    }
    
    addExpense()
    {
        if (this.validateExpense() == true)
            addRecordToCollection(["PhaseEditorFinanceExpenseCostID", "PhaseEditorFinanceExpenseTitleID", "PhaseEditorFinanceExpenseDescriptionID"],
            "PhaseEditorFinanceExpensesID", "PhaseEditorFinanceExpenseTitleID", "Expense", this.activePhase.finance.expenses, "title");
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    editSelectedExpense()
    {
        if (this.validateExpense() == true)
            editRecordFromCollection(["PhaseEditorFinanceExpenseCostID", "PhaseEditorFinanceExpenseTitleID", "PhaseEditorFinanceExpenseDescriptionID"],
            "PhaseEditorFinanceExpensesID", "PhaseEditorFinanceExpenseTitleID", "PhaseEditorExpensesSelectedID", "Expense", this.activePhase.finance.expenses, "title");
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    deleteSelectedExpense()
    {
        if (this.validateExpense() == true)
            deleteRecordFromCollection("PhaseEditorFinanceExpensesID", "PhaseEditorExpensesSelectedID", "Expense", this.activePhase.finance.expenses, "title");
            
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
    }

    addTeamMember()
    {
        addRecordToCollection(["PhaseEditorTeamMemberID", "PhaseEditorTeamRoleID", "PhaseEditorTeamDepartmentID", "PhaseEditorTeamWageID", "PhaseEditorTeamScheduleID", "PhaseEditorTeamSupervisorID"],
        "PhaseEditorTeamTableID", "PhaseEditorTeamMemberID", "TeamMember", this.activePhase.teamMembers, "member");
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    editSelectedTeamMember()
    {
        editRecordFromCollection(["PhaseEditorTeamMemberID", "PhaseEditorTeamRoleID", "PhaseEditorTeamDepartmentID", "PhaseEditorTeamWageID", "PhaseEditorTeamScheduleID", "PhaseEditorTeamSupervisorID"],
        "PhaseEditorTeamTableID", "PhaseEditorTeamMemberID", "PhaseEditorTeamSelectedID", "TeamMember", this.activePhase.teamMembers, "member");
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    deleteSelectedTeamMember()
    {
        deleteRecordFromCollection("PhaseEditorTeamTableID", "PhaseEditorTeamSelectedID", "TeamMember", this.activePhase.teamMembers, "members");
        
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    addMessage()
    {
        addRecordToCollection(["PhaseEditorMessagesIdID", "PhaseEditorMessagesAuthorID", "PhaseEditorMessagesSubjectID", "PhaseEditorMessagesDateID", "PhaseEditorMessagesCategoryID", "PhaseEditorMessagesDepartmentsID", "PhaseEditorMessagesPhaseID", "PhaseEditorMessagesMessageID"],
        "PhaseEditorMessagesListID", "PhaseEditorMessagesIdID", "Message", this.activePhase.messages, "id");
        document.getElementById("PhaseEditorMessagesIdID").value = messages.length + 1;
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    editSelectedMessage()
    {
        editRecordFromCollection(["PhaseEditorMessagesAuthorID", "PhaseEditorMessagesSubjectID", "PhaseEditorMessagesDateID", "PhaseEditorMessagesCategoryID", "PhaseEditorMessagesDepartmentsID", "PhaseEditorMessagesPhaseID", "PhaseEditorMessagesMessageID"],
        "PhaseEditorMessagesListID", "PhaseEditorMessagesSubjectID", "PhaseEditorMessagesSelectedID", "Message", this.activePhase.messages, "subject");
        document.getElementById("PhaseEditorMessagesIdID").value = messages.length;
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}

    deleteSelectedMessage()
    {
        deleteRecordFromCollection("PhaseEditorMessagesListID", "PhaseEditorMessagesSelectedID", "Message", this.activePhase.messages, "subject");
        document.getElementById("PhaseEditorMessagesIdID").value = messages.length + 1;
        document.getElementById("PhaseEditorGeneralDateStartedID").value    = new Date();       //  Set the date field of the General section of the Phase to now 
        document.getElementById("PhaseEditorMessagesDateID").value          = new Date();       //  Set the date field of the Message section of the Phase to now
}
}