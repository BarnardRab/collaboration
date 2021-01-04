class Blueprint
{
    /**
     * @param {string} name The name of the blueprint
     * @param {number} width    The width of the SVG element
     * @param {number} height    The height of the SVG element
     */
    constructor(name, description, width, height, panX, panY, zoomX, zoomY)
    {
        this.name           = name;
        this.description    = description;
        this.width          = width;
        this.height         = height;
        this.panX           = panX;
        this.panY           = panY;
        this.zoomX          = zoomX;
        this.zoomY          = zoomY;
    }

    /** Generate a row element for the tbody element of the table of the listing page */
    generateRowElement()
    {
        let row             = document.createElement("tr");
        let attributes      = ["Name", "Description", "Canvas Width", "Canvas Height", "Horizontal Pan",    "Vertical Pan", "Horizontal Zoom",  "Vertical Zoom"];
        let attributeValues = [this.name, this.description, this.width, this.height,    this.panX,          this.panY,      this.zoomX,         this.zoomY];
        let cells           = []

        for (let index = 0; index < attributes.length; index++)     //  Initialize properties with a loop to reduce redundant code
        {
            let cell = document.createElement("td");
            let span = document.createElement("span");
            span.textContent = attributeValues[index];
            cell.setAttribute("name", `Blueprint${attributes[index]}Column`);
            cells.push(cell);

            cell.appendChild(span);
            row.appendChild(cell);
        }

        return row;
    }
}

/**Initialize the contents of a table element and its related components based on the properties of the source object class. 
 * 
 * This function calls the getTableElements(idPrefix) function and then generates the fields that appear in the table footer for use with adding a new record.
 * 
 * The returned object includes these objects as well as arrays for field names and column widths, which are used by the Listing class to configure the table.
 * @param {string} idPrefix  The ID of the table to be initialized
 */
function initializeBlueprintTable(idPrefix)
{
    let tableElements = getTableElements(idPrefix);

    let footerFields =
    [
        document.createElement("input"),    //  Name field
        document.createElement("textarea"), //  Description field
        document.createElement("input"),    //  Canvas Width field
        document.createElement("input"),    //  Canvas Height field
        document.createElement("input"),    //  Horizontal Pan field
        document.createElement("input"),    //  Vertical Pan field
        document.createElement("input"),    //  Horizontal Zoom
        document.createElement("input")     //  Vertical Zoom
    ];

    footerFields[0].setAttribute("required", true);
    footerFields[1].setAttribute("rows", 10);
    footerFields[2].setAttribute("type", "number"); footerFields[2].setAttribute("value", 1500);
    footerFields[3].setAttribute("type", "number"); footerFields[3].setAttribute("value", 900);
    footerFields[4].setAttribute("type", "number"); footerFields[4].setAttribute("value", 0);
    footerFields[5].setAttribute("type", "number"); footerFields[5].setAttribute("value", 0);
    footerFields[6].setAttribute("type", "number"); footerFields[6].setAttribute("value", 1500);
    footerFields[7].setAttribute("type", "number"); footerFields[7].setAttribute("value", 900);

    return {
        columnNames     : ["Name",  "Description",  "Canvas Width", "Canvas Height",    "Horizontal Pan",   "Vertical Pan", "Horizontal Zoom",  "Vertical Zoom"],
        columnWidths    : [200,     200,            70,             70,                 70,                 70,             70,                 70],
        dataSource      : blueprints,
        descriptions    : getBlueprintPropertyDescriptions(),
        footerFields    : footerFields,
        tableElements   : tableElements
    }
}

function getBlueprintFooterValues(footerFields)
{
    return {
        name        : footerFields[0].value,
        description : footerFields[1].value,
        width       : footerFields[2].value,
        height      : footerFields[3].value,
        panX        : footerFields[4].value,
        panY        : footerFields[5].value,
        zoomX       : footerFields[6].value,
        zoomY       : footerFields[7].value
    }
}

/** Returns an array of strings describing the properties of this class for use with the textarea called helpbox. This is useful for maintaining consistency among all uses of this feature.
 * 
 * The descriptions are for ...*/
function getBlueprintPropertyDescriptions()
{
    return [
            "Name is the identifying component of the blueprint in the database and it must be unique. It should be brief.",
            "Description is an overview of the blueprint\\'s purpose and any applicable information to convey to those who use it.",
            "Canvas Width is the number of pixels for which the blueprint will take up on screen along the horizontal (X) axis. The default value is sufficient for computer monitors, but may need to be adjusted for smaller screens such as tablets.",
            "Canvas Height is the number of pixels for which the blueprint will take up on screen along the vertical (Y) axis. The default value is sufficient for computer monitors, but may need to be adjusted for smaller screens such as tablets.",
            "Horizontal Pan represents the horizontal position of perspective (X axis) of the virtual camera for which you perceive the canvas. This feature allows the size of a blueprint to exceed the physical size of the monitor, while allowing access to the entire blueprint",
            "Vertical Pan represents the vertical position of perspective (Y axis) of the virtual camera for which you perceive the canvas. This feature allows the size of a blueprint to exceed the physical size of the monitor, while allowing access to the entire blueprint",
            "Horizontal Zoom represents the horizontal depth of perspective (X axis) of the virtual camera for which you perceive the canvas. This feature allows you to look closer at the features of the blueprint or further away to see the entire blueprint in a single view without alteration of quality. The values of the horizontal and vertical zoom should be in proportion to the values of the Canvas Width and Height. Matching values represents a zoom factor of 0, which is the actual size of the blueprint.",
            "Vertical Zoom represents the vertical depth of perspective (Y axis) of the virtual camera for which you perceive the canvas. This feature allows you to look closer at the features of the blueprint or further away to see the entire blueprint in a single view without alteration of quality. The values of the horizontal and vertical zoom should be in proportion to the values of the Canvas Width and Height. Matching values represents a zoom factor of 0, which is the actual size of the blueprint.",
        ]
}
