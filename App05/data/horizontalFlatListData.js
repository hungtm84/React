var horizontalStatus = {
    rainy:{
        ios:"ios-rainy",
        android:"md-rainy"
    },
    cloudy:{
        ios:"ios-cloudy",
        android:"md-cloudy"
    },
    flash:{
        ios:"ios-flash",
        android:"md-flash"
    },
    sunny:{
        ios:"ios-sunny",
        android:"md-sunny"
    },
    thunderstorm:{
        ios:"ios-thunderstorm",
        android:"md-thunderstorm"
    }
};
var horizontalFlatListData = [
    {
        hour:"1 AM",
        status: horizontalStatus.rainy,
        degrees:58
    },
    {
        hour:"2 AM",
        status: horizontalStatus.cloudy,
        degrees:59
    },
    {
        hour:"3 AM",
        status: horizontalStatus.flash,
        degrees:60
    },
    {
        hour:"4 AM",
        status: horizontalStatus.sunny,
        degrees:61
    },
    {
        hour:"5 AM",
        status: horizontalStatus.thunderstorm,
        degrees:62
    },
    {
        hour:"6 AM",
        status: horizontalStatus.rainy,
        degrees:63
    },
    {
        hour:"7 AM",
        status: horizontalStatus.rainy,
        degrees:58
    },
    {
        hour:"8 AM",
        status: horizontalStatus.cloudy,
        degrees:59
    },
    {
        hour:"9 AM",
        status: horizontalStatus.flash,
        degrees:60
    },
    {
        hour:"10 AM",
        status: horizontalStatus.sunny,
        degrees:61
    },
    {
        hour:"11 AM",
        status: horizontalStatus.thunderstorm,
        degrees:62
    },
    {
        hour:"12 AM",
        status: horizontalStatus.rainy,
        degrees:63
    },
];
export{horizontalStatus};
export{horizontalFlatListData};