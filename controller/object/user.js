/**Initialize the contents of a table element and its related components based on the properties of the source object class. 
 * 
 * This function calls the getTableElements(idPrefix) function and then generates the fields that appear in the table footer for use with adding a new record.
 * 
 * The returned object includes these objects as well as arrays for field names and column widths, which are used by the Table class to configure the table.
 * @param {string} idPrefix  The ID of the table to be initialized
 */
function initializeUserTable(idPrefix)
{
    let tableElements = getTableElements(idPrefix);

    //          let attributes      = ["Username", "Password", "First Name", "Last Name", "Email", "Phone"];

    let footerFields =
    [
        document.createElement("input"),    //  Username field
        document.createElement("input"),    //  Password field
        document.createElement("input"),    //  First Name field
        document.createElement("input"),    //  Last Name field
        document.createElement("input"),    //  Email field
        document.createElement("input"),    //  Phone field
    ];

    footerFields[0].setAttribute("required", true);
    footerFields[1].setAttribute("type", "password");
    footerFields[4].setAttribute("type", "email");
    footerFields[5].setAttribute("type", "tel");

    return {
        columnNames     : ["Username",  "Password", "First Name",   "Last Name",    "Email",    "Phone"],
        columnWidths    : [100,         100,        100,            100,            100,        100],
        defaultColumns  : [true,        true,       true,           true,           true,       true],
        dataSource      : users,
        descriptions    : [userUsernameDescription, userPasswordDescription, userFirstNameDescription, userLastNameDescription, userEmailDescription, userPhoneDescription],
        footerFields    : footerFields,
        tableElements   : tableElements
    }
}

/** Return an object encompassing a the data the user entered into the cells of the table footer row for use of creating a new User object and inserting a row into a table
 * @param {HTMLElement[]} footerFields 
 */
function getUserFooterValues(footerFields)
{
    return {
        username    : footerFields[0].value,
        password    : footerFields[1].value,
        firstName   : footerFields[2].value,
        lastName    : footerFields[3].value,
        email       : footerFields[4].value,
        phone       : footerFields[5].value,
    }
}

