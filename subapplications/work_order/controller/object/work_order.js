/**Initialize the contents of a table element and its related components based on the properties of the source object class. 
 * 
 * This function calls the getTableElements(idPrefix) function and then generates the fields that appear in the table footer for use with adding a new record.
 * 
 * The returned object includes these objects as well as arrays for field names and column widths, which are used by the Table class to configure the table.
 * @param {string} idPrefix  The ID of the table to be initialized
 */
function initializeWorkOrderTable(idPrefix)
{
    let tableElements = getTableElements(idPrefix);

    let footerFields =
    [
        document.createElement("input"),    //  work order Number field
        document.createElement("input"),    //  Date field
        document.createElement("input"),    //  Client field
        document.createElement("select"),   //  Priority field
        document.createElement("input"),     //  Due Date field
        document.createElement("select"),   //  assignedTo field
        document.createElement("textarea"), //  Description field
    ];

    footerFields[0].setAttribute("disabled", true);             //  The work order Number field is disabled because it is automatically populated
    footerFields[1].setAttribute("disabled", true);             //  The Date field is disabled because it is automatically populated
    footerFields[0].setAttribute("value", workOrders.length);   //  The work order number field is automatically populated
    footerFields[1].setAttribute("value", new Date());          //  The Date field is automatically populated
    footerFields[4].setAttribute("type", "date");
//    footerFields[4].setAttribute("onchange", updateDueDate());    //  This code breaks the WorkOrder listing page, so it is turned off for now
    footerFields[5].setAttribute("required", true);     //  assignedTo field
    footerFields[6].setAttribute("required", true);     //  Description field
    footerFields[6].setAttribute("rows", 10);           //  Be generous with the hieght of the text area

    let workOrderStatus = [
        "5 - To be completed anytime after the week",
        "4 - To be completed by the end of the week",
        "3 - To be completed by the end of the day",
        "2 - To be completed after current task",
        "1 - To be completed before any other tasks",    
    ]

    let value = 5;
    for (let index = 0; index < workOrderStatus.length; index++)
    {
        let option = document.createElement("option");
        option.appendChild(document.createTextNode(workOrderStatus[index]))
        option.setAttribute("value", value);
        value--;
        footerFields[3].appendChild(option);
    }

    populateSelectFromObjectArray(footerFields[5], users, "username", ["firstName", "lastName"]);                                                       //  Populate the lead select element with User objects

    return {
        columnNames     : ["Order", "Date", "Requested By", "Priority", "Due Date", "Assign To",    "Description"],
        columnWidths    : [100,     100,    100,            100,        100,        100,            100],
        defaultColumns  : [true,    false,  true,           true,       true,       true,           true],
        dataSource      : workOrders,
        descriptions    : [workOrderIDDescription, workOrderDateDescription, workOrderClientDescription, workOrderPriorityDescription, workOrderDueDateDescription, workOrderAssignedToDescription, workOrderDescriptionDescription],
        footerFields    : footerFields,
        tableElements   : tableElements
    }
}

/** Return an object encompassing a the data the work order entered into the cells of the table footer row for use of creating a new WorkOrder object and inserting a row into a table
 * @param {HTMLElement[]} footerFields 
 */
function getWorkOrderFooterValues(footerFields)
{
    return {
        orderNumber : workOrders.length,
        date        : new Date(),
        client      : footerFields[2].value,
        priority    : footerFields[3].value,
        dueDate     : footerFields[4].value,
        assignedTo  : getSelectedObject(footerFields[5].value, users, "username"),
        description : footerFields[6].value
    }
}
