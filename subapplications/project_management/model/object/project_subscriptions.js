class ProjectSubscription
{
    /** Project subscriptions are email alerts for multiple events. By default, all events are configured to send emails
     * @param {Project}     project
     */
    constructor(project, category, user)
    {
        const unsubscribeMessage        = "\n\nIf you would like to insubscribe to these alerts, or change the conditions for which you recieve them, log into the Project Management application and access notification settings. Use the search feature if you have trouble finding it.";
        const projectStageDescription   = "\n\nProject stages are intermediate parts of the main project that can be considered as sub projects. For example, during construction of a new building, a project stage for the IT Department would involve an employee setting up network infrastructure before the walls go up.";

        this.project        = project;
        this.category       = category;
        this.projectAlerts  = 
        [
            new ProjectSubscriptionAlert("Project Start",                       `${user},\n\nA ${category} project with the name "${project}" has begun.${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Canceled",                    `${user},\n\nThe ${category} project, ${project}, has failed completion.${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Failed Completion",           `${user},\n\nThe ${category} project, ${project}, has failed completion and success is no longer viable.${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Overbudget",                  `${user},\n\nThe ${category} project, ${project}, is now overbudget.${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Overdue",                     `${user},\n\nThe ${category} project, ${project}, is now overdue.${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Completed Successfully",      `${user},\n\nThe ${category} project, ${project}, has completed successfully.${unsubscribeMessage}`),
        ];

        this.projectStageAlerts =
        [
            new ProjectSubscriptionAlert("Project Stage Start",                   `${user},\n\nA ${category} project stage with the name "${project}" has begun.${projectStageDescription}${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Stage Canceled",                `${user},\n\nThe ${category} project stage, ${project}, has failed completion.${projectStageDescription}${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Stage Failed Completion",       `${user},\n\nThe ${category} project stage, ${project}, has failed completion and success is no longer viable.${projectStageDescription}${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Stage Overbudget",              `${user},\n\nThe ${category} project stage, ${project}, is now overbudget.${projectStageDescription}${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Stage Overdue",                 `${user},\n\nThe ${category} project stage, ${project}, is now overdue.${projectStageDescription}${unsubscribeMessage}`),
            new ProjectSubscriptionAlert("Project Stage Completed Successfully",  `${user},\n\nThe ${category} project stage, ${project}, has completed successfully.${projectStageDescription}${unsubscribeMessage}`),
        ];
    }
}

class ProjectSubscriptionAlert
{
    /** An alert that is sent to the subscriber
     * @param {*} event 
     * @param {*} message 
     */
    constructor(event, message, active)
    {
        this.event = event;
        this.message = message;
        this.active = active;
    }
}