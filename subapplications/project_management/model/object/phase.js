class Phase
{
    /**Create a new Phase object to be inserted into the list of a project
     * @param {string} title 
     * @param {string} description 
     * @param {date} dateStarted 
     * @param {date} dueDate 
     * @param {date} warning 
     * @param {string} progressStatus 
     * @param {string} punctualStatus 
     * @param {Requirement[]} requirements 
     * @param {Finance} finance 
     */
    constructor(title, description, dateStarted, dueDate, warning, progressStatus, punctualStatus, requirements, finance, messages)
    {
        this.title              = title;

        if (this.title == null)
            throw "The title argument of the phase class must not be null";

        this.description        = description;
        this.dateStarted        = dateStarted;
        this.dueDate            = dueDate;         //  The latest date this project is expected to be completed in. Email alerts go out to the project lead if this is exceeded in a ProjectPhase object.
        this.warning            = warning;
        this.progressionStatus  = progressStatus;
        this.punctualStatus     = punctualStatus;
//        this.requirements       = requirements;
        
        //  Participants
        this.teamMembers        = [];

        this.finance            = finance;

        this.requirements       = [];
        this.pictures           = [];
        this.blueprints         = [];
        this.messages           = [];
    }

    edit(title, description, dateStarted, dueDate, warning, progressionStatus, punctualStatus, requirements, finance)
    {
        if (title               != null)    this.title              = title;
        if (description         != null)    this.description        = description;
        if (dateStarted         != null)    this.dateStarted        = dateStarted;
        if (dueDate             != null)    this.dueDate            = dueDate;         //  The latest date this project is expected to be completed in. Email alerts go out to the project lead if this is exceeded in a ProjectPhase object.
        if (warning             != null)    this.warning            = warning;
        if (progressionStatus   != null)    this.progressionStatus  = progressionStatus;
        if (punctualStatus      != null)    this.punctualStatus     = punctualStatus;
        if (requirements        != null)    this.requirements       = requirements;
    }

    getTimeStatus()
    {
        if (this.dueDate == null)
            return "No Due Date";
        else
        {
            if (this.dueDate > new Date())
                return "Overdue";
            if (this.warning != null)
            {
                if (this.warning > new Date())
                    return "Nearly Overdue";
            }
            return "Not Overdue";
        }
    }
}

/** The Requirement class models is an element that appears in the phase object's requirements array. On screen, is is displayed as a checkbox followed by a brief description in a list item element*/
class Requirement
{
    /**
     * @param {string} title  The text that appears next to the checkbox in the list item element
     * @param {string} description  Message that appears in the help box
     */
    constructor(title, description)
    {
        this.title    = title;
        this.description    = description;
        this.satisfied      = false;
    }

    /** Produce an html list item element containing a label element containing a checkbox*/
    generateElement()
    {
        let label           = document.createElement("label");
        let checkbox        = document.createElement("input");
        let listItem        = document.createElement("li");

        checkbox.setAttribute("type", "checkbox");

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(this.title));
        if (this.description == "") listItem.setAttribute("onmouseover", `document.getElementById('helpbox').value = 'No description has been specified for the requirement titled ${this.title}'`);
        else                        listItem.setAttribute("onmouseover", `document.getElementById('helpbox').value = '${this.description}'`);
        listItem.setAttribute("class", "inputFields");
        listItem.setAttribute("onclick", `document.getElementById('PhaseEditorRequirementsSelectedID').textContent = '${this.title}';`);
        listItem.setAttribute("value", this.title);
        listItem.appendChild(label);

        return listItem;
    }
}

class Finance
{
    constructor(budget, warning, description, status)
    {
        this.budget         = budget;           //  A ProjectBudget object
        this.warning        = warning;             //  If the warning is set, then this value will determine when the status changes to Nearly Overbudget
        this.description    = description;
        this.expenses       = [];               //  An array of objects with the keys description (string) and expense (number)
        this.status         = status;
    }

    getCostsAccrued()
    {
        let total = 0;
        for (let index = 0; index < this.expenses.length; index++)
            total += this.expenses[index].cost;
    }

    getExpenseRows()
    {
        let expenseRows = []
        for (let index = 0; index < this.expenses.length; index++)
            expenseRows.push(this.expenses[index].generateRowElement);

        return expenseRows;
    }

    updateStatus()
    {
        if (this.getCostsAccrued() > budget)
            this.status = "Overbudget";
        else if (this.warning != null)
        {
            if (this.getCostsAccrued > this.warning)
                this.status = "Nearly Overbudget";
        }
        else
            this.status = "Not Overbudget";
    }
}

class Expense
{
    /**
     * @param {number} cost 
     * @param {string} title 
     * @param {string} description 
     */
    constructor(cost, title, description)
    {
        this.cost           = cost;
        this.title          = title;
        this.description    = description;
    }

    generateElement()
    {
        let row             = document.createElement("tr");

        let cells = ["Cost", "Title", "Description", "PhaseBudget", "ProjectBudget"];
        let values = [this.cost, this.title, this.description, null, null];

        row.setAttribute("value", this.title);
        row.setAttribute("onclick", `document.getElementById('PhaseEditorExpensesSelectedID').textContent = '${this.title}';`);

        for (let index = 0; index < cells.length; index++)
        {
            let cell = document.createElement("td");

            if (values[index] != null)
            {
                let span = document.createElement("span");
                span.textContent = values[index]
                cell.setAttribute("name", `PhaseEditorTable${values[index]}Column`);
                cell.appendChild(span);
            }
            else
            {
                let meter = document.createElement("meter");
                meter.setAttribute("value", this.cost);
                cell.appendChild(meter);
            }

            row.appendChild(cell);
        }

        return row;
    }
}

class TeamMember
{
    /**
     * @param {User} member 
     * @param {string} role 
     * @param {Department} department 
     * @param {number} wage 
     * @param {string} schedule 
     * @param {user} supervisor 
     */
    constructor(member, role, department, wage, schedule, supervisor)
    {
        this.member = member;
        this.role = role;
        this.department = department;
        this.wage = wage;
        this.schedule = schedule;
        this.supervisor = supervisor;
    }

    generateElement()
    {
        let row     = document.createElement("tr");

        let cells   = ["Member", "Role", "Department", "Wage", "Schedule", "Supervisor"];
        let values  = [this.member, this.role, this.department, this.wage, this.schedule, this.supervisor];

        row.setAttribute("value", this.member.username);
        row.setAttribute("onclick", `document.getElementById('PhaseEditorTeamSelectedID').textContent = '${this.member.username}';`);

        for (let index = 0; index < cells.length; index++)
        {
            let cell = document.createElement("td");
            let span = document.createElement("span");

            span.textContent = values[index];
            cell.setAttribute("name", `PhaseEditorMemberTable${values[index]}Column`);
            cell.appendChild(span);

            row.appendChild(cell);
        }

        return row;
    }
}
