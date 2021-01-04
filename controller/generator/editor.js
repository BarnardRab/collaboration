    /**General functions for the Editors for User, Project and so on.
     * 
     * This function should be included in the body onload event of the editor. It initializes the basic components such as Section Directory, Action, Management Directory and the events associated
    * @param {string}               moduleName The name of the module for use with consfiguring the IDs. / The part of the ID that is common among various html elements on the Editor pages
    * @param {ObjectConstructor}    sectionData An object that must have the following keys, all being arrays of equal length:
    *- sectionNames A parallel array of the names of the sections, to be populated as a list under the Section Directory header
    *- focusedIDs   A parallel array of the names of the element for which the curser should go when the user clicks the section name, 
    *- descriptions     The help context for the sections
    */
    function initializeEditor (sectionData)
    {
        let menu            = document.getElementById("EditorMenu");
        let currentIndex    = 0;                                                //  The position of the step index in the editor, used with the form variable for the Previous Section and Next Section buttons

        let functionIdentifier = {functionName: "initializeEditor (sectionData)", sourceFileName: "editor.js", checkedObjectName: "sectionData"};

        //  Error checking
        validateObjectProperties
        (
            sectionData,
            ["moduleName",    "navigation",   "sectionNames", "focusedIDs",   "descriptions"],
            ["string",        "object",       "array",        "array",        "array"],
            functionIdentifier
        );

        validateArrayEquality([sectionData.sectionNames, sectionData.focusedIDs, sectionData.descriptions], functionIdentifier);

        //  Separate validation check for navigation property because sectionData.navigation has to be checked in the validationCheck function first
        let navigation = generateNavigation(sectionData.navigation);
        if (navigation == null)
        {
            console.log("The value of sectionData.navigation is");
            console.log(sectionData.navigation);
            throw `The generateNavigation(navigation) function failed in the initializeEditor(sectionData) function of the editor.js file because the returned value was null. The generateNavigation() function calls the generateList(listConfiguration) function.`;
        }

        initializeSectionDirectory();
        initializeActions();
        initializeNavigationButtons();

        menu.appendChild(navigation);
        //  ["../index.html", "../../view/lists/blueprints.html", "../../view/lists/departments.html", "../../view/lists/messages.html", "../../view/lists/projects.html", "../../view/lists/users.html"]
        generateHelpBox();
    
    /** All code associated with the generation of the Section Directory division is wrapped up in this function.
         *  When a section is clicked, we want the following things to happen:
            - Hide all sections
            - If the clicked section is the first in the list, then display the Next Section button and hide the Previous Section button
            - If the clicked section is the last in the list, then display the Previous Section button and hide the Next Section button
            - Else display both the Previous and Next Section buttons
            - When a section is clicked, move the cursor to the field whose ID was specified in the sectionData.focusedIDs array
            - If Show All is clicked, display all sections and hide the Previous and Next Section buttons*/
        function initializeSectionDirectory()
        {
            let clickEvents = [];
            for (let index = 0; index < sectionData.focusedIDs.length; index++)
                clickEvents.push(`displaySection(${index}); document.getElementById('${sectionData.focusedIDs[index]}').focus();`);

            //  Add a the Show All item to sectionData()
            sectionData.sectionNames.push("Show All");
            sectionData.descriptions.push("Display all the sections in this list.\\n\\nOn a large screen, this could be useful. But on a smaller screen, it could appear cluttered and convoluted.");
            clickEvents.push(`displayAll();`);

            let sectionDirectoryList    = generateList(
            {
                moduleName      : sectionData.moduleName,
                caption         : "Section Directory",
                container       : "div",
                listClass       : "navigationLinksList",
                listItemClass   : "navigationLinks",
                items           : sectionData.sectionNames,
                descriptions        : sectionData.descriptions,
                onClicks        : clickEvents,
                id              : "SectionDirectoryList"
            });
            
            sectionDirectoryList.getElementsByTagName("li")[0].setAttribute("style", "background-color:burlywood;");             //  Highlight the first selection to signify the default displayed section
            menu.appendChild(sectionDirectoryList);
        }
        
        /** All code associated with the generation of the Actions divison is wrapped up in this function*/
        function initializeActions()
        {
            menu.appendChild(generateList(
            {
                moduleName      : sectionData.moduleName,
                caption         : "Actions",
                container       : "div",
                listClass       : "navigationLinksList",
                listItemClass   : "navigationLinks",
                items           : [`Create New ${sectionData.moduleName}`, `Edit ${sectionData.moduleName}`, "Restore Fields", "Reset Fields"],
                descriptions        : [`Create a new ${sectionData.moduleName} record. If this editor has been opened under an existing record, that record\\'s settings will be duplicated under the new record.\\n\\nThis is useful for quickly generating multiple records that are similar.`,
                `Saves the existing ${sectionData.moduleName}. Use this option to update the project\\'s configuration.`,
                `Restore the contents of the fields in this editor to that of the existing ${sectionData.moduleName} record.`,
                "Erase all the contents of the fields in this editor"],
                onClicks        : ["console.log('clicked New');", "console.log('clicked edit');", "console.log('clicked restore');", "document.getElementById('EditorForm').reset();"],
                id              : "ActionsList"
            }));
        }

        function initializeNavigationButtons()
        {
            let previousButton  = document.getElementById(`EditorPreviousButton`);
            let nextButton      = document.getElementById(`EditorNextButton`);

            previousButton      .setAttribute("onmouseover", `document.getElementById('helpbox').value = 'Return to the previous step in this editor'`)
            nextButton          .setAttribute("onmouseover", `document.getElementById('helpbox').value = 'Proceed to the next step in this editor'`)

            previousButton      .onclick = function()
            {
                currentIndex --;
                displaySection(currentIndex);
            }
            
            nextButton          .onclick = function()
            {
                currentIndex++;
                displaySection(currentIndex);
            }

        }
        
 
    }


    /** Initialize the references to the HTML elements
     * 
     * The function works by looping through the keys of an object called name, which is a key passed to the editor object. The value of each of name's keys must be an array of strings.
     * 
     * The key represents the section from the editor and the array represents the unique substrings of the html elements in that section.
     * 
     * For example, the key "general" might refer to the general section, "Username", one of the strings from that array, would represent an input element. 
     * The IDs of each of the elements must conform to a pattern such as UserEditorGeneralUsernameID and UserEditorGeneralFirstNameID
    */
    function initializeEditorReferences(editor)
    {
        const errorPrefix = "The initializeEditorReferences(editor) method of the editor.js module failed because";

        if (editor == null)                             throw `${errorPrefix} the value passed to editor is null`;
        if (editor.hasOwnProperty("element") == false)  throw `${errorPrefix} the value passed to editor does not have a key named element. Make sure that the calling class has this.element = {} in its constructor.`;
        if (editor.element == null)                     throw `${errorPrefix} the value passed to editor.element is null`;

        //  The object, editor.name, contains arrays of strings
        for (let [sectionKey, sectionValue] of Object.entries(editor.name))                                                                                     //  Loop through the keys of the names object, where each key represents a primary section
        {
            if (sectionKey == null)                                 throw `${errorPrefix} the value of sectionKey is null. Make sure that the calling class has this.element = {${sectionKey} : {}} in its constructor.`;
            if (editor.element.hasOwnProperty(sectionKey) == false) throw `${errorPrefix} editor.element does not have a key called ${sectionKey}. Make sure that the calling class has this.element = {${sectionKey} : {}} in its constructor.`;
            for (let index = 0; index < sectionValue.length; index++)                                                                                           //  Loop through the array elements of each of those keys, where each element represents the name of a field of user input
            {
                //  Populate the editor.element object defined in the constructor with references to the HTML elements
                let elementName     = sectionValue[index];
                let elementNameLower= elementName.charAt(0).toLowerCase() + elementName.slice(1);                                                               //   Shortcut variable to reduce probability of error, for use with variable names
                let keyUpper = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);                                                                        //   Shortcut variable to reduce probability of error, for use with variable names

                let elementID = `${editor.moduleName}Editor${keyUpper}${elementName}ID`
                let element = document.getElementById(elementID);

                if (element == null)
                    throw `${errorPrefix} the id for the ${elementName} element, ${elementID}, does not point to an HTML element.`;

                editor.element[sectionKey][elementNameLower] = element;                  //  Example: editor.element.general.priority
            }
        }
    }



    /**Populate the option element that notifies the user that nothing is selected from a listbox
     * @param {*} editor The editor for which this function is called
     */
    function populateEmptySelectOption(editor)
    {
        //  The object, editor.name, contains arrays of strings
        for (let [sectionKey, sectionValue] of Object.entries(editor.emptySelection))                                                                    //  Loop through the object keys of the emptySelection object, where each key represents a primary section
            for (let [fieldKey, fieldValue] of Object.entries(editor.emptySelection[sectionKey]))                                                        //  Loop through the object keys of the values object under the emptySelection object, where each key represents a field of user input or emptySelection
            {
                let select = editor["element"][sectionKey][fieldKey];
                let optionValue = editor["emptySelection"][sectionKey][fieldKey];
                let option = document.createElement("option");

                if (select == null)
                    throw `The populateEmptySelectOption(editor) method failed because the select element for ${fieldValue} is null. This may be either due to the Editor property objects or the ID of the associated HTML element not being consistent with the naming convention of this application`;
                option.appendChild(document.createTextNode(optionValue));
                option.setAttribute("value", "None");
                select.appendChild(option);
            }
    }
            
        /**Configure the message that notifies the user that nothing is available
     * @param {*} editor The editor for which this function is called
     */
    function generateQuantityMessage(editor)
    {
        //  The object, editor.name, contains arrays of strings
        for (let [sectionKey, sectionValue] of Object.entries(editor.emptyCollection))                                                                    //  Loop through the object keys of the emptyCollection object, where each key represents a primary section
            for (let [fieldKey, fieldValue] of Object.entries(editor.emptyCollection[sectionKey]))                                                        //  Loop through the object keys of the values object under the emptyCollection object, where each key represents a field of user input or emptyCollection
            {
                let span = editor["element"][sectionKey][fieldKey];
                let message = editor["emptyCollection"][sectionKey][fieldKey];

                if (span == null)
                    throw `The generateEmptyMessage(editor) method failed because the span element for ${fieldValue} is null. This may be either due to the Editor property objects or the ID of the associated HTML element not being consistent with the naming convention of this application`;
                span.text = message;
            }
    }

    /**Populate the option elements that appear in the select elements
     * @param {*} editor The editor for which this function is called
     */
    function populateSelect(editor)
    {
        //  The object, editor.name, contains arrays of strings
        for (let [sectionKey, sectionValue] of Object.entries(editor.selection))                                                                    //  Loop through the object keys of the names object, where each key represents a primary section
            for (let [fieldKey, fieldValue] of Object.entries(editor.selection[sectionKey]))                                                        //  Loop through the object keys of the values object under the names object, where each key represents a field of user input or selection
            {
                let selectElement = editor.element[sectionKey][fieldKey];
                let options = generateOptionArray(fieldValue);                                                                                      //  Generate an array of option elements, determined by an array of string objects

                for (let optionIndex = 0; optionIndex < options.length; optionIndex++)
                {
                    if (selectElement == null)  throw `The populateSelect(editor) function failed in the for-loop because selectElement is null. This is most likely due to an inconsistency between the ID of the HTML element or the keys of the object of editor.name, editor.selection or editor.element. The values are: sectionKey: ${sectionKey}, sectionValue: ${sectionValue}, fieldKey: ${fieldKey}, fieldValue: ${fieldValue}, current option index : ${optionIndex}. Remember that IDs and keys are case sensitive and make sure to watch out for typos such as inconsistent use of plural forms of words.`;
                    else                        selectElement.appendChild(options[optionIndex]);
                }
            }

    }

    function initializeDescriptions(editor)
    {
        const errorPrefix = `The initializeDescriptions(editor) method of the editor module failed because`;
                //  The object, editor.name, contains arrays of strings
        for (let [sectionKey, sectionValue] of Object.entries(editor.message))                                                                      //  Loop through the object keys of the message object, where each key represents a primary section
        {
            if (sectionKey == null)
                throw `${errorPrefix} sectionKey is null`;
            for (let [fieldKey, fieldValue] of Object.entries(editor.message[sectionKey]))                                                        //  Loop through the object keys of the values object under the message object, where each key represents a field of user input or selection
            {
                let element = editor.element[sectionKey][fieldKey];
                if (fieldKey == null)   throw `${errorPrefix} fieldKey of sectionKey, ${sectionKey}, is null`;
                if (element  == null)   throw `${errorPrefix} the editor.element[sectionKey][fieldKey], is null instead of referring to an html element. The values of sectionKey and fieldKey are ${sectionKey} and ${fieldKey}`;
                
                element.setAttribute("onmouseover", `document.getElementById('helpbox').value = '${editor.message[sectionKey][fieldKey]}'`); 
            }
        }
    }


    


        /**
     * Hide all sections and then show the section corresponding to the selected index
     * @param {number} selectedIndex 
     */
    function displaySection(selectedIndex)
    {
        let form            = document.getElementById("EditorForm").children;   //  This variable contains all the sections of the editor immediately under the form element. These values should correspond to the Section Directory list
        let list            = document.getElementById(`SectionDirectoryList`);
        let previousButton  = document.getElementById("EditorPreviousButton");
        let nextButton      = document.getElementById("EditorNextButton");

        for (let index = 0; index < form.length; index++)
            form[index].setAttribute("style", "display:none;");
        form[selectedIndex].removeAttribute("style");

        //  Remove the highlighting of the previously selected list item
        for (let index = 0; index < list.children.length; index++)
            list.children[index].removeAttribute('style');                          

        //  Highlight the selected list item
        list.children[selectedIndex].setAttribute('style', 'background-color:burlywood;');              


        //  Show or hide the Previous and Next buttons depending on their neccessity
        if (selectedIndex == 0)
        {
            previousButton.setAttribute("style", "display:none;")
            nextButton.removeAttribute("style");
        }
        else if (selectedIndex == form.length - 2)
        {
            previousButton.removeAttribute("style");
            nextButton.setAttribute("style", "display:none;");
        }
        else
        {
            previousButton.removeAttribute("style");
            nextButton.removeAttribute("style");
        }
    }

    /** Display all sections and hide the Previous and Next Section buttons.
     * This function is meant to be called by the Show All list item in the Section Directory
    */
    function displayAll()
    {
        let form            = document.getElementById("EditorForm").children;   //  This variable contains all the sections of the editor immediately under the form element. These values should correspond to the Section Directory list
        let list            = document.getElementById(`SectionDirectoryList`);
        let previousButton  = document.getElementById("EditorPreviousButton");
        let nextButton      = document.getElementById("EditorNextButton");

        for (let index = 0; index < form.length; index++)
            form[index].removeAttribute("style");

                    //  Remove the highlighting of the previously selected list item
        for (let index = 0; index < list.children.length; index++)
        list.children[index].removeAttribute('style');                          

        //  Highlight the selected list item
        list.children[list.children.length -1].setAttribute('style', 'background-color:burlywood;');              

        //  Hide the Previous and Next buttons
        previousButton.setAttribute("style", "display:none;");
        nextButton.setAttribute("style", "display:none;");
    }

    /** Located in the editor.js module, this function creates various records such as the PhaseEditor's activePhase.requirements, activePhase.finance.expenses, and activePhase.messages.
     * Return the collection element for objects that require additional customization.
     * @param {string[]}            parameterIDs 
     * @param {string}              collectionElementID                                         The ID attribute of the HTML collection element (ordered/unordered list or table) whose child element (list item or table row) is to be modified
     * @param {string}              primaryKeyItemID                                            The ID attribute of the HTML element that holds the value for which is checked to avoid duplicates
     * @param {string}              objectClass                                                 The name of the class (not the HTML attribute) for the object to be constructed
     * @param {[]}                  objectArray                                                 A reference to the array property of the object built from the constructor of the class specified by objectClass. Example: Phase.requirements or Phase.finance.expenses
     * @param {string}              primaryKeyName                                              The name of a property that should be unique among all elements of a collection. Example: Project.title or User.username
     */
    function addRecordToCollection(parameterIDs, collectionElementID, primaryKeyItemID, objectClass, objectArray, primaryKeyName)
    {
        const errorPrefix = "The addRecordToCollection(parameterIDs, collectionElementID, primaryKeyItemID, objectClass, objectArray, primaryKeyName) function failed because"
        if (Array.isArray(objectArray) == false)
            throw `${errorPrefix} The objectArray, ${objectArray}, is not an array`
        let helpbox             = document.getElementById("helpbox");                           //  The text area element for which context sensitive information is dynamically displayed
        let collectionElement   = document.getElementById(collectionElementID);                 //  The list or table element addressed by the ID, collectionElementID
        let primaryKeyItem      = document.getElementById(primaryKeyItemID);                    //  The table data or list item element addressed by the ID, primaryKeyItemID

        let parameters = [];                                                                    //  Reference to the html elements such as table data

        for (let index = 0; index < parameterIDs.length; index++)                               //  Get the HTML elements from the IDs passed to the parameterIDs array
        {
            let parameter = document.getElementById(parameterIDs[index]);                       //  Parameters are the attributes of the object built by class constructors. They are what defines the object to be modified

            if (parameter == null)
                throw `${errorPrefix} the ID, ${parameterIDs[index]}, does not point to an HTML element`;

            parameters.push(parameter);                                                     //  Add the parameters to the array whose elements will be referenced in the constructor of the class specified by objectClass
        }

        if (primaryKeyItem.value == "")                                                     //  Make sure the value has not been left blank
        {
            helpbox.value = `The new value for ${primaryKeyName} must not be blank.`;
            return null;
        }

        for (let index = 0; index < objectArray.length; index++)                           //  Check to make sure that the new primaryKeyItem isn't being used by an existing object of the collection
            if (primaryKeyItem.value == objectArray[index][primaryKeyName])
            {
                helpbox.value = `The new ${primaryKeyName} value, ${primaryKeyItem.value}, must be unique.`;
                return null;
            }

        let constructedObject = null;
        switch(objectClass) //  Create the element from the class object's array of the activePhase object with the parameters...
        {
            case "Requirement"  : constructedObject = new Requirement   (parameters[0].value, parameters[1].value);                         break;  //  ...title and description
            case "Expense"      : constructedObject = new Expense       (parameters[0].value, parameters[1].value, parameters[2].value);    break;  //  ...cost, title and description
            case "TeamMember"   : constructedObject = new TeamMember    (parameters[0].value, parameters[1].value, parameters[2].value, parameters[3].value, parameters[4].value, parameters[5].value); break;  //  ...member, role, department, wage, schedule, and supervisor
            case "Message"      : constructedObject = new Message       (parameters[0].value, parameters[1].value, parameters[2].value, parameters[3].value, parameters[4].value, parameters[5].value, parameters[6].value, parameters[7].value);    break;  //  ...author, subject, date, category, associatedDepartment, associatedStage, and message
            default             : throw `${errorPrefix} there was an unexpected case, ${objectClass}, passed to the switch statement concerning the initialization of constructedObject`
        }

        objectArray.push(constructedObject);                                            //  Add the recently created constructed object to the array
        
        let collectionItem = constructedObject.generateElement();                       //  Every object constructed by a class passed to this function should have a generateElement() function, which returns a reference to a new HTML element associated with that object

        switch(objectClass)                                                             //  Now that the model object is created, configure the associated HTML element
        {
            case "Requirement"  :
                let requirementCheckbox = collectionItem.children[0].children[0];     //  Get the checkbox element that is a child of a label element, which is a child of a list item element.

                requirementCheckbox.onchange = function()                               //  Adjust the boolean property of the Requirement object to reflect the completed or incomplete status when the user checks or unchecks the checkbox element
                {
                    constructedObject.satisfied = requirementCheckbox.checked;
                };
                break;
            case "Expense"      :
                break;
            case "TeamMember"   :
                break;
            case "Message"      :
                break;

            default             : throw `${errorPrefix} there was an unexpected case, ${objectClass}, passed to the switch statement concerning the configuration of collectionItem`
        }

        console.log(collectionItem);

        if (objectClass == "Requirement")
            if (constructedObject.satisfied == true)                                      //  If the requirement is satisfied, then check the box
                collectionItem.children[0].children[0].checked = true;                          //  The collection item should have a label as its first child element and that label should have a checkbox as its first child element
        collectionElement.appendChild(collectionItem);                                                 //  Add the updated label and checkbox elements to the collection item
        return {html: collectionItem, constructedObject: constructedObject};
    }

    /** Edit various records such as the PhaseEditor's activePhase.requirements, activePhase.finance.expenses, and activePhase.messages
     * @param {string[]}            parameterIDs 
     * @param {string}              collectionElementID                                         The ID attribute of the HTML collection element (ordered/unordered list or table) whose child element (list item or table row) is to be modified
     * @param {string}              primaryKeyItemID                                            The ID attribute of the HTML element that holds the value for which is checked to avoid duplicates
     * @param {string}              selectedItemID                                              The ID attribute of the HTML span element that tracks which child element has been selected. It functions like the WHERE clause in an SQL statement
     * @param {string}              objectClass                                                 The name of the class (not the HTML attribute) for the object to be constructed
     * @param {[]}                  objectArray                                                 A reference to the array property of the object built from the constructor of the class specified by objectClass. Example: Phase.requirements or Phase.finance.expenses
     * @param {string}              primaryKeyName                                              The name of a property that should be unique among all elements of a collection. Example: Project.title or User.username
     */
    function editRecordFromCollection(parameterIDs, collectionElementID, primaryKeyItemID, selectedItemID, objectClass, objectArray, primaryKeyName)
    {
        const errorPrefix = "The editRecordFromCollection(parameterIDs, collectionElementID, primaryKeyItemID, selectedItemID, objectClass, objectArray, primaryKeyName) function failed because"
        if (Array.isArray(objectArray) == false)
            throw `${errorPrefix} The objectArray, ${objectArray}, is not an array`
        let edited          = false;                                                            //  Determined if the function should continue after the first loop. A reason for this value to be false is if the user did not select an item
        let helpbox         = document.getElementById("helpbox");                               //  The text area element for which context sensitive information is dynamically displayed
        let collectionElement     = document.getElementById(collectionElementID);                     //  The list or table element addressed by the ID, collectionElementID
        let primaryKeyItem  = document.getElementById(primaryKeyItemID);                        //  The table data or list item element addressed by the ID, primaryKeyItemID
        let selectedItem    = document.getElementById(selectedItemID);                          //  The span element addressed by the ID, selectedItemID

        let parameters = [];                                                                    //  Reference to the html elements such as table data

        for (let index = 0; index < parameterIDs.length; index++)                               //  Get the HTML elements from the IDs passed to the parameterIDs array
        {
            let parameter = document.getElementById(parameterIDs[index]);                       //  Parameters are the attributes of the object built by class constructors. They are what defines the object to be modified

            if (parameter == null)
                throw `${errorPrefix} the ID, ${parameterIDs[index]}, does not point to an HTML element`;

            parameters.push(parameter);                                                         //  Add the parameters to the array whose elements will be referenced in the constructor of the class specified by objectClass
        }

        for (let index = 0; index < objectArray.length; index++)                           //  Check to make sure that the new primaryKeyItem isn't being used by an existing object of the collection
            if (primaryKeyItem.value == objectArray[index][primaryKeyName])
            {
                helpbox.value = `The new primaryKeyItem.value, ${primaryKeyItem.value}, must be unique before editing ${selectedItem.textContent}.`;
                return;
            }

        for (let index = 0; index < objectArray.length; index++)                           //  Get the selected object and replace it with the new one
        {
            if (selectedItem.textContent == objectArray[index][primaryKeyName])            //  The name of the field of the object such as requirement.requirement, project.title, or user.username
            {
                switch(objectClass)                                                             //  Edit the element from the class object's array of the activePhase object with the parameters
                {
                    case "Requirement"  : objectArray[index] = new Requirement  (parameters[0].value, parameters[1].value);                         break;  //  Each Requirements object of the array has the parameters of title and description
                    case "Expense"      : objectArray[index] = new Expense      (parameters[0].value, parameters[1].value, parameters[2].value);    break;  //  Each Expense object of the array has the parameters of cost, title and description
                    case "TeamMember"   : objectArray[index] = new TeamMember   (parameters[0].value, parameters[1].value, parameters[2].value, parameters[3].value, parameters[4].value, parameters[5].value); break;  //  ...member, role, department, wage, schedule, and supervisor
                    case "Message"      : objectArray[index] = new Message      (parameters[0].value, parameters[1].value, parameters[2].value, parameters[3].value, parameters[4].value, parameters[5].value, parameters[6].value);    break;  //  ...author, subject, date, category, associatedDepartment, associatedStage, and message
                    default             : throw `${errorPrefix} there was an unexpected case, ${objectClass}, passed to the switch statement`;
                }
                
                edited = true;
                selectedItem.textContent = "None";
            }
        }
        if (edited == false)
        {
            helpbox.value = `A ${objectClass} must be selected before using the Edit Selected ${objectClass} function.`;
            return;
        }

        repopulateCollection(collectionElement, objectArray, objectClass);
    }

        /** Edit various records such as the PhaseEditor's activePhase.requirements, activePhase.finance.expenses, and activePhase.messages
     * @param {string}              collectionElementID                                         The ID attribute of the HTML collection element (ordered/unordered list or table) whose child element (list item or table row) is to be modified
     * @param {string}              selectedItemID                                              The ID attribute of the HTML span element that tracks which child element has been selected. It functions like the WHERE clause in an SQL statement
     * @param {string}              objectClass                                                 The name of the class (not the HTML attribute) for the object to be constructed
     * @param {[]}                  objectArray                                                 A reference to the array property of the object built from the constructor of the class specified by objectClass. Example: Phase.requirements or Phase.finance.expenses
     * @param {string}              primaryKeyName                                              The name of a property that should be unique among all elements of a collection. Example: Project.title or User.username
     */
    function deleteRecordFromCollection(collectionElementID, selectedItemID, objectClass, objectArray, primaryKeyName)
    {
        const errorPrefix = "The deleteRecordFromCollection(parameterIDs, collectionElementID, primaryKeyItemID, selectedItemID, objectClass, objectArray, primaryKeyName) function failed because"
        if (Array.isArray(objectArray) == false)
            throw `${errorPrefix} The objectArray, ${objectArray}, is not an array`
        let deleted          = false;                                                            //  Determined if the function should continue after the first loop. A reason for this value to be false is if the user did not select an item
        let helpbox         = document.getElementById("helpbox");                               //  The text area element for which context sensitive information is dynamically displayed
        let collectionElement     = document.getElementById(collectionElementID);                     //  The list or table element addressed by the ID, collectionElementID
        let selectedItem    = document.getElementById(selectedItemID);                          //  The span element addressed by the ID, selectedItemID

        for (let index = 0; index < objectArray.length; index++)                           //  Get the selected object and replace it with the new one
        {
            if (selectedItem.textContent == objectArray[index][primaryKeyName])            //  The name of the field of the object such as requirement.requirement, project.title, or user.username
            {
                objectArray.splice(index, 1);                             //  Remove the element from the requirements array of the activePhase object
                deleted = true;
                selectedItem.textContent = "None";

            }
        }
        if (deleted == false)
        {
            helpbox.value = `A ${objectClass} must be selected before using the Edit Selected ${objectClass} function.`;
            return;
        }

        repopulateCollection(collectionElement, objectArray, objectClass);
    }

    /**Support function for the editRecordFromCollection() and deleteRecordFromCollection functions. 
     * Repopulates the table or ordered/unordered list element addressed by those functions
     * @param {HTMLElement} collectionElement   The HTML collection element (ordered/unordered list or table) whose child element (list item or table row) is to be modified
     * @param {[]}          objectArray         A reference to the array property of the object built from the constructor of the class specified by objectClass. Example: Phase.requirements or Phase.finance.expenses
     * @param {string}      objectClass         A string to determine special events for certain object classes, such as when a checkbox is checked. Options are Requirement, Expense and so on.
     */
    function repopulateCollection(collectionElement, objectArray, objectClass)
    {
        while (collectionElement.children.length > 0)                                                       //  Glitchy effects seem to happen when I try to remove individual elements, so I flush the contents of the collection element and start anew
            collectionElement.firstChild.remove();                                                          //  Remove all child elements (such as rows or list items) from the collection object (such as unordered list or table)

        for (let index = 0; index < objectArray.length; index++)                                            //  Loop through the array of objects constructed by the classes Requirement, Expense and so on
        {
            let collectionItem = objectArray[index].generateElement();                                      //  Generate the list item or row to be readded to the list or table

            switch(objectClass)
            {
                case "Requirement" :
                    if (objectArray[index].satisfied == true)                                               //  If the requirement is satisfied, then check the box
                        collectionItem.children[0].children[0].checked = true;                              //  The collection item should have a label as its first child element and that label should have a checkbox as its first child element
                    break;
            }

            collectionElement.appendChild(collectionItem);                                                 //  Add the updated label and checkbox elements to the collection item
        }
    }

            /** Verify that the object passed to the editor parameter is an object with the correct keys. 
         * If a violation is detected, throw an exception that notifies the programmer of the error. 
         * This function should be placed in the Editor classes after the property declarations, but before the initialization methods.
         * If coding is completed and thorougly tested and no changes are expected in the forseeable future, this function can be cut out of the application to save on resources.
         * 
         * The keys are as follows:
         * - moduleName A string value such as User, Project, WorkOrder, Department and so on
         * - element    An object with blank objects as its properties. The object keys should coorespond to the arrays of the names object
     * @param {*} editor Examples of the editor object consist of ProjectEditor, StageEditor, UserEditor and so on
     */
    function validateEditor(editor)
    {
        let functionIdentifier = {functionName: "generateNavigation(configuration)", sourceFileName: "navigation.js", checkedObjectName: "configuration"};
        validateObjectProperties
        (
            editor,
            ["moduleName",    "name",     "element",  "selection", "emptySelection"],
            ["string",        "object",   "object",   "object",    "object"],
            functionIdentifier
        );

        const errorPrefix = `An exception was thrown in the validationCheck(editor) method of the editor.js file because`;

        //  Verify that emptySelection has matching keys with the element object
        for (let [sectionKey, sectionValue] of Object.entries(editor.emptySelection))                                                                    //  Loop through the object keys of the names object, where each key represents a primary section
        {
            if (editor.element.hasOwnProperty(sectionKey) == false) throw `${errorPrefix} the argument passed to the editor.element object does not have the cooresponding key, ${sectionKey} with the editor.emptySelection object`
            else                                                    console.log(`First iteration of validationCheck(editor) executed with sectionKey, ${sectionKey}, and sectionValue, ${sectionValue} of editor.emptySelection`);

            for (let [fieldKey, fieldValue] of Object.entries(editor.emptySelection[sectionKey]))                                                        //  Loop through the object keys of the values object under the names object, where each key represents a field of user input or selection
                if (editor.element[sectionKey].hasOwnProperty(fieldKey) == false)   throw `${errorPrefix} the argument passed to the editor.element[${sectionKey}] object does not have the cooresponding key, ${fieldKey} with the editor.emptySelection[${sectionKey}] object`
                else                                                                console.log(`Second iteration of validationCheck(editor) executed with fieldKey ${fieldKey} and fieldValue, ${fieldValue}`);
        }

        //  Verify that emptyCollection has matching keys with the element object
        for (let [sectionKey, sectionValue] of Object.entries(editor.emptyCollection))                                                                    //  Loop through the object keys of the names object, where each key represents a primary section
        {
            if (editor.element.hasOwnProperty(sectionKey) == false) throw `${errorPrefix} the argument passed to the editor.element object does not have the cooresponding key, ${sectionKey} with the editor.emptyCollection object`
            else                                                    console.log(`First iteration of validationCheck(editor) executed with sectionKey, ${sectionKey}, and sectionValue, ${sectionValue} of editor.emptyCollection`);
        
            for (let [fieldKey, fieldValue] of Object.entries(editor.emptyCollection[sectionKey]))                                                        //  Loop through the object keys of the values object under the names object, where each key represents a field of user input or selection
                if (editor.element[sectionKey].hasOwnProperty(fieldKey) == false)   throw `${errorPrefix} the argument passed to the editor.element[${sectionKey}] object does not have the cooresponding key, ${fieldKey} with the editor.emptyCollection[${sectionKey}] object`
                else                                                                console.log(`Second iteration of validationCheck(editor) executed with fieldKey ${fieldKey} and fieldValue, ${fieldValue}`);
        
                }
        
        //  Verify that selection has matching keys with the element object
        for (let [sectionKey, sectionValue] of Object.entries(editor.selection))                                                                    //  Loop through the object keys of the names object, where each key represents a primary section
        {
            if (editor.element.hasOwnProperty(sectionKey) == false) throw `${errorPrefix} the argument passed to the editor.element object does not have the cooresponding key, ${sectionKey} with the editor.selection object`
            else                                                    console.log(`First iteration of validationCheck(editor) executed with sectionKey, ${sectionKey}, and sectionValue, ${sectionValue} of editor.selection`);

            for (let [fieldKey, fieldValue] of Object.entries(editor.selection[sectionKey]))                                                        //  Loop through the object keys of the values object under the names object, where each key represents a field of user input or selection
                if (editor.element[sectionKey].hasOwnProperty(fieldKey) == false)   throw `${errorPrefix} the argument passed to the editor.element[${sectionKey}] object does not have the cooresponding key, ${fieldKey} with the editor.selection[${sectionKey}] object`
                else                                                                console.log(`Second iteration of validationCheck(editor) executed with fieldKey ${fieldKey} and fieldValue, ${fieldValue} of editor.selection[${sectionKey}]`);
        }

    }
