class ListingTable
{
    /**
     * Create an object with references to the fields of the document and functions related to them
     * @param {string}              moduleName      The name of the Table, such as Blueprint, Pictures, Department, Message, Project, and User
     * @param {ObjectConstructor}   tableContent    An object with references to the elements related to the table
     * @param {string}              recordPath      The URL for which the browser will be redirected when the user clicks a record
     */
    constructor(moduleName, tableContent, recordPath)
    {
        this.moduleName         = moduleName;

        //  Get references to HTML elements
        this.filterSection      = document.getElementById(`${this.moduleName}TableFilter`);
        this.tableContent       = tableContent;         //  Object with references to tableElements (caption, headerRow, bodySection, footerRow, search, count, and newButton), columnNames, footerFields, footerValues and columnWidths

        //  Error checking
        this.errorFunctionPefix     = `An exception was thrown in the Table class for the ${this.moduleName} module in the`;
        const errorConstructor      = "constructor(moduleName, tableContent) because";

        if (moduleName          == null)    throw `${this.errorFunctionPefix} ${errorConstructor} the argument passed to moduleName is null`;

        //  This message is triggered by conditional statements that throw exceptions. This message should be proceded by the source (constructor, function name, etc)

        if (tableContent        == null)    throw `${this.errorFunctionPefix} ${errorConstructor} the argument passed to tableContent is null`;
        if (recordPath          == null)    throw `${this.errorFunctionPefix} ${errorConstructor} the argument passed to recordPath is null`;
        if (this.filterSection  == null)    throw `${this.errorFunctionPefix} ${errorConstructor} the element ID, ${this.moduleName}TableFilter, derived from moduleName, ${this.moduleName}, for the Filter section does not point to an element`;

        if (tableContent.hasOwnProperty("tableElements")    == false)   throw `${this.errorFunctionPefix} ${errorConstructor} the argument passed to tableContent does not have the key, tableElements`;
        if (tableContent.hasOwnProperty("columnNames")      == false)   throw `${this.errorFunctionPefix} ${errorConstructor} the argument passed to tableContent does not have the key, columnNames`;
        if (tableContent.hasOwnProperty("footerFields")     == false)   throw `${this.errorFunctionPefix} ${errorConstructor} the argument passed to tableContent does not have the key, footerFields`;
        if (tableContent.hasOwnProperty("dataSource")       == false)   throw `${this.errorFunctionPefix} ${errorConstructor} the argument passed to tableContent does not have the key, dataSource (an array of constructed objects)`;

        //  Central intialization
        generateHelpBox();
        this.generateTableCells();
        this.generateTableFilter();

        this.tableContent.tableElements.caption.appendChild(document.createTextNode(moduleName));                               //  Set the caption of the table based on the module name
        this.tableContent.tableElements.newButton.addEventListener("click", this.createNewRecord.bind(null, this, recordPath)); //  Make the button function to create a new record based on the data entered into the table footer

        this.populateTable(tableContent.dataSource, moduleName, recordPath);                                                        //  Populate the ListingTable table with the contents of tableContent.dataSource

        // switch(moduleName)      //  Populate the Table table with the contents of the specified array
        // {
        //     case "Blueprint"    : this.populateTable(blueprints, moduleName);   break;
        //     case "Department"   : this.populateTable(departments, moduleName);  break;
        //     case "Message"      : this.populateTable(messages, moduleName);     break;
        //     case "Project"      : this.populateTable(projects, moduleName);     break;
        //     case "User"         : this.populateTable(users, moduleName);        break;
        //     default             : throw `${errorConstructor} the switch statement calling the populateTable() method had an unexpected case, ${moduleName}`;
        // }
    }

