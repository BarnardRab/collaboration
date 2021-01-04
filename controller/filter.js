let filterMode  = "None";   //  Options are None, Column and Record
//  Specific to filter, used by filter.js in the controller folder
const listMessageFilterColumns          = "Display or hide columns of the table.";
const listMessageFilterRecord           = "Filter table rows based on criteria such as user or due date"
const listMessageFilterCriteriaColumn   = "\n\nThe checkboxes determine which columns appear in the table. The results of a User Filter are not affected by undisplayed columns.";
const listMessageFilterCriteriaRecords  = "\n\nThe checkboxes determine what results to search for when filtering the entries in the table.";

function updateFilterMode(updatedMode, divisionID, searchID, helpboxID)
{
    let filterCriteria  = document.getElementById(divisionID);  //  Get the division element that displays the filter list
    let search          = document.getElementById(searchID);    //  Get the search box that appears when (Record) is selected under Filter Mode

    if (filterCriteria  == null)    throw `The argument passed to the divisionID parameter, ${divisionID}, of the updateFilterMode(updatedMode, divisionID, searchID, helpboxID) function does not refer to an element`;
    if (search          == null)    throw `The argument passed to the searchID parameter, ${searchID}, of the updateFilterMode(updatedMode, divisionID, searchID, helpboxID) function does not refer to an element`;

    function hideAll()
    {
        filterCriteria  .setAttribute("style", "display:none;");      //  If the mode was already active and the user clicked it, close the filter list
        search          .setAttribute("style", "display:none;");
        return "None";
    }

    console.log("switch began")
    switch(updatedMode)
    {
        case "Column"   : if (filterMode == "Column")   {   hideAll();  return "None"; }   else    {   search.setAttribute("style", "display:none;");   filterCriteria.setAttribute("onmouseover", `displayHelp('${helpboxID}', '${listMessageFilterColumns}${listMessageFilterCriteriaColumn}');`); break; }
        case "Record"   : if (filterMode == "Record")   {   hideAll();  return "None"; }   else    {   search.setAttribute("style", "display:block;");  filterCriteria.setAttribute("onmouseover", `displayHelp('${helpboxID}', '${listMessageFilterRecord}${listMessageFilterCriteriaRecords}');`); break; }
        default         : throw `Unexpected case, ${updatedMode}, in the switch(updatedMode) statement of the updateFilterMode(updatedMode, divisionID, searchID) function`;
    }

    console.log("switch finished")
    filterCriteria.setAttribute("style", "display:block;");
//    return updatedMode;
}

