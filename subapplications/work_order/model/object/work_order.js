class WorkOrder
{
    /**
     * @param {number}  orderNumber The identifying component of the work order, used for tracking
     * @param {Date}    date        When the work order was made. This value should be automatically assigned
     * @param {string}  client      The name of the individual who made the work work order request
     * @param {number}  priority    The urgency of the work order: 
     * 
     * 1 - To be completed before any other tasks
     * 2 - To be completed after current task
     * 3 - To be completed by the end of the day
     * 4 - To be completed by the end of the week
     * 5 - To be completed anytime after the week
     * @param {Date}    dueDate     The deadline of the work order
     * @param {User}    assignedTo
     * @param {string}  description
     * @param {string}  employeeNotes
     * @param {string}  employeeSignature 
     * @param {string}  supervisorSignature 
     * @param {Date}    employeeSignatureDate 
     * @param {Date}    supervisorSignatureDate 
     */
    constructor(orderNumber, date, client, priority, dueDate, assignedTo, description, employeeNotes, employeeSignature, supervisorSignature, employeeSignatureDate, supervisorSignatureDate)
    {
        this.orderNumber            = orderNumber;
        this.date                   = date;
        this.client                 = client;
        this.priority               = parseInt(priority);
        this.dueDate                = dueDate;
        this.assignedTo             = assignedTo;
        this.description            = description;

        this.employeeNotes          = "";
        this.employeeSignature      = "";
        this.supervisorSignature    = "";
        this.employeeSignatureDate  = null;
        this.supervisorSignatureDate= null;

        if (employeeNotes           != null)  this.employeeNotes            = employeeNotes;
        if (employeeSignature       != null)  this.employeeSignature        = employeeSignature;
        if (supervisorSignature     != null)  this.supervisorSignature      = supervisorSignature;
        if (employeeSignatureDate   != null)  this.employeeSignatureDate    = employeeSignatureDate;
        if (supervisorSignatureDate != null)  this.supervisorSignatureDate  = supervisorSignatureDate;
    }

    /** Generate a row element for the tbody element of the table of the listing page
     * @param {string} targetPath The URL for which the browser should redirect to when the user clicks the row
     */
    generateRowElement()
    {
        let priorityString = "";
        switch(this.priority)
        {
            case 1: priorityString = "1: Before any other tasks";  break;
            case 2: priorityString = "2: After current task";  break;
            case 3: priorityString = "3: By end of the day";  break;
            case 4: priorityString = "4: By the end of the week";  break;
            case 5: priorityString = "5: Anytime after the week";  break;
            default: throw `Unexpected case, ${this.priority}, in the switch statement of the generateRowElement() function of the WorkOrder class`
        }

        let date = this.dueDate;
        // if (this.dueDate instanceof Date)
        //     date = `${this.dueDate.getMonth()} / ${this.dueDate.getDay()} ${this.dueDate.getFullYear()}`;

        console.log("this.assignedTo");
        console.log(this.assignedTo);
        let row             = document.createElement("tr");
        let attributes      = ["Order", "Date", "Requested By", "Priority", "Due Date", "Assign To", "Description"];
        let attributeValues = [this.orderNumber, this.date, this.client, priorityString, date, `${this.assignedTo.firstName} ${this.assignedTo.lastName}`, this.description];
        let cells           = []

        for (let index = 0; index < attributes.length; index++)     //  Initialize properties with a loop to reduce redundant code
        {
            let cell = document.createElement("td");
            let span = document.createElement("span");

            span.textContent = attributeValues[index];
            cell.setAttribute("name", `WorkOrder${attributes[index]}Column`);
            cells.push(cell);

            cell.appendChild(span);
            row.appendChild(cell);
        }
    
        return row;
    }
}
