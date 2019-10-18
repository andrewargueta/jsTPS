'use strict'

/**
 *
 * @author McKillaGorilla
 */
class AndMask_Transaction {
        // THIS IS THE OBJECT IT WILL MANIPULATE
    constructor(initNum, initIntNum, initMask){
        this.num = initNum;
    
        this.initNum = initIntNum;
    
        // AMOUNT TO MASK FOR NUM
        this.mask = initMask;

    }
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    AndMask_Transaction(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.initNum = initIntNum;
        this.mask = initMask;
        this.doTransaction();
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.num.andMask(this.mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.num.setNum(this.initNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "And Mask " + this.mask;
    }
}