export class GPS {
    constructor(onSuccessFunction) {
        this.latitude =  0;
        this.longitude =  0 ;
        this.interval = 10000;
        this.onSuccessFunction = onSuccessFunction ;
        this.onSuccessLocation = this.onSuccessLocation.bind(this);
        this.onErrorLocation = this.onErrorLocation.bind(this);
        this.startWatchingPosition = this.startWatchingPosition.bind(this);
    }
    // onSuccess Geolocation
    onSuccessLocation(position) {
        this.latitude = position.coords.latitude ;
        this.longitude = position.coords.longitude ;
        this.onSuccessFunction(this.latitude,this.longitude) ;
        //console.log("in onSuccessLocation function");
    }
    // onError Callback receives a PositionError object
    onErrorLocation(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
   
    startWatchingPosition(){
        navigator.geolocation.getCurrentPosition(this.onSuccessLocation, this.onErrorLocation);
        setInterval(navigator.geolocation.watchPosition(this.onSuccessLocation, this.onErrorLocation), this.interval);
    }
 
}