    generateTableFilter()
    {
        let sectionID = `${this.moduleName}TableFilter`
        let section = document.getElementById(sectionID);
        const errorPrefix = "generateTableFilter() function because the"

        if (this.moduleName == null)    throw `${this.errorFunctionPefix} ${errorPrefix} value of this.moduleName is null`;
        if (section         == null)    throw `${this.errorFunctionPefix} ${errorPrefix} id, ${sectionID}, does not point to an element`;

        const filterColumns     = `Display or hide columns of the table.`
        const filterRecords     = `Filter table rows based on specified criteria.\\n\\nWhen using the search box, only results for the checked attributes will be shown.\\n\\nUse this feature to broaden or narrow your searches.`

        //  Create the main elements of the Filter section
        let header          = document.createElement("h2");         header          .appendChild(document.createTextNode("Filter"));                        header.setAttribute("style", "text-align: center;");
        let columnSummary   = document.createElement("summary");    columnSummary   .appendChild(document.createTextNode("Table Columns"));                 columnSummary.setAttribute("class", "navigationLinks"); columnSummary.setAttribute("onmouseover", `document.getElementById('helpbox').value = '${filterColumns}'`);
        let recordSummary   = document.createElement("summary");    recordSummary   .appendChild(document.createTextNode(`${this.moduleName} Records`));    recordSummary.setAttribute("class", "navigationLinks"); recordSummary.setAttribute("onmouseover", `document.getElementById('helpbox').value = '${filterRecords}'`);
        let columnDetails   = document.createElement("details");    columnDetails   .appendChild(columnSummary);
        let recordDetails   = document.createElement("details");    recordDetails   .appendChild(recordSummary);
        let columnList      = document.createElement("ul");         columnList      .setAttribute("class", "navigationLinksList");  columnList      .setAttribute("id", "TableFilterColumnList");
        let recordList      = document.createElement("ul");         recordList      .setAttribute("class", "navigationLinksList");  recordList      .setAttribute("id", "TableFilterRecordList");

        //  Create the checkboxes for the Table Columns and Records <details> elements and generate the click event to make them functional
        for (let attributeIndex = 0; attributeIndex < this.tableContent.columnNames.length; attributeIndex++)
        {
            let columnName       = this.tableContent.columnNames[attributeIndex];
            let columnCheckboxID= `${this.moduleName}Table${columnName}ColumnCheckbox`;
            let recordCheckboxID= `${this.moduleName}Table${columnName}RecordCheckbox`;

            let columnCheckbox  = document.createElement("input");  columnCheckbox.setAttribute("type", "checkbox"); columnCheckbox.setAttribute("value", columnName);   columnCheckbox.checked = true;  columnCheckbox.setAttribute("id", columnCheckboxID);
            let recordCheckbox  = document.createElement("input");  recordCheckbox.setAttribute("type", "checkbox"); recordCheckbox.setAttribute("value", columnName);   recordCheckbox.checked = true;  recordCheckbox.setAttribute("id", recordCheckboxID);

            let columnLabel     = document.createElement("label");  columnLabel.appendChild(columnCheckbox);    columnLabel.appendChild(document.createTextNode(columnName));
            let recordLabel     = document.createElement("label");  recordLabel.appendChild(recordCheckbox);    recordLabel.appendChild(document.createTextNode(columnName));

            let columnListItem  = document.createElement("li");     columnListItem.appendChild(columnLabel);    columnList.appendChild(columnListItem); 
            let recordListItem  = document.createElement("li");     recordListItem.appendChild(recordLabel);    recordList.appendChild(recordListItem);

            //  The bind function is a fix for JavaScript's broken event handling within a class
            columnCheckbox.addEventListener("click", this.filterTableColumns.bind(null, this));     //  Make the button function to create a new record based on the data entered into the table footer
        }

        columnDetails.appendChild(columnList);
        recordDetails.appendChild(recordList);

        section.appendChild(header);
        section.appendChild(columnDetails);
        section.appendChild(recordDetails);
    }


