export default class UtilsFunction {
    constructor(){}
    _setColor(index:number):number{
        let colorIndex= -1;
        switch(index%3){
            case 0:
                colorIndex=0; 
                break;
            case 1:
                colorIndex=1;
                break;
            case 2:
                colorIndex=2;
                break;
            default:
                break;
        }
        return colorIndex;
    }
}