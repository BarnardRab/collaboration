/**Initialize the contents of a table element and its related components based on the properties of the source object class. 
 * 
 * This function calls the getTableElements(idPrefix) function and then generates the fields that appear in the table footer for use with adding a new record.
 * 
 * The returned object includes these objects as well as arrays for field names and column widths, which are used by the Table class to configure the table.
 * @param {string} idPrefix  The ID of the table to be initialized
 */
function initializeMessageTable(idPrefix)
{
    let tableElements = getTableElements(idPrefix);

    let footerFields =
    [
        document.createElement("input"),    //  ID field
        document.createElement("input"),    //  User field - This should be locked to the logged in User. For now, the value will be Guest and the field will be disabled
        document.createElement("input"),    //  Subject field
        document.createElement("input"),    //  Date field
        document.createElement("select"),   //  Category field
        document.createElement("select"),   //  Associated Department field
        document.createElement("select"),   //  Associated Phase field
        document.createElement("textarea"), //  Message Field
    ];

    let categoryOptions = generateOptionArray(messageCategoryArray);

    footerFields[0].setAttribute("disabled", true); footerFields[0].setAttribute("value", messages.length);
    footerFields[1].setAttribute("disabled", true); footerFields[1].setAttribute("value", "Guest");
    footerFields[3].setAttribute("disabled", true); footerFields[3].setAttribute("value", new Date);
    footerFields[5].setAttribute("multiple", true);
    footerFields[5].setAttribute("size", 10);
    footerFields[7].setAttribute("rows", 10);
    footerFields[7].setAttribute("required", true);

    for (let index = 5; index < footerFields.length; index++)               //  Add a None selected as the first option for each of the select elements
    {
        let noneOption  = document.createElement("option");
        noneOption.setAttribute("value", "None");
        noneOption.appendChild(document.createTextNode("None Selected"));
        footerFields[index].appendChild(noneOption);
    }

    for (let index = 0; index < categoryOptions.length; index++)
        footerFields[4].appendChild(categoryOptions[index]);

    populateSelectFromObjectArray(footerFields[5], departments, "name", ["name"]);   //  Populate the members select element
    populateSelectFromObjectArray(footerFields[6], projects,    "title", ["title"]);   //  Populate the members select element

    return {
        columnNames     : ["ID",    "Author",   "Subject",  "Date", "Category", "Associated Department",    "Associated Phase", "Message"],
        columnWidths    : [15,      100,        200,        200,    100,        200,                        200,                200],
        defaultColumns  : [true,    false,      true,       false,  true,       false,                      false,              true],
        dataSource      : messages,
        descriptions    : [messageIDDescription, messageAuthorDescription, messageSubjectDescription, messageDateDescription, messageCategoryDescription, messageAssociationDescription, messageAssociationDescription, messageMessageDescription],
        footerFields    : footerFields,
        tableElements   : tableElements
    }
}

    /** Return an object encompassing a the data the user entered into the cells of the table footer row for use of creating a new Department object and inserting a row into a table
 * @param {HTMLElement[]} footerFields 
 */
function getMessageFooterValues(footerFields)
{
    let selectedDepartments = getSelectedObjects(footerFields[5].options, departments, "name"); //  Get an array of all the selected User objects
    let selectedPhase       = getSelectedObjects(footerFields[6].options, projects, "title");

    return {
        id          : footerFields[0].value,
        author      : users[0],
        subject     : footerFields[2].value,
        date        : footerFields[3].value,
        category    : footerFields[4].value,
        departments : selectedDepartments,
        phase       : selectedPhase,
        message     : footerFields[7].value
    }
}