    /** Display or hide columns based on what is checked */
    /**
     * @param {Table} table     The table object from this class
     */
    filterTableColumns(table)
    {
        console.log("The filterTableColumns() method has been executed");

//        let columnNames         = table.tableContent.columnNames;                     //  Get the column names for use with the loop that checks the checkboxes of filterCheckboxList
        let filterCheckboxList  = document.getElementById("TableFilterColumnList");   //  The unordered list element containing the list item elements containing the label elements containing the checkboxes corresponding to the columns

        for (let index = 0; index < filterCheckboxList.children.length; index++)        //  Determine which columns to display based on what is checked in the filter section
        {
            let checkbox        = filterCheckboxList.children[index].children[0].children[0]   //  Get the list item, then the label element, then the checkbox element
            let value           = checkbox.getAttribute("value");
            let column          = document.getElementsByName(`${table.moduleName}${value}Column`);

            if (column == null)
                throw `The filterTableColumns(table) function failed because the id, ${table.moduleName}${value}Column, points to nothing`;

            for (let columnIndex = 0; columnIndex < column.length; columnIndex++)
            {
                if (checkbox.checked == true)   column[columnIndex].removeAttribute("style");
                else                            column[columnIndex].setAttribute("style", "display:none;");
            }
        }

                //  The event that makes the columns appear and disappear based on what is checked
                // columnCheckbox.onclick = function()
                // {
                //     let columnElements  = document.getElementsByName(columnName);
    
                //     for (let index = 0; index < columnElements.length; index++)
                //     {
                //         if (columnElements[index] instanceof HTMLElement == false)
                //             throw `${errorPrefix} value of ${columnElements[index]} at index ${index} is not an html element`;
                    
                //         if (columnCheckbox.checked == true)
                //         {
                //             columnElements[index].removeAttribute('style');
                //         }
                //         else
                //         {
                //             columnElements[index].setAttribute('style', 'display:none;');
                //         }
                //     }
                // }
}

    /** Generate the header and footer cells.*/
    generateTableCells()
    {
        let columnNames         = this.tableContent.columnNames;
        let footerFields        = this.tableContent.footerFields;
        let descriptions        = this.tableContent.descriptions;
        let columnWidths        = this.tableContent.columnWidths;
        let headerRow           = this.tableContent.tableElements.headerRow;
        let footerRow           = this.tableContent.tableElements.footerRow;

        for (let index = 0; index < columnNames.length; index++)
        {
            let headerCell      = document.createElement("th");
            let footerCell      = document.createElement("td");
            let headerSpan      = document.createElement("span");

            let columnName       = columnNames[index];
            let footerElement   = footerFields[index];

            headerCell.appendChild(document.createTextNode(columnName));

            headerCell.setAttribute("name", `${this.moduleName}${columnName}Column`);            
            headerCell.setAttribute("style", `width:${columnWidths[index]}px;`);
            headerCell.setAttribute("onmouseover", `document.getElementById('helpbox').value = '${descriptions[index]}'`);  //  Set the description to be displayed in helpbox when the mouse hovers over each column
            
            footerCell.setAttribute("style", `width:${columnWidths[index]}px;`);
            footerCell.setAttribute("name", `${this.moduleName}${columnName}Column`);
            footerCell.setAttribute("onmouseover", `document.getElementById('helpbox').value = '${descriptions[index]}'`);  //  Set the description to be displayed in helpbox when the mouse hovers over each column

            footerElement.setAttribute("style", `width:${columnWidths[index]}px;`);
            footerElement.setAttribute("id",   `${this.moduleName}${columnName}Footer`);                                    //  ID to address this element for special circumstrances, like incrementing the ID number for the Message listing
            footerCell.appendChild(footerElement);

            if (footerElement instanceof HTMLInputElement || footerElement instanceof HTMLTextAreaElement)
                footerElement.onkeydown = function(event)
                {
                    if (event.key == "Enter")
                    {
                        console.log("The this.createNewRecord.bind(event, this); statement for the key press event does not seem to work");
                    }
                }
            
            headerRow.appendChild(headerCell);
            footerRow.appendChild(footerCell);
        }
    }

