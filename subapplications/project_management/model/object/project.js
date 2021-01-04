/**
 * The core element of this application.
 */
class Project
{
    /** The central component of the PRoject Management application, the Project class maintains the structure of all the data associated with projects
     * @param {string}      title           The name of the project
     * @param {string}      description     The overview of the project. Verbose details should be specified in the phases
     * @param {boolean}     isCategory      Determines if this project is a category for which new projects can use as a template
     * @param {Project}     category        The category of the project helps organize projects and assign presets
     * @param {User}        lead            The individual who leads the project
     * @param {string}      priority        How important this project is
     * @param {string}      status          The current state of the project
     * @param {number}      budget          The maximum amount of money permitted to be spent on the project
     * @param {number}      budgetWarning   The point for which an alert should be issued when approaching the budget
     * @param {date}        dueDate         The latest date permitted on the project
     * @param {date}        dueDateWarning  The point for which an alert should be issued when approaching the due date
     * @param {date}        created         When the project was created
     * @param {date}        modified        When the project was last modified
     * @param {Phase[]}     phases          The divisions of the project
     * @param {Project[]}   subprojects     Projects associated with this project
     */
    constructor(title, description, isCategory, category, lead, priority, status, budget, budgetWarning, dueDate, dueDateWarning, created, modified, phases, subprojects)
    {
        //  Core attributes
        if (title == null)    throw `The Project class' constructor received a null for the argument title`;
        
        this.title          = title;
        this.description    = description;
        this.isCategory     = isCategory;
        this.category       = category;
        this.lead           = lead;
        this.priority       = priority;        //  The options are Low, Medium, High and Critical. If no priority is explicitly specified, low is assumed
        this.status         = status;
        
        //  Totals
        this.budget         = budget;
        this.budgetWarning  = budgetWarning;
        this.dueDate        = dueDate;
        this.dueDateWarning = dueDateWarning;

        this.created        = created;
        this.modified       = modified;


        if (created == null)    this.created    = new Date();
        else                    this.created    = created;

        if (created == null)    this.modified   = "Never Modified";
        else                    this.modified   = modified;


        //  Progression
        this.phases         = [];

        //  Sub projects
        this.subprojects    = [];           //  An array of ProjectStage objects, specifying the needs, budget

    }

    /** Return a copy of this object
     */
    clone()
    {
        let newPoject = new Project(this.title, this.category, this.description, this.priority, this.lead, this.budget, this.budgetWarning, this.dueDate, this.dueDateWarning);

        for (let index = 0; index < this.phases.length; index++)        newProject.phases.push(this.phases[index]);
        for (let index = 0; index < this.subprojects.length; index++)   newProject.subprojects.push(this.subprojects[index]);

        return project;
    }

    getTimeWorked()
    {
        console.log("The getTimeWorked() method of the Project.Totals class is not yet implemented");
        return 0;
    }

    /** Get the team members from all the phases */
    getAllTeamMembers()
    {
        let teamMembers = [];                //  Counting the supervisor

        if (this.phases == null)
            return teamMembers;

        for (let stageIndex = 0; stageIndex < this.phases.length; stageIndex++)
            if (this.phases[stageIndex] == null)
                continue;
            else
                for (let teamIndex = 0; teamIndex < this.phases.length; teamIndex++)
                    teamMembers.push(this.phases[stageIndex].teamMembers[teamIndex]);

        return teamMembers;
    }

    getDeficit()
    {
        return this.budget - this.costsAccrued;
    }

    /** Generate a row element for the tbody element of the table of the listing page */
    generateRowElement()
    {
        let isCategory          = (this.isCategory ? "Yes" : "No");      //  If the value of isCategory is true, return the string yes, otherwise no
        let selectedCategory    = null;
        let selectedLeader      = null;

        if (this.category   == null)    selectedCategory= "No Category Selected";
        else                            selectedCategory= `${this.category.title}`;
        if (this.lead       == null)    selectedLeader  = "No Leader Selected";
        else                            selectedLeader  = `${this.lead.firstName} ${this.lead.lastName}`;

        let row             = document.createElement("tr");
        let attributes      = ["Title",     "Description",      "Is Category",  "Category",         "Project leader",   "Priority",     "Status",       "budget",       "budgetWarning",    "dueDate",      "dueDateWarning",       "created",      "modified"];
        let attributeValues = [this.title,  this.description,   isCategory,     selectedCategory,   selectedLeader,     this.priority,  this.status,    this.budget,    this.budgetWarning, this.dueDate,   this.dueDateWarning,    this.created,   this.modified];
        let cells           = [];

        for (let index = 0; index < attributes.length; index++)     //  Initialize properties with a loop to reduce redundant code
        {
            let cell = document.createElement("td");
            let span = document.createElement("span");
            cell.setAttribute("name", `${attributes[index]}Column`);
            cells.push(cell);

            span.textContent = attributeValues[index];              //  Set the text that appears in each cell

            cell.appendChild(span);
            row.appendChild(cell);
        }
    
            // cells[0].children[0].textContent = this.name;   //  The child element of the first cell should be a span element for the name property
    
            // for (let index = 0; index < this.members.length; index++)
            // {
            //     let user = this.members[index];
            //     cells[1].children[0].textContent += `${user.firstName} ${user.lastName}`;
            //     if (index < this.members.length - 1)
            //         cells[1].children[0].textContent += ", "            //  Add a comma if this is not the last element of the array
            // }
            return row;
        }
}
