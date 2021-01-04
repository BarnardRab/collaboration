    /**
     * @param {ObjectConstructor}   listingContents The contents of the listing page that are independent of the ListingTable object such as directory and other menus
     * @param {ListingTable}        listingTable    An object constructed with the ListingTable class, maintaining references to the elements related to the table and functions to manipulate them
     */
    function generateListingPage(listingContents, listingTable)
    {
        let menu                = document.getElementById(`${listingContents.idPrefix.replace(/ /g,"")}ListingMenu`);
        let newSection          = document.getElementById(`${listingContents.idPrefix.replace(/ /g,"")}ListingNew`);

        const errorPrefix       = "An exception was thrown in the generateListingPage(listingContents, listingTable) function in the listing.js module because the argument passed to";

        //  Error checking to quickly find programming errors
        let functionIdentifier = {functionName: "generateListingPage(listingContents, listingTable)", sourceFileName: "listing.js", checkedObjectName: "listingContents"};

        validateObjectProperties                        //  This function is defined in the controller/validation_check.js file
        (
            listingContents,
            ["idPrefix", "focusedID", "navigation", "editor"],
            ["string", "string", "object", "string", "string"],
            functionIdentifier
        );
        
        //  Listing table has its own validation check
        if (listingTable instanceof ListingTable == false)  throw `${errorPrefix} listingTable is null`;    //  The ListingTable class has its own validation check, so this is all that's neccessary
        if (menu                == null)    throw `${errorPrefix} listingContents.idPrefix, of ${listingContents.idPrefix.replace(/ /g,"")}, cannot be used to derive the ID for the element for the Menu section. The ID that was drived is ${listingContents.idPrefix.replace(/ /g,"")}ListingMenu. Check this value against the ID attribute in the HTML file.`;
        if (newSection          == null)    throw `${errorPrefix} listingContents.idPrefix, of ${listingContents.idPrefix.replace(/ /g,"")}, cannot be used to derive the ID for the element for the New section. The ID that was derived is ${listingContents.idPrefix.replace(/ /g,"")}ListingNew. Check this value against the ID attribute in the HTML file.`;

        //  Central intialization
        generateHelpBox();

        let navigation = generateNavigation(listingContents.navigation)         //  This function is defined in the controller/generator/navigation.js file

        if (navigation == null)
        {
            console.log("The listingContents.navigation argument passed to the generateListingPage(listingContents, listingTable) function is");
            console.log(listingContents.navigation);
            console.log("The result of the listingContents.navigation argument being passed to the generateNavigation(configuration) function is");
            console.log(navigation);
        }

        menu.appendChild(navigation);
        generateNew();

        /** Generate the elements that appear in the New section on the left */
        function generateNew()
        {
            const validateFocusedElement    = `let focusedElement  = document.getElementById('${listingContents.focusedID}'); if (focusedElement == null) throw 'The id for the focused element points to nothing';`

            const createQuick   = `Create new ${listingContents.idPrefix} without enduring the verbose editor. Fill out the required fields in the footer (last row of the table) and press the Submit Quickset New ${listingContents.idPrefix} button.`;
            const createVerbose = `Create a new ${listingContents.idPrefix} record in its editor page, specifying verbose details not seen in the cells of the table due to nested attributes.`;

            let header          = document.createElement("h1"); 
            let unorderedList   = document.createElement("ul"); 

            let newQuickset     = document.createElement("li"); 
            let newRecord       = document.createElement("li"); 

            let anchor          = document.createElement("a");

            header              .appendChild(document.createTextNode("New"));
            header              .setAttribute("style", "text-align: center;");

            newQuickset         .setAttribute("class", "navigationLinks");
            newQuickset         .setAttribute("onclick", `${validateFocusedElement} focusedElement.focus();`);
            newQuickset         .setAttribute("onmouseover", `document.getElementById('helpbox').value = '${createQuick}'`);

            newQuickset         .appendChild(document.createTextNode(`${listingContents.idPrefix} Quickset`));

            anchor              .setAttribute("href", listingContents.editor);  //  This will need to be updated to be flexible with other directories
            anchor              .appendChild(document.createTextNode(listingContents.idPrefix));

            newRecord           .setAttribute("class", "navigationLinks");
            newRecord           .setAttribute("onmouseover", `document.getElementById('helpbox').value = '${createVerbose}'`);
            newRecord           .appendChild(anchor);

            unorderedList       .setAttribute("class", "navigationLinksList");
            unorderedList       .appendChild(newQuickset);
            unorderedList       .appendChild(newRecord);

            newSection          .appendChild(header);
            newSection          .appendChild(unorderedList);
        }
    }





//  Specific to Users List
const userListMessageCreate             = "Create a record representating a team member, supervisor or stakeholder.";
const userListMessageTable              = "The Users table provides a reference to employees and stakeholders involved in the projects.\n\nThe column for Departments is configured in the Departments list.\n\nThe columns for Projects Lead and Participated are configured in the Projects List.";
