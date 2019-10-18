var tps = new jTPS();
let num = new Num();

    window.onload = function () {
        let userInput = document.getElementById('user_input');
        window.jTPS_Unit_Tests = new jTPS_Unit_Tests();
        window.jTPS_Unit_Tests.testAdd();
        window.jTPS_Unit_Tests.testAndMask();
        window.jTPS_Unit_Tests.testOrMask();
        window.jTPS_Unit_Tests.testUndo();
        window.jTPS_Unit_Tests.testRedo();
        window.jTPS_Unit_Tests.testClear();
            userInput.addEventListener("keyup", function(){
            if(userInput.value === "1"){
                let amount = Number(1);
                let transaction = new AddToNum_Transaction(num, amount);
                tps.addTransaction(transaction);
                document.getElementById('current_jstps').innerHTML = tps.toString();
                document.getElementById('num_div').innerHTML = "Num: " + num.getNum();

            }
            if(userInput.value === "2"){
                tps.undoTransaction();
                console.log(tps.toString());
                document.getElementById('current_jstps').innerHTML = tps.toString();
                document.getElementById('num_div').innerHTML = "Num: " + num.getNum();
            }
            if(userInput.value === "3"){
                tps.doTransaction();
                document.getElementById('current_jstps').innerHTML = tps.toString();
                document.getElementById('num_div').innerHTML = "Num: " + num.getNum();
            }
            if(userInput.value === "4"){
                tps.clearAllTransactions();
                document.getElementById('current_jstps').innerHTML = tps.toString();
                document.getElementById('num_div').innerHTML = "Num: " + num.getNum();
            }
            if(userInput.value === "5"){
                num = new Num();
                tps = new jTPS() ;
                document.getElementById('current_jstps').innerHTML = tps.toString();
                document.getElementById('num_div').innerHTML = "Num: " + num.getNum();
            }

    })
}

