
export function getSeason() {
    let season = "";
    switch(new Date().getMonth() + 1) {
        case 12:
        case 1:
        case 2:
            season = "WINTER";
        break;
        case 3:
        case 4:
        case 5:
            season = "SPRING";
        break;
        case 6:
        case 7:
        case 8:
            season = "SUMMER";
        break;
        case 9:
        case 10: 
        case 11:
            season = "FALL";
        break;
        default:
            season = "";
    }
    return season
}