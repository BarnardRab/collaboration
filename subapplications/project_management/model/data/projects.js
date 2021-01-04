// let accountingPhase1    = new Phase();
// let ConstructionPhase1  = new Phase();
// let growingPhase1       = new Phase();
// let hrPhase1            = new Phase();
// let itPhase1            = new Phase();
// let inventoryPhase1     = new Phase();
// let maintenancePhase1   = new Phase();
// let mechanicPhase1      = new Phase();
// let propagationPhase1   = new Phase();
// let salesPhase1         = new Phase();

//  global objects used across the application
//  Test objects


var projects    =
[
    new Project("Application Development",          "Write code to implement custom functionality.", true,
        null, users[10], "Medium",   "Proposed",       2000, 500, null, null, new Date(), null),
    new Project("Build buildings",                  "Construct buildings for various purposes such as for the new Potting office and Mechanic shop.", true,
        null, users[3], "High",     "In Progress",    2000, 500, null, null, new Date(), null),
    new Project("Direct Print",                     "The belt-based printing system in the Tag Room has problems. Resolve them.", false,
        null, users[9], "Medium",   "In Progress",    2000, 500, null, null, new Date(), null),
    new Project("ERP application",                  "Develope a web based application to replace AGS.", false,
        null, users[10], "Low",      "On Hold",        2000, 500, null, null, new Date(), null),
    new Project("Network",                          "Configure and optimize network infrastructure.", true,
        null, users[10], "medium",   "In Progress",    2000, 500, null, null, new Date(), null),
    new Project("Project Management application",   "Develope a project management application to help the various departments of the company get organized and track progress.", false,
        null, users[1], "Medium",   "In Progress",    2000, 500, null, null, new Date(), null),
    new Project("Repair Truck",                     "The breaks of Truck number 6 has failed. Find the fault and correct it.", true,
        null, users[1], "Low",      "Started",        2000, 500, null, null, new Date(), null),
    new Project("Replace Solar panels",             "The solar panels provide power for access points in the field. They are unreliable when the sun is not out, especially during the winter. Power outlets have been installed in various areas of the field. Utilize them in lieu of the solar panels.", false,
        null, users[1], "Medium",   "On Hold",        2000, 500, null, null, new Date(), null)
];
