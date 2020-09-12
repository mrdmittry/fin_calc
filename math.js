/************************/
/*     Mathematics      */
/************************/

var ln = Math.log;
var abs = Math.abs;
var pow = Math.pow;
var i_err = "Error";


/**********************/
/*     TVM part      */
/**********************/

function calc_present_value (fv, pmt, i, n) {
    var pv = 0;
    if (fv != 0) {
        pv = fv / pow(1 + i, n);
    }
    if (pmt != 0) {
        pv += pmt * (1 - pow(1 + i, -n)) / i;
    }
    return -pv;
}
function calc_future_value (pv, pmt, i, n) {
    var fv = 0;
    if (pv != 0)  {
        fv = pv * pow(1 + i, n);
    }
    if (pmt != 0) {
        fv += pmt * ((pow(1 + i, n) - 1) / i);
    }
    return -fv;
}
function calc_interest (pv, fv, pmt, n) {
    var i = 0;
    if (pmt == 0) {
        fv = abs(fv);
        pv = abs(pv);
        i = pow(fv/pv, 1/n) - 1; 
    } else {
        // Requires differential equasions
        i = i_err;
    }
    return i;
}
function calc_periods (pv, fv, pmt, i) {
    var n = 0;    
    if (pmt == 0) {
        n = ln(-fv/pv) / ln(1+i);
    } else {
        pmt = -pmt;
        if (pv != 0 && fv == 0) {
            n = -ln(1 - pv * i / pmt) / ln(1 + i);
        } else if (pv == 0 && fv != 0) {
            n = ln(1 + fv * i / pmt) / ln(1 + i);
        } else /* if pmt, fv and pv are all != 0 */ {        
            pv = abs(pv);
            fv = abs(fv);
            pmt = abs(pmt);
            n = (ln(fv + pmt / i) - ln(pv + pmt / i)) / ln(1 + i);
        }
    }
    return n;
}
function calc_payment (pv, fv, i, n) {
    var pmt = 0;
    /*
    if (pv != 0 && fv != 0) {
        pmt = (pv * pow(1+i, n) + fv) * i / (1 - pow(1+i,n));
    } else if {} else if {}
    */
    if (pv != 0) {
        pmt = (pv * i) / (1 - pow(1+i, -n));
    }
    if (fv != 0) {
        pmt += (fv * i) / (pow(1+i, n) - 1);
    }
    return -pmt;
}

/**********************/
/*     EAR part      */
/**********************/

function calc_eff (cy, nom) {    
    return pow(1 + nom/cy, cy) - 1;
}
function calc_nom (eff, cy) {
    return (pow(eff + 1, 1/cy) - 1) * cy;
}