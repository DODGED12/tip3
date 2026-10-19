"use strict";

// Для каждого выражения: значение и тип результата.
// Для typeof (строки 9 и 10) тип результата — всегда string.

console.log('1.  "8" + 2           =', "8" + 2, "|", typeof ("8" + 2));
console.log('2.  "8" - 2           =', "8" - 2, "|", typeof ("8" - 2));
console.log('3.  Number("8") + 2   =', Number("8") + 2, "|", typeof (Number("8") + 2));
console.log('4.  "12" > "3"        =', "12" > "3", "|", typeof ("12" > "3"));
console.log('5.  12 === "12"       =', 12 === "12", "|", typeof (12 === "12"));
console.log('6.  Number("")        =', Number(""), "|", typeof Number(""));
console.log('7.  Number("text")    =', Number("text"), "|", typeof Number("text"));
console.log('8.  Boolean("false")  =', Boolean("false"), "|", typeof Boolean("false"));
console.log("9.  typeof null       =", typeof null, "|", typeof typeof null);
console.log("10. typeof NaN        =", typeof NaN, "|", typeof typeof NaN);

// Образец из методички (не входит в десять выражений)
const sample = Number("16") + 4;
console.log("Образец:", sample, "| тип:", typeof sample);
