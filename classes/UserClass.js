export class User {
    constructor (uid=null, /*username, name, profile_image_url, */isFollower, ) {
        this.uid = uid;
        //this.id = id;
        //this.username = username;
        //this.name = name;
        //this.profile_image_url = profile_image_url;
        this.isFollower = isFollower;
        //this.country = country;
    }
    toString() {
        //return this.uid;
        return this.uid + ', ' + this.isFollower;
    }
}