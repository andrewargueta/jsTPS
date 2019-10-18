
/**
 * jTPS_Unit_Tests.java
 * 
 * This file provides a test bed for the jTPS framework.
 * 
 * @author McKilla Gorilla
 * @version 2.0
 */
class jTPS_Unit_Tests {
    /**
     * This JUnit test is for testing the adding of transactions.
     */
    testAdd() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let error = "assert failed"
        let tps = new jTPS();
        let num = new Num();
        console.assert(0 === num.getNum(), error);
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        console.assert(5 === num.getNum(), error);
        console.assert(1 === tps.getSize(), error);
        console.assert(0 === tps.getRedoSize(), error);
        console.assert(1 === tps.getUndoSize(), error);
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        console.assert(15 === num.getNum(), error);
        console.assert(2 === tps.getSize(), error);
        console.assert(0 === tps.getRedoSize(), error);
        console.assert(2 === tps.getUndoSize(), error);
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        console.assert(35 === num.getNum(), error);
        console.assert(3 === tps.getSize(), error);
        console.assert(0 === tps.getRedoSize(), error);
        console.assert(3 === tps.getUndoSize(), error);
    }
    
    /**
     * 
     */
    testAndMask() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        console.assert(0 === num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        console.assert(4 === num.getNum());
        console.assert(2 === tps.getSize());
        
        tps.undoTransaction();
        console.assert(12 === num.getNum());
        console.assert(2 === tps.getSize());
        console.assert(1 === tps.getRedoSize());
        console.assert(1 === tps.getUndoSize());

    }
    
    testOrMask() {
        let tps = new jTPS();
        let num = new Num();
        console.assert(0 === num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 4));
        tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 15));
        console.assert(15 === num.getNum());
        console.assert(2 === tps.getSize());
        
        tps.undoTransaction();
        console.assert(4 === num.getNum());
        console.assert(2 === tps.getSize());
        console.assert(1 === tps.getRedoSize());
        console.assert(1 === tps.getUndoSize());
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    testUndo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        let error = "FAILED";
        console.assert(num.getNum() ===  0, error);
        console.assert(tps.hasTransactionToUndo() === false, error);
        console.assert(tps.hasTransactionToRedo() === false, error);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        console.assert(true === tps.hasTransactionToUndo(), error);
        console.assert(tps.hasTransactionToRedo() === false, error);
        console.assert(35 === num.getNum(), error);
        console.assert(true === tps.hasTransactionToUndo(), error);
        console.assert(3 === tps.getSize(), error);
        console.assert(0 === tps.getRedoSize(), error);
        console.assert(3 === tps.getUndoSize(), error);
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        console.assert(true === tps.hasTransactionToUndo(), error);
        console.assert(true === tps.hasTransactionToRedo(), error);
        console.assert(15 === num.getNum(), error);
        console.assert(3 === tps.getSize(), error);
        console.assert(1 === tps.getRedoSize(), error);
        console.assert(2 === tps.getUndoSize(), error);
        
        // UNDO ANOTHER
        tps.undoTransaction();
        console.assert(true === tps.hasTransactionToUndo(), error);
        console.assert(true === tps.hasTransactionToRedo(), error);
        console.assert(5 === num.getNum(), error);
        console.assert(3 === tps.getSize(), error);
        console.assert(2 === tps.getRedoSize(), error);
        console.assert(1 === tps.getUndoSize(), error);
        
        // AND ANOTHER
        tps.undoTransaction();
        console.assert(tps.hasTransactionToUndo() === false, error);
        console.assert(true === tps.hasTransactionToRedo(), error);
        console.assert(0 === num.getNum(), error);
        console.assert(3 === tps.getSize(), error);
        console.assert(3 === tps.getRedoSize(), error);
        console.assert(0 === tps.getUndoSize(), error);
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        console.assert(tps.hasTransactionToUndo() === false), error;
        console.assert(true === tps.hasTransactionToRedo(), error);
        console.assert(0 === num.getNum(), error);
        console.assert(3 === tps.getSize(), error);
        console.assert(3 === tps.getRedoSize(), error);
        console.assert(0 === tps.getUndoSize(), error);
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    testRedo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        console.assert(num.getNum() === 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        console.assert(tps.hasTransactionToUndo() === true);
        console.assert(tps.hasTransactionToRedo() === false);
        console.assert(35 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(3 === tps.getUndoSize());
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        console.assert(tps.hasTransactionToUndo() === true);
        console.assert(tps.hasTransactionToRedo() === false);
        console.assert(35 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(3 === tps.getUndoSize());
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        console.assert(tps.hasTransactionToUndo() === true);
        console.assert(tps.hasTransactionToRedo() === false);
        console.assert(35 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(3 === tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        console.assert(tps.hasTransactionToUndo() === true);
        console.assert(tps.hasTransactionToRedo() === false);
        console.assert(35 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(3 === tps.getUndoSize());
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        console.assert(tps.hasTransactionToUndo() === true);
        console.assert(tps.hasTransactionToRedo() === true);
        console.assert(15 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(1 === tps.getRedoSize());
        console.assert(2 === tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        console.assert(tps.hasTransactionToUndo() === true);
        console.assert(tps.hasTransactionToRedo() === false);
        console.assert(35 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(3 === tps.getUndoSize());
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    testClear() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        console.assert(num.getNum() === 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        console.assert(35 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(3 === tps.getUndoSize());
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        console.assert(35 === num.getNum());
        console.assert(0 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(0 === tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        console.assert(70 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(3 === tps.getUndoSize());
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        console.assert(70 === num.getNum());
        console.assert(0 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(0 === tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        console.assert(105 === num.getNum());
        console.assert(3 === tps.getSize());
        console.assert(0 === tps.getRedoSize());
        console.assert(3 === tps.getUndoSize());
    }
}