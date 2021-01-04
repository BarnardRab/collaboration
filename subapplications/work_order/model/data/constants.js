const workOrderIDDescription            = "Order Number is the identifying component of the Order in the database and it must be unique. It should be brief.";
const workOrderDateDescription          = "Date is when the work order was created.";
const workOrderClientDescription        = "Client is whom the work order was requested by.";
const workOrderPriorityDescription      = "Priority is the urgency of the work order.";
const workOrderDueDateDescription       = "Due date is the latest acceptable date of the work order.";
const workOrderAssignedToDescription    = "Assign to is the individual whom the work order is issued to.";
const workOrderDescriptionDescription   = "Description is the overall explanation of the needs of the workorder.";

/** - This value is passed to the initializeEditor(moduleName, sectionData) function called by html pages in the view/editor folder*/
/** - This value is assigned as a property to the listingContents object passed to the generateListingPage(listingContents, listingTable) function called by html pages in the view/listing folder*/
const workOrderNavigationObject         =
{
    header: "Work Order Directory",
    links :
    [
        {   item: "Home",           location: "../index.html",                  description: "Back to the landing page of the Work Order system"   },
        {   item: "Work Orders",    location: "../listing/work_orders.html",    description: "Go to the Work Order listing page of the Work Order system"   }
    ]
};
