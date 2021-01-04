class User
{
    /**
     * @param {string}          username 
     * @param {string}          password 
     * @param {string}          firstName 
     * @param {string}          lastName 
     * @param {string}          email 
     * @param {string}          phone
     * @param {[]}              pictures
     * @param {Notification[]}  notifications
     */
    constructor(username, password, firstName, lastName, email, phone, pictures, notifications)
    {
        this.username               = username;
        this.password               = password;
        this.firstName              = firstName;
        this.lastName               = lastName;
        this.email                  = email;
        this.phone                  = phone;
        this.pictures               = [];
        this.notifications          = null;      //  Alerts for which this user is subscribed to for alerts

        if (Array.isArray(pictures))                for (let index = 0; index < pictures.length; index++)               this.pictures.push(pictures[index]);
        
        if (Array.isArray(notifications))
        {
            this.notifications = [];
            for (let index = 0; index < notifications.length; index++)          this.notifications.push(notifications[index]);
        }

        // else
        // this.notifications          =       //  Alerts for which this user is subscribed to for alerts
        // [
        //     new Notification("Project Proposed", true, false, true),
        //     new Notification("Project Planned", true, false, true),
        //     new Notification("Project Started", true, false, true),
        //     new Notification("Project In Progress", true, false, true),
        //     new Notification("Project Nearly Overbudget", true, false, true),
        //     new Notification("Project Overbudget", true, false, true),
        //     new Notification("Project Nearly Overdue", true, false, true),
        //     new Notification("Project Overdue", true, false, true),
        //     new Notification("Project On Hold", true, false, true),
        //     new Notification("Project Cancelled", true, false, true),
        //     new Notification("Project Failed Completion", true, false, true),
        //     new Notification("Project Completed Successfully", true, false, true),
        // ];

        this.idStyles       =
        [
        ];

        this.elementStyles  =
        [
            new CustomStyle("body",                     ["background-color"], ["burlywood"]),
                //  Table
            new CustomStyle("caption",                  ["font-size", "font-family", "border-style"], ["xx-large", "fantasy", "groove"]),
            new CustomStyle("tfoot",                    ["background-color"], ["aquamarine"]),

        ];

        this.classStyles    = 
        [
            new CustomStyle("inputFields",              ["padding",  "margin", "border-radius", "font-size"], ["10px", "10px", "20px", "large"]),
            new CustomStyle("pageColumn",               ["float", "height"], ["left", "100vh"]),
            new CustomStyle("OverviewDescription",      ["font-family"], ["Verdana, Geneva, Tahoma, sans-serif"]),


                //  Navigation
            new CustomStyle("navigationLinksList",      ["background-color", "font-size", "text-align"], ["aquamarine", "x-large", "center"]),
            new CustomStyle("navigationLinksHover",     ["background-color", "border-radius"], ["burlywood", "20px"]),
            new CustomStyle("navigationLinks",          ["padding", "font-family", "list-style", "cursor"], ["10px", "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", "none", "pointer"]),
            new CustomStyle("navigationLinksA",         ["text-decoration"], ["none"]),
            new CustomStyle("navigationButtons",        ["padding", "margin", "border-radius", "font-family", "font-size", "background-color"], ["10px", "10px", "20px", "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", "x-large", "aquamarine"]),

            new CustomStyle("navigationButtonsHover",   ["background-color"], ["burlywood"]),

            new CustomStyle("dataTableHeader",          ["transform", "height"], ["rotate(-45deg)", "100px"]),
            new CustomStyle("tableFields",              ["padding", "margin", "border-radius"], ["10px", "10px", "10px"]),
            new CustomStyle("userNotifications",        ["width", "cursor", "font-size", "border-radius"], ["100px", "pointer", "larger", "10px"])
        ];
    }

    /** Queries the Departments database for Departments that include this user */
    getDepartments()
    {

    }

    /** Queries the Projects database for Projects whose leader is this user */
    getProjectsLead()
    {

    }

    /** Queries the Projects database for Projects whose team members includes this user */
    getProjectsParticipated()
    {

    }

    /** Generate a row element for the tbody element of the table of the listing page */
    generateRowElement()
    {
        let row             = document.createElement("tr");
        let attributes      = ["Username", "Password", "First Name", "Last Name", "Email", "Phone"];
        let attributeValues = [this.username, "(Confidential)", this.firstName, this.lastName, this.email, this.phone];
        let cells           = []

        for (let index = 0; index < attributes.length; index++)     //  Initialize properties with a loop to reduce redundant code
        {
            let cell = document.createElement("td");
            let span = document.createElement("span");

            span.textContent = attributeValues[index];
            cell.setAttribute("name", `User${attributes[index]}Column`);
            cells.push(cell);

            cell.appendChild(span);
            row.appendChild(cell);
        }
    
        return row;
    }
}

/** CSS for the elements, text and backgrounds*/
class CustomStyle
{
    /**
     * Custom CSS styling that can be edited by the user
     * @param {string}      element The html element or class, such as <body>, <H1>, and <table>
     * @param {string[]}    styles  An parallel array of names of the styles for the specified element, such as background-color, padding, margin, border-radius and so on
     * @param {[]}          values  An parallel array of values of the specified styles, such as 10px or green.
     */
    constructor(element, style, value)
    {
        this.element    = element;
        this.style      = style;
        this.value      = value;
    }
}