    /** Populate the table by looping through the argument passed to array (from an array in app.js). Each object in the array should have a function called generateRowElement()
     * @param {[]} array 
     */
    populateTable(array, moduleName, recordPath)
    {
        if (Array.isArray(array) == false)
            throw `The populateTable function of the Table class failed because The object passed to array, ${array}, is not an array`;

        for (let index = 0; index < array.length; index++)
        {
            let row = array[index].generateRowElement()
            row.onclick = function()                 //  Make the row clickable, leading to the editor page
            {
                window.location.href = recordPath;
            };

            this.tableContent.tableElements.bodySection.appendChild(row);    
        }

        //  Update the span element that displays the number of records
        let spanElement = this.tableContent.tableElements.count;
        let rowCount    = this.tableContent.tableElements.bodySection.children.length;
        spanElement.textContent = `There are currently ${rowCount} ${moduleName}s`
    }

    /**Create a new record to add to the database and add it the the table as a row
     * @param {Table}   table 
     * @param {string}  recordPath
     */
    createNewRecord(table, recordPath)
    {
        let footerFields        = table.tableContent.footerFields;                    //  The HTML input, select and text area elements found in the footer element of the table
        for (let index = 0; index < footerFields.length; index++)                       //  Validation check to make sure no record is submitted if a field with the required attribute is left blank.
            if (footerFields[index].hasAttribute("required"))
                if (footerFields[index].value == "")
                {
                    document.getElementById("helpbox").value = "The record failed to be submitted because a required field was not filled out";
                    return;
                }

        let moduleName          = table.moduleName;                                   //  The name of the module, coinciding to the model class used in the switch statement below
        let tableBody           = table.tableContent.tableElements.bodySection;       //  The table body element that is appended to the table element
        let tableCount          = table.tableContent.tableElements.count;             //  The span element that displays the number of records
        let footerValues        = null;                                                 //  The values from the footerFields, determined by which model class is applicable
        let constructedObject   = null;                                                 //  The object constructed by the model class in the switch statement below
        let array               = null;                                                 //  The array of the main database from the app.js module
        let primaryKey          = null;                                                 //  The value that is checked to detect duplicates

        switch(moduleName)  //  Generate an object encompassing the model class object and specify the values of primaryKey and array to support the duplicateCheck() method below. 
        {
            case "Blueprint"    : array = blueprints;   primaryKey = "name";        footerValues = getBlueprintFooterValues (footerFields); constructedObject = new Blueprint   (footerValues.name,         footerValues.description,   footerValues.width,         footerValues.height,    footerValues.panX,      footerValues.panY,          footerValues.zoomX,             footerValues.zoomY);    break;
            case "Department"   : array = departments;  primaryKey = "name";        footerValues = getDepartmentFooterValues(footerFields); constructedObject = new Department  (footerValues.name,         footerValues.description,   footerValues.members);      break;
            case "Message"      : array = messages;     primaryKey = "id";          footerValues = getMessageFooterValues   (footerFields); constructedObject = new Message     (footerValues.id,           footerValues.author,        footerValues.subject,       footerValues.date,      footerValues.category,  footerValues.departments,   footerValues.stage,             footerValues.message);  let id = document.getElementById("MessageIDFooter"); id.value = messages.length + 1;    break;
            case "Project"      : array = projects;     primaryKey = "title";       footerValues = getProjectFooterValues   (footerFields); constructedObject = new Project     (footerValues.title,        footerValues.description,   footerValues.isCategory,    footerValues.category,  footerValues.lead,      footerValues.priority,      footerValues.status,            footerValues.budget,    footerValues.budgetWarning, footerValues.dueDate,   footerValues.dueDateWarning,    footerValues.created,   footerValues.modified); break;
            case "User"         : array = users;        primaryKey = "username";    footerValues = getUserFooterValues      (footerFields); constructedObject = new User        (footerValues.username,     footerValues.password,      footerValues.firstName,     footerValues.lastName,  footerValues.email,     footerValues.phone);        break;
            case "WorkOrder"    : array = workOrders;   primaryKey = "ordernumber"; footerValues = getWorkOrderFooterValues (footerFields); constructedObject = new WorkOrder   (footerValues.orderNumber,  footerValues.date,          footerValues.client,        footerValues.priority,  footerValues.dueDate,   footerValues.assignedTo,    footerValues.description);      break;
            default             : throw `Unexpected case, ${moduleName}, passed to the switch statement of the createNewRecord() method`;
        }

        if (constructedObject == null)
            throw "The createNewRecord function failed because the constructedObject is null";

        if (duplicateCheck(array,    constructedObject, primaryKey) == false)      //  If a duplicate is found in the database, abort execution of the function
            return;

        let row = constructedObject.generateRowElement();

        row.onclick = function()                 //  Make the row clickable, leading to the editor page
        {
            window.location.href = recordPath;
        };

        tableBody.appendChild(row);

        //  Update the span element to display the number of rows in the table
        if (tableBody.children.length == 1)     tableCount.textContent = `There is currently 1 ${moduleName}`;
        else                                    tableCount.textContent = `There are currently ${tableBody.children.length} ${moduleName}s`;

        //  The bind function is a fix for JavaScript's broken event handling within classes
        // this.filterTableColumns.bind(null, table);               //  Display only columns that are checked in the filter section
        table.filterTableColumns(table);                             //  Display only columns that are checked in the filter section
    }
}

