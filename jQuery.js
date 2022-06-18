$(document).ready(function() {
    //wywołanie funkcji validationStar 
    $("#send").click(validationStart);

    $("#selectCountry").change(selectBankAcoundNumber);
    
    $("#blurBTN").click(hideAcountNumber);
});

// PL22105012431000002302310665
//LT313130010117393116

var acountNumber = $("#acount-Number").value;
var acountNumberPlaceholder = $("#acount-Number").placeholder;
var sumControl = $("#sum-control").value;
var helpText = $("#Help-text");
var sendBTN = $("#send");
// var blurAcountNumber = $("#blurBTN");

function hideAcountNumber(){
    var acountNumber = $("#acount-Number");
    $("#acount-Number").toggleClass("blur");

}


// $("#acount-Number").bind("paste", function(e){
//     var pastedData = e.originalEvent.clipboardData.getData('text');
//     // $("#acount-Number").val(pastedData);
//     var blure = $("#acount-Number").val(pastedData);
//     // blurAcountNumber.trigger("blur");

//     // zmienna przechwouje wszystkie liczby konta bankwiego bez ostatniej zamienianej na * 
//     var firstChars = pastedData.slice(0, -1);
//     console.log(firstChars);

//     // zmienna przechowóje ostatnią liczbę zamienianą na *
//     var lastChars = pastedData.slice(pastedData.length - 1);
//     // var stars = lastChars.addClass("blur");
//     $(lastChars).addClass("blur");

//     // zamiana na * ostatnią liczbę z numeru bankwoego
//     var stars = lastChars.replace(/[\S]/g, "*");
//     // var stars = (Array(lastChars.length + 1).join("*"));
//     // console.log(stars);

//     // dodanie pierwszej częci numeru bankowego z ostatnią zamienioną na *
//     var concat = firstChars + stars;
//     // var concat = firstChars + lastChars;
//     $(concat).addClass("blur");
//     console.log(concat);

//     // numer konta po zamianie na * wyjście
//     $("#acount-Number").val(concat);
//     // $("blure").val(blure);

//     e.preventDefault();

// } );

