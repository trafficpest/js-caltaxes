//DE44 Method B table 1
function pit_low_income_exempt(gross, status, allowances) {
    var exempt_amount;
    
    if (status == 'Head of Household' || status == 'Married' && 
    allowances >= 2){
        exempt_amount = 1224;
    }
    else{
        exempt_amount = 612;
    }
    if (gross <= exempt_amount){
        return true;
    }
    return false;
}

//DE44 Method B table 2 
function pit_est_deduction(add_allowances) {
    var deduction_amt = Math.round(add_allowances*1000/26);
    return deduction_amt;
}

//DE44 Method B table 3
function pit_std_deduction(status, allowances) {
    var deduction_amount;
    
    if (status == 'Head of Household' || status == 'Married' && 
    allowances >= 2){
        deduction_amount = 369;
    }
    else{
        deduction_amount = 185;
    }
    return deduction_amount;
}

//DE44 Method B table 4
function exemption_allowance(allowances) {
    const annualAllowance = 141.90;
    let exemptAmount = Math.round(annualAllowance*100*allowances/26)/100;
    return exemptAmount;
}

//DE44 Method B table 5
function calc_pit(taxable_income, status){
    let table =[];
    
    if (status == 'Married'){
        
    // Biweekly Married    
        table = [
            [0,716,.011,0],
            [716,1700,.022,7.88],
            [1700,2684,.044,29.53],
            [2684,3724,.066,72.83],
            [3724,4708,.088,141.47],
            [4708,24052,.1023,228.06],
            [24052,28864,.1133,2206.95],
            [28864,38462,.1243,2752.15],
            [38462,48106,.1353,3945.18],
            [48106,10000000,.1463,5250.01]
            ];
    } else if (status == 'Head of Household'){
    
        // Biweekly Head of Household
        table = [
            [0,718,.011,0],
            [718,1700,.022,7.90],
            [1700,2192,.044,29.50],
            [2192,2714,.066,51.15],
            [2714,3204,.088,85.60],
            [3204,16356,.1023,128.72],
            [16356,19628,.1133,1474.17],
            [19628,32712,.1243,1844.89],
            [32712,38462,.1353,3471.23],
            [38462,10000000,.1463,4249.21]
            ];
    } else {
        
    //SINGLE PERSONS, DUAL INCOME MARRIED     
        table = [
            [0,358,.011,0],
            [358,850,.022,3.94],
            [850,1342,.044,14.76],
            [1342,1862,.066,36.41],
            [1862,2354,.088,70.73],
            [2354,12026,.1023,114.03],
            [12026,14432,.1133,1103.48],
            [14432,24052,.1243,1376.08],
            [24052,38462,.1353,2571.85],
            [38462,10000000,.1463,4521.52]
            ]; 
    }
    
    let pit = 0;
    table.forEach(function (item) {
      if (taxable_income >= item[0] &&
      taxable_income <= item[1]){
        pit = (Math.round((taxable_income*100-item[0]*100)*item[2]) + 
        item[3]*100)/100;
      } 
    });
    return pit;
}

function calc_pit_tax(gross, status, allowances, add_allowances){
    let tax_exempt = pit_low_income_exempt(gross, status, allowances);
    if (tax_exempt === true){
        return 0;
    }
    let pitestdeduction = pit_est_deduction(add_allowances);

    let pitstddeduction = pit_std_deduction(status, allowances);

    let taxable_income = (gross*100 - pitestdeduction*100
        - pitstddeduction*100)/100;

    let pit = calc_pit(taxable_income, status);

    let exemptAllowance = exemption_allowance(allowances);

    let taxWitholding = (pit*100 - exemptAllowance*100)/100;
    
    /* Debuging */
    //console.log(pitestdeduction);
    //console.log(pitstddeduction);
    //console.log(taxable_income);
    //console.log(pit);
    //console.log(exemptAllowance);
    //console.log(taxWitholding);
    
    return taxWitholding;
    
}
