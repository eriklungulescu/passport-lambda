class contact {
    constructor(userId, name, mobile, linkedin, facebook) {
        this.userId = userId;
        this.mobile = mobile;
        this.name = name;
        this.linkedin = linkedin;
        this.facebook = facebook;
    }
}

module.exports.contact = contact;