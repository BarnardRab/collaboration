/**Initialize the contents of a table element and its related components based on the properties of the source object class. 
 * 
 * This function calls the getTableElements(idPrefix) function and then generates the fields that appear in the table footer for use with adding a new record.
 * 
 * The returned object includes these objects as well as arrays for field names and column widths, which are used by the Table class to configure the table.
 * @param {string} idPrefix  The ID of the table to be initialized
 */
function initializeDepartmentTable(idPrefix)
{
    let tableElements = getTableElements(idPrefix);

    let footerFields =
    [
        document.createElement("input"),    //  Name field
        document.createElement("textarea"), //  Description Field
        document.createElement("select"),   //  Members list
    ];

    footerFields[0].setAttribute("required", true);
    footerFields[1].setAttribute("rows", 10);
    footerFields[2].setAttribute("multiple", true);     footerFields[2].setAttribute("size", 10);

    let noneOption  = document.createElement("option");
    noneOption.setAttribute("value", "None");
    noneOption.appendChild(document.createTextNode("No Members Selected"));
    footerFields[2].appendChild(noneOption);

    populateSelectFromObjectArray(footerFields[2], users, "username", ["firstName", "lastName"]);   //  Populate the members select element

    return {
        columnNames     : ["Name",  "Description",  "Members"],
        columnWidths    : [200,     200,            200],
        defaultColumns  : [true,    true,           true],
        dataSource      : departments,
        descriptions    : [departmentNameDescription, departmentDescriptionDescription, departmentMembersDescription],
        footerFields    : footerFields,
        tableElements   : tableElements
    }
}

/** Return an object encompassing a the data the user entered into the cells of the table footer row for use of creating a new Department object and inserting a row into a table
 * @param {HTMLElement[]} footerFields 
 */
function getDepartmentFooterValues(footerFields)
{
    let selectedUsers = getSelectedObjects(footerFields[2].options, users, "username"); //  Get an array of all the selected User objects
    return {
        name        : footerFields[0].value,
        description : footerFields[1].value,
        members     : selectedUsers
    }
}