//funkcji validationStar 
function validationStart() {

    /* Input do wpisywania numeru konta z jego pobraniem */

    var acountNumber = $("#acount-Number").val();
    // Number.innerHTML = acountNumber.replace(/./g, "*");
    console.log(acountNumber);
    // console.log(Array (acountNumber.length + 1).join("*"));

    /* Input do wyświetlenia poprawności sumy kontrolnej */
    var sumControl = $("#sum-control");

    /* Miejsce wyświetlenia podpowiedzi z walidacji */
    var helpText = $("#Help-text");
    
    /** Input secect krajów konta do sprawdzenia **/
    var selectCountry = $("#selectCountry").val();
    // console.log(selectCountry);

    // zmienna przechowuje wartość kodu kraju (np. PL00) w danym obiekcie za pomocą indexu 
    var dataCountryShortCode = searchJson (countryCode, selectCountry, "countryShortCode");
    console.log(dataCountryShortCode);

    /** zmienna przechowuje wartość długości konta bankowego kraju w danym obiekcie za pomocą indexu **/
    var dataCountryCode = searchJson (countryCode,selectCountry, "lengthBankNumber");
    console.log(dataCountryCode);


     /*  Kod Walidacji    */
     if(acountNumber.length < dataCountryCode){
        helpText.addClass("error");
        helpText.html('podałeś za mało znaków. Konto powinno zawierać ' + dataCountryCode + ' znaki');
    }else if(acountNumber.length == dataCountryCode){
        helpText.addClass("good");
        helpText.html('podałeś poprawną ilośc znaków');
    }else if(acountNumber.length > dataCountryCode){
        helpText.addClass("error");
        helpText.html('podałeś więcej niż ' + dataCountryCode + ' znaki. Spraedź numer konta raz jeszcze');
    }else if(acountNumber.length == ""){
        helpText.addClass("error");
        helpText.html('nie wpisałeś nic w pole. Podaj numer Twojego konta bankowego');
    }else{
        helpText.addClass("error");
        helpText.html('coś poszło nie tak, sprawdź jaz jeszcze numer konta');
    }

    
    var countryShortCodeIbanChange = searchJson(countryCode, selectCountry, "countryShortCodeIbanChange");
    console.log(countryShortCodeIbanChange);


    // zamiana z Numeru na Text
    var acountNumberToString = acountNumber.toString();
    //   let acountNumberToString = "GB6904140455110266".toString();
      
    // pierwsze cztery znaki z konta IBAN np. PL00 
    let firtChars = acountNumberToString.substring(0, 2);
    console.log(firtChars);
      
    let midChars = acountNumberToString.substring(2, 4);
    console.log(midChars);
      
    let lastChars = acountNumberToString.substring(4, dataCountryCode);
    console.log(lastChars);
      
    let lastCharsSplitToHalf = lastChars.substring(0, 10);
    console.log(lastCharsSplitToHalf);
      
    let lastCharsSplitToHalfSecond = lastChars.substring(10, dataCountryCode);
    console.log(lastCharsSplitToHalfSecond);
            
    let t = searchJson (countryCode, firtChars, "countryShortCodeIbanChange");
        
    let stringToCheck = parseInt(lastCharsSplitToHalf);
    console.log(stringToCheck);
      
    let a = stringToCheck % 97;
    console.log(a);
      
    let stringToCheckTwo = parseInt(a + lastCharsSplitToHalfSecond);
    console.log(stringToCheckTwo);
      
    let b = stringToCheckTwo % 97;
    console.log(b);
      
    let stringToCheckThree = parseInt(b + t + midChars);
    console.log(stringToCheckThree);
      
    let c = stringToCheckThree % 97;
    console.log(c);
      
    if( c == 1 ){
        sumControl.addClass("good");  
        sumControl.val('Suma kontrolna konta jest poprawna');
    } else{
        sumControl.removeClass("good"); 
        sumControl.addClass("error");
        sumControl.val('Suma kontrolna konta jest niepoprawna');
    }    
};

function searchJson (json, key, propery){

    for( var i in json){  
        if( json[i].countryShortCode == key){
            return json[i][propery];
        }
    }

};

function loadSelectOptions(selectId, json, key, label){
    
    for( var i in json){        
      var opt = document.createElement("option");
      opt.value = json[i][key];
      opt.appendChild(document.createTextNode(json[i][label]));
      document.getElementById(selectId).appendChild(opt);      
    }
};

document.addEventListener('DOMContentLoaded',function(){
    loadSelectOptions('selectCountry',countryCode, 'countryShortCode', 'countryName' );

},false);




/** finkcja ktora odpala sie po kliknięciu/(wybraniu) kraju z input type select o Id selectCountry **/
function selectBankAcoundNumber() {
    
    /** Wartość wybranego kraju przez input typu select KRAJI PODAWANEGO KONTA BANKOWEGO **/

    var selectCountry = $("#selectCountry").val();
    console.log(selectCountry);
    
    /** zmienna przechowuje wartość nazwy kraju w danym obiekcie **/
    var dataCountryName = searchJson (countryCode, selectCountry, "countryName");
    console.log(dataCountryName);

    /** zmienna przechowuje wartość długości konta bankowego kraju w danym obiekcie za pomocą indexu **/
    var dataCountryCode = searchJson (countryCode, selectCountry, "lengthBankNumber");
    console.log(dataCountryCode);

    /** zmienna przechowuje wartość formatu konta bankowego (np. PLNN NNNN NNNN NNNN NNNN NNNN NNNN) danego kraju w danym obiekcie za pomocą indexu **/
    var dataCountryPlaceholder = searchJson (countryCode, selectCountry, "placeholderBankNumberFormat");
    console.log(dataCountryPlaceholder);

     /** POLE PODANIA KONTA BANKOWEGO (złapanie placeholdera) **/
    var acountNumberPlaceholder = $("#acount-Number").placeholder = dataCountryPlaceholder;
    // console.log(acountNumberPlaceholder);

};



  
