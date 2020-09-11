/********************************/
/*  Calculator User Interface   */
/********************************/

var n, iy, pv, fv, pmt;
var el_n, el_iy, el_pv, el_fv, el_pmt;
var decimal = 2;

function onLoad () {
    n = iy = pv = fv = pmt = 0;

    el_n = document.getElementById("n");
    el_iy = document.getElementById("iy");
    el_pv = document.getElementById("pv");
    el_fv = document.getElementById("fv");
    el_pmt = document.getElementById("pmt");

    el_n.value = 0;
    el_iy.value = 0;
    el_pv.value = 0;
    el_fv.value = 0;
    el_pmt.value = 0;
}

function get_values () {
    n   = parseFloat(el_n.value)      || 0;
    iy  = parseFloat(el_iy.value)/100 || 0;
    pv  = parseFloat(el_pv.value)     || 0;
    fv  = parseFloat(el_fv.value)     || 0;
    pmt = parseFloat(el_pmt.value)    || 0;
}

function fixed_decimal (value) {
    return value.toFixed(decimal);
}

function on_n () {
    get_values();

    n = calc_periods(pv, fv, pmt, iy);
    el_n.value = fixed_decimal(n);
}

function on_iy () {
    get_values();

    iy = calc_interest(pv, fv, pmt, n);
    if (iy != i_err) {
        iy = fixed_decimal(iy * 100);
    }
    el_iy.value = iy;
}

function on_pv () {
    get_values();

    pv = calc_present_value(fv, pmt, iy, n);
    el_pv.value = fixed_decimal(pv);
}

function on_pmt () {
    get_values();

    pmt = calc_payment(pv, fv, iy, n);
    el_pmt.value = fixed_decimal(pmt);
}

function on_fv () {
    get_values();

    fv = calc_future_value(pv, pmt, iy, n);
    el_fv.value = fixed_decimal(fv);
}

onLoad();