/** Called by the createNewRecord() function in the Table class, this function signals to the calling function that it should abort execution if a record containing primaryKey was found
 * @param {[]}                  array           Array of blueprints, departments, messages, projects, or users
 * @param {ObjectConstructor}   classObject     The class object of Blueprint, Department, Message, Project, or User
 */
function duplicateCheck(array, classObject, primaryKey)
{
    for (let index = 0; index < array.length; index++)
        if (array[index][primaryKey] == classObject[primaryKey])                 //  Check to see if the record already exists and abort execution of the function if so
        {
            document.getElementById("helpbox").value = "The record cannot be added to the list because it already exists.";
            return false;
        }
    array.push(classObject);                                   //  Add the record to the main database if the previous condition evaluated to false
    return true;
}

/**Return an object with references to the table related elements such as:
 * 
 * caption
 * headerRow
 * body
 * footerRow
 * search
 * count
 * newButton
 *  
 * @param {string} idPrefix The universal prefix that precedes the standard ID scheme for the data table, search field, count text and new record button
 */
function getTableElements(idPrefix)
{
    const errorPrefix   = "`The initializeTableElements(idPrefix) failed because";
    let table           = document.getElementById(`${idPrefix}Table`);
    let search          = document.getElementById(`${idPrefix}TableSearch`);
    let count           = document.getElementById(`${idPrefix}Count`);
    let newButton       = document.getElementById(`${idPrefix}NewRecord`);

    if (table       == null)    throw `${errorPrefix} the ID, ${idPrefix}Table (table element), points to nothing. Make sure that the table element has the id, ${idPrefix}Table`;
    if (search      == null)    throw `${errorPrefix} the ID, ${idPrefix}TableSearch (input type search), points to nothing. Make sure that the input element has the id, ${idPrefix}TableSearch`;
    if (count       == null)    throw `${errorPrefix} the ID, ${idPrefix}Count (span element), points to nothing. Make sure that the span element has the id, ${idPrefix}Count.`;
    if (newButton   == null)    throw `${errorPrefix} the ID, ${idPrefix}NewRecord (button element), points to nothing. Make sure that the table has the id, ${idPrefix}New Record.`;

    let caption         = document.createElement("caption");
    let headerSection   = document.createElement("thead");
    let bodySection     = document.createElement("tbody");
    let footerSection   = document.createElement("tfoot");
    let headerRow       = document.createElement("tr");
    let footerRow       = document.createElement("tr");

    table.appendChild(caption);
    table.appendChild(headerSection);
    table.appendChild(bodySection);
    table.appendChild(footerSection);

    headerSection.appendChild(headerRow);
    footerSection.appendChild(footerRow);

    search.setAttribute("onmouseover", `document.getElementById('helpbox').value = 'Search for records of this module.\\n\\nResults can be customized via the expandable option under the Filter section.';`);

    return {
        caption     : caption,
        headerRow   : headerRow,
        bodySection : bodySection,
        footerRow   : footerRow,
        search      : search,
        count       : count,
        newButton   : newButton
    }
}

