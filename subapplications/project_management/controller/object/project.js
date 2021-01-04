/**Initialize the contents of a table element and its related components based on the properties of the source object class. 
 * 
 * This function calls the getTableElements(idPrefix) function and then generates the fields that appear in the table footer for use with adding a new record.
 * 
 * The returned object includes these objects as well as arrays for field names and column widths, which are used by the Table class to configure the table.
 * @param {string} idPrefix  The ID of the table to be initialized
 */
function initializeProjectTable(idPrefix)
{
    let tableElements = getTableElements(idPrefix);
//      constructor(title, description, category, priority, lead, status, budget, budgetWarning, dueDate, dueDateWarning, created, modified, isCategory, phases, subprojects)

    let footerFields =
    [
        document.createElement("input"),    //  Title field
        document.createElement("textarea"), //  Description Field
        document.createElement("input"),    //  isCategory field
        document.createElement("select"),   //  Category list
        document.createElement("select"),   //  Project Lead list
        document.createElement("select"),   //  Priority list
        document.createElement("select"),   //  Status list
        document.createElement("input"),    //  Budget field
        document.createElement("input"),    //  Budget Warning field
        document.createElement("input"),    //  Due Date field
        document.createElement("input"),    //  Due Date Warning field
        document.createElement("input"),    //  created field
        document.createElement("input"),    //  modified field
    ];

    footerFields[0].setAttribute("required", true);     //  Title field
    footerFields[1].setAttribute("rows", 10);           //  Description Field
    footerFields[2].setAttribute("type", "checkbox");   //  isCategory field
    footerFields[7].setAttribute("type", "number");     //  Budget field
    footerFields[7].setAttribute("min", 0);             //  Set the Budget field's minimum value to 0
    footerFields[8].setAttribute("type", "number");     //  Budget Warning field
    footerFields[8].setAttribute("min", 0);             //  Set the Budget Warning field's minimum value to 0
    footerFields[9].setAttribute("type", "date");       //  Due Date field

    footerFields[10].setAttribute("type", "date");      //  Due Date Warning field
    footerFields[11].setAttribute("value", new Date()); //  created field
    footerFields[11].setAttribute("disabled", true);    //  created field
    footerFields[12].setAttribute("disabled", true);    //  Due Date Warning field

    footerFields[7].onchange = function()               //  Set the max value of the Budget Warning to the current value of budget because it wouldn't make sense for the warning to exceed the budget
    {   footerFields[8].setAttribute("max", footerFields[7].value); };
    footerFields[9].onchange = function()               //  Set the max value of the Due Date Warning to the current value of Due Date because it wouldn't make sense for the warning to exceed the Due Date
    {   footerFields[10].setAttribute("max", footerFields[9].value); };

    for (let index = 3; index < 5; index++)             //  The Category and Project lead select elements are strategically placed next to each other in the array to make them more accessible in a loop
    {
        let noneOption  = document.createElement("option");
        noneOption.setAttribute("value", "None");
        noneOption.appendChild(document.createTextNode("None Selected"));
        footerFields[index].appendChild(noneOption);
    }

    let priorityOptions         = generateOptionArray(getProjectPriorities());
    let statusOptions           = generateOptionArray(getProgressionStatuses());
    
    for (let index = 0; index < priorityOptions.length; index++)    footerFields[5].appendChild(priorityOptions[index]);
    for (let index = 0; index < statusOptions.length; index++)      footerFields[6].appendChild(statusOptions[index]);
    for (let index = 3; index < statusOptions.length; index++)      statusOptions[index].setAttribute("disabled", true);                                //  Set the option elements after Started to disable to reduce probility of error
    
    populateSelectFromObjectArray(footerFields[3], projects, "title", ["title"], {includeProperty: {propertyName: "isCategory", propertyValue: true}}); //  Populate the category select element with Project objects
    populateSelectFromObjectArray(footerFields[4], users, "username", ["firstName", "lastName"]);                                                       //  Populate the lead select element with User objects

    return {
        columnNames     : ["Title",     "Description",  "Is Category?", "Category", "Project Leader",   "Priority", "Status",   "budget",   "Budget Warning",   "Due Date", "Due Date Warning",    "Created",  "Modified"],
        columnWidths    : [200,         200,            50,             100,        100,                100,        100,        100,        100,                100,        100,                    200,        200],
        dataSource      : projects,
        descriptions    : getProjectPropertyDescriptions(),
        footerFields    : footerFields,
        tableElements   : tableElements
    }
}

/** Return an object encompassing a the data the user entered into the cells of the table footer row for use of creating a new Project object and inserting a row into a table
 * @param {HTMLElement[]} footerFields 
 */
function getProjectFooterValues(footerFields)
{
    return{
        title           : footerFields[0].value,
        description     : footerFields[1].value,
        isCategory      : footerFields[2].checked,
        category        : getSelectedObject(footerFields[3].value, projects, "title"),
        lead            : getSelectedObject(footerFields[4].value, users, "username"),
        priority        : footerFields[5].value,
        status          : footerFields[6].value,
        budget          : footerFields[7].value,
        budgetWarning   : footerFields[8].value,
        dueDate         : footerFields[9].value,
        dueDateWarning  : footerFields[10].value,
        created         : footerFields[11].value,
        modified        : footerFields[12].value
    }
}
