class Num {

    // THE NUMBER THIS CLASS MANAGES
    constructor(){
        this.num = 0;
    }
    Num(initNum){
        this.num = initNum;
    }
    /**
     * Mutator method for the num instance variable.
     *
     * @param initNum The value to set num to.
     */
    setNum(initNum){
        this.num = initNum;
    }

    /**
     * Accessor method for num.
     *
     * @return The num instance variable value.
     */
    getNum() {
        return this.num;
    }

    andMask(mask) {
        this.num = this.num & mask;
    }

    orMask(mask) {
        this.num = this.num | mask;
    }
}
