
class Message
{
    /**
     * @param {number}      id                      The number representing the identity of this Message object for use with retrieving it from the database
     * @param {User}        author                  The user who posted the message
     * @param {string}      subject                 What the message is about
     * @param {date}        date                    When the message was posted
     * @param {string}      category                The classification of the message
     * @param {Department}  associatedDepartments   The departments for which this message is concerned
     * @param {Phase}       associatedPhase         The phase for which this message is concerned
     * @param {string}      message                 The communication itself
     * @param {Message[]}   replies                 The messages that are associated with this message
     */
    constructor(id, author, subject, date, category, associatedDepartments, associatedPhase, message, replies)
    {
        this.id                         = id
        this.author                     = author;
        this.subject                    = subject;

        if (date == null)   this.date   = new Date();
        else                this.date   = date;
        this.category                   = category;
        this.associatedDepartments      = [];
        this.associatedPhase            = associatedPhase;
        this.message                    = message;
        this.replies                    = [];

        if (Array.isArray(associatedDepartments))   for (let index = 0; index < associatedDepartments.length;   index++)    this.associatedDepartments  .push(associatedDepartments[index]);
        if (Array.isArray(replies))                 for (let index = 0; index < replies.length;                 index++)    this.replies                .push(replies[index]);
    }

    /**Message objects may be nested
     * @param {Message} message 
     */
    reply(message)
    {
        this.replies.push(message);
    }

    /** Generate the message panel displaying the message and its related attributes*/
    generateElement()
    {
        let mainPanel   = document.createElement("div");
        let leftPanel   = document.createElement("div");
        let rightPanel  = document.createElement("div");

        let labelNames  = ["ID", "Author", "Subject", "Date", "Category", "Department", "Phase"];
        let attributes  = ["id", "author", "subject", "date", "category", "associatedDepartments", "associatedPhase", "message", "replies"];
        let values      = [this.id, this.author, this.subject, this.date, this.category, this.associatedDepartments, this.associatedPhase, this.message, this.replies];
        let textElements= [];

        mainPanel.setAttribute("class", "Message");
        mainPanel.setAttribute("value", this.id);
        mainPanel.setAttribute("onclick", `document.getElementById('PhaseEditorMessagesSelectedID').textContent = '${this.id}';`);

        leftPanel.setAttribute("style", "display:inline-block");
        rightPanel.setAttribute("style", "display:inline-block");

        for (let index = 0; index < attributes.length; index++)     //  Initialize each of the components of the message object
        {
            if (index == 7)         //  If the current iteration is on the message part of the object
            {
                let textarea = document.createElement("textarea");
                textarea.setAttribute("class", "inputFields");
                textarea.setAttribute("rows", 10);
                textarea.setAttribute("cols", 50);
                textarea.setAttribute("disabled", true);
                textarea.value = values[index];
                textElements.push(textarea);
            }

            else if (index == 8)    //  If the current iteration is on the replies of the object
            {
                let details = document.createElement("details");
                let summary = document.createElement("summary");
                summary.appendChild(document.createTextNode("Replies"));
                details.appendChild(summary);
                textElements.push(details);

                for (let replyIndex = 0; replyIndex < this.replies.length; replyIndex++)
                    details.appendChild(this.replies[replyIndex].generateElement());        //  Add all the replies under this Message Panel object
            }

            else                    //  All other cases
            {
                let span = document.createElement("span");
                let label = document.createElement("label");

                label.appendChild(document.createTextNode(`${labelNames[index]} : `));
                label.appendChild(span);

                label.setAttribute("style", "display: block; padding:10px;");
                span.textContent = values[index];
                textElements.push(label);
            }
        }

        mainPanel.appendChild(leftPanel);
        mainPanel.appendChild(textElements[6]); //  Place the message part of the main panel between the left and right sides
        mainPanel.appendChild(rightPanel);
        mainPanel.appendChild(textElements[7]); //  Place the replies part of the main panel after all the other elements and on a new line

        leftPanel.appendChild(textElements[0]); //  Add the text for the author's name to the left side of the message
        leftPanel.appendChild(textElements[1]); //  Add the text for the message subject to the left side of the message
        leftPanel.appendChild(textElements[2]); //  Add the text for the message's date to the left side of the message

        rightPanel.appendChild(textElements[3]); //  Add the text for the message's category to the right side of the message
        rightPanel.appendChild(textElements[4]); //  Add the text for the message's associatedDepartments to the right side of the message
        rightPanel.appendChild(textElements[5]); //  Add the text for the message's associatedPhase to the right side of the message

        return mainPanel;
    }

        /** Generate a row element for the tbody element of the table this is to be inserted */
        generateRowElement()
        {
            let subjectValue    = null;
            let departmentValue = null;
            let phaseValue      = null;
            let authorValue     = null;

            if (this.subject == null)   subjectValue = "(No subject entered)";
            else                        subjectValue = this.subject;
            if (this.associatedDepartments.length == 0)
                departmentValue = "(No Departments Selected)";
            else
            {
                departmentValue = "";   
                for (let index = 0; index < this.associatedDepartments.length; index++)     //  Fill the span element for the associated departments property with the names
                {
                    let department = this.associatedDepartments[index];
                    departmentValue += `${department.name}`;
                    if (index < this.associatedDepartments.length - 1)
                        departmentValue += ", "                                             //  Add a comma if this is not the last element of the array
                }
            }

            if (this.associatedPhase        == null)    phaseValue      = "(No Phase Selected)";          else phaseValue         = this.associatedPhase.title;
            if (this.author                 == null)    authorValue     = "(No Author?)";                 else authorValue        = `${this.author.firstName} ${this.author.lastName}`;

            console.log("subject value:")
            console.log(subjectValue)

            if (subjectValue == null)
                console.log("subjectValue is null")

            if (subjectValue == "")
                console.log("subjectValue is emoty")

            let row             = document.createElement("tr");
            let attributes      = ["ID", "Author", "Subject", "Date", "Category", "Associated Departments", "Associated Phase", "Message"];
            let values          = [this.id, authorValue, subjectValue, this.date, this.category, departmentValue, phaseValue, this.message];
            let cells           = []

            for (let index = 0; index < attributes.length; index++)     //  Initialize properties with a loop to reduce redundant code
            {
                let cell = document.createElement("td");
                let span = document.createElement("span");
                
                cell.setAttribute("name", `Message${attributes[index]}Column`);
                cells.push(cell);
                span.textContent = values[index];
                cell.appendChild(span);
                row.appendChild(cell);
            }

            return row;
        }
}
