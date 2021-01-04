class Department
{
    /**
     * @param {string} name 
     * @param {User[]} members 
     * @param {Notification[]} subscriptions 
     */
    constructor(name, description, members, subscriptions)
    {
        this.name           = name;
        this.description    = description;
        this.members        = [];
        this.subscriptions  = [];       //  Subscriptions are email alerts to all members of the department except for those who request otherwise

        if (Array.isArray(members))        for (let index = 0; index < members.length; index++)        this.members.push(members[index]);
        if (Array.isArray(subscriptions))  for (let index = 0; index < subscriptions.length; index++)  this.subscriptions.push(subscriptions[index]);
    }

    /** Generate a row element for the tbody element of the table this is to be inserted */
    generateRowElement()
    {
        let row             = document.createElement("tr");
        let attributes      = ["Name", "Description", "Members"];
        let cells           = []

        for (let index = 0; index < attributes.length; index++)     //  Initialize properties with a loop to reduce redundant code
        {
            let cell = document.createElement("td");
            let span = document.createElement("span");
            cell.setAttribute("name", `Department${attributes[index]}Column`);
            cells.push(cell);

            // if (index < 2)
            //     span.textContent = 
            
            cell.appendChild(span);
            row.appendChild(cell);
        }

        cells[0].children[0].textContent = this.name;           //  The child element of the 1st cell should be a span element for the name property
        cells[1].children[0].textContent = this.description;    //  The child element of the 2nd cell should be a span element for the description property

        for (let index = 0; index < this.members.length; index++)   //  Fill the span element for the members property with the names of the members of the department
        {
            let user = this.members[index];

            if (user == null || user == undefined)
            {
                console.log(`The generateRowElement() method of the department class encountered a null element in the for loop on iteration ${index}`)
                continue;
            }
            cells[2].children[0].textContent += `${user.firstName} ${user.lastName}`;
            if (index < this.members.length - 1)
                cells[2].children[0].textContent += ", "            //  Add a comma if this is not the last element of the array
        }
        return row;
    }
}
