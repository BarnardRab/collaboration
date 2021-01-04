 /**Generate an unordered list element inside a nav element with a caption for the directory of the application
 * 
 * This function is called by the listing and editor pages

  * @param {ObjectConstructor} configuration
  @returns html nav element full of directory links
  */
function generateNavigation(configuration)
{
    console.log("configuration:")
    console.log(configuration)
    let functionIdentifier = {functionName: "generateNavigation(configuration)", sourceFileName: "navigation.js", checkedObjectName: "configuration"};

    validateObjectProperties(configuration, ["header", "links"], ["string", "array"], functionIdentifier);
    validateArray(configuration.links, ["item", "location", "description"], functionIdentifier);


//    let links = validationCheck();

//    let configuration     = ["../index.html", "../../view/lists/blueprints.html", "../../view/lists/departments.html", "../../view/lists/messages.html", "../../view/lists/projects.html", "../../view/lists/users.html"]

    let listConfiguration =
    {
        caption             : configuration.header,
        container           : "nav",
        items               : [],
        descriptions        : [],
        listItemAttributes  : []
    }

    for (let index = 0; index < configuration.links.length; index++)
    {
        let link = configuration.links[index];
        listConfiguration.items.push(link.item);
        listConfiguration.descriptions.push(link.description);
        listConfiguration.listItemAttributes.push({"onclick" : `location.href = '${link.location}'`});
    }

    console.log("list configuration and the result of generatedList are")
    console.log(listConfiguration);
    let generatedList = generateList(listConfiguration);
    console.log(generatedList);

    return generatedList;

    /**Checks the keys of the configuration object to ensure that the required keys are present and have valid values. Throws exception if it fails*/
    // function validationCheck()
    // {
    //     const errorPrefix       = "An exception was thrown in the generateNavigation(configuration) function in the navigation.js module because the argument passed to configuration";

    //     if (configuration.hasOwnProperty("header") == false)   throw `${errorPrefix} does not have a property named navigation.header`;
    //     if (configuration.hasOwnProperty("links")  == false)   throw `${errorPrefix} does not have a property named navigation.links`;
    //     if (Array.isArray(configuration.links)     == false)   throw `${errorPrefix}.links is not an array`;

    //     let links = configuration.links;                              //  Shortcut variable to reduce probability of error
    
    //     for (let index = 0; index < links.length; index++)          //  Loop throgh each link to make sure that it has the structure of {label: string, location: string}
    //     {
    //         if (links[index].hasOwnProperty("item")         == false)   throw `${errorPrefix} listingContents.navigation.links[${index}], does not have a property named label`;
    //         if (links[index].hasOwnProperty("location")     == false)   throw `${errorPrefix} listingContents.navigation.links[${index}], does not have a property named location`;
    //         if (links[index].hasOwnProperty("description")  == false)   throw `${errorPrefix} listingContents.navigation.links[${index}], does not have a property named description`;
    //     }

    //     return links;
    // }


}