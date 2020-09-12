/********************************/
/*  Calculator User Interface   */
/********************************/

var n, iy, pv, fv, pmt, eff, cy, nom;
var el_n, el_iy, el_pv, el_fv, el_pmt, el_eff, el_cy, el_nom;
var decimal = 2;

function onLoad () {
    n = iy = pv = fv = pmt = 0;

    el_n  = document.getElementById("n");
    el_iy = document.getElementById("iy");
    el_pv = document.getElementById("pv");
    el_fv = document.getElementById("fv");
    el_pmt = document.getElementById("pmt");

    el_eff = document.getElementById("eff");
    el_cy  = document.getElementById("cy");
    el_nom = document.getElementById("nom");

    el_n.value  = 0;
    el_iy.value = 0;
    el_pv.value = 0;
    el_fv.value = 0;
    el_pmt.value = 0;

    el_eff.value = 0;
    el_cy.value  = 1;
    el_nom.value = 0;
}

function get_values () {
    n   = parseFloat(el_n.value)      || 0;
    iy  = parseFloat(el_iy.value)/100 || 0;
    pv  = parseFloat(el_pv.value)     || 0;
    fv  = parseFloat(el_fv.value)     || 0;
    pmt = parseFloat(el_pmt.value)    || 0;

    eff = parseFloat(el_eff.value)    || 0;
    cy  = parseFloat(el_cy.value)     || 1;
    nom = parseFloat(el_nom.value)    || 0;
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


function on_eff () {
    get_values();

    eff = calc_eff(cy, nom/100) * 100;
    el_eff.value = fixed_decimal(eff);
}

function on_nom () {
    get_values();

    nom = calc_nom(eff/100, cy) * 100;
    el_nom.value = fixed_decimal(nom);
}

onLoad();