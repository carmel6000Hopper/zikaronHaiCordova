export class ImageDetector {
    constructor(longitude, latitude, geoFire) {
        this.findCloseLocationImage = false;
        this.keyClosestImage = '';
        // TODO change default place
        this.longitude = longitude;
        this.latitude = latitude;
        this.geoFire = geoFire;
        this.setFindCloseLocationImage = this.setFindCloseLocationImage.bind(this);
        this.setKeyClosestImage = this.setKeyClosestImage.bind(this);
        this.checkClosestImageInDb = this.checkClosestImageInDb.bind(this);
    }

    setFindCloseLocationImage() {
        //TO DO - implement this function
        console.log("setFindCloseLocationImage")
        this.findCloseLocationImage = true;
    }
    setKeyClosestImage(key) {
        //TO DO - implement this function
        this.keyClosestImage = key;
    }
    getPossibleSignNames(){
        //TO DO - implement this function
        const namesEx = ['title1', 'title2', 'title3'];
        return namesEx;
    }
    checkForImageInDb() {
        this.checkClosestImageInDb();
        if (this.findCloseLocationImage === true) {
            console.log("checkClosestImageInDb");
            // TODO check if it is the same picture
            // OCR
            return true;
        }
        else {
            return false;
        }
    }
        //return true;
        // }).catch( err => { console.log(err); })
    
    checkClosestImageInDb() {
        console.log("checkClosestImageInDb");
        let geoQuery = this.geoFire.query({
            center: [this.longitude, this.latitude],
            // radius in kilometer
            radius: 0.02
        });
        let onKeyEnteredRegistration = geoQuery.on("key_entered", (key, location) => {
            console.log("location is " + location)
            console.log(key + " entered the query. Hi " + key + "!");
            //this.setState({key, location});
            this.setKeyClosestImage(key);
            this.setFindCloseLocationImage();
            geoQuery.cancel();
        });
    }
}

export default ImageDetector;
