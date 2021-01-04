class Notification
{
    /**
     * Notification that is sent to the user's desktop, phone or email account
     * @param {string} alert 
     * @param {boolean} desktop 
     * @param {boolean} text 
     * @param {boolean} email 
     */
    constructor(alert, desktop, text, email)
    {
        this.alert      = alert;
        this.desktop    = desktop;
        this.text       = text;
        this.email      = email;
    }
}