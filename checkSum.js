let acountNumber = document.querySelector("#acount-Number");
let acountNumberPlaceholder = document.querySelector("#acount-Number").placeholder;
let sumControl = document.querySelector("#sum-control").value;
let helpText = document.querySelector("#Help-text");
const sendBTN = document.querySelector("#send");


$("#acount-Number").bind("paste", function(e){
    var pastedData = e.originalEvent.clipboardData.getData('text');
    alert("Numer konta został wklejona a nie wpisany");
} );


// PL22105012431000002302310665
//LT313130010117393116

sendBTN.addEventListener("click", validationStart);

/** finkcja validacji która po kliknięciu przycisku 'Sprawdź poprawność wpisanego numeru bankowego' **/
function validationStart() {

    /* Input do wpisywania numeru konta z jego pobraniem */
    let acountNumber = document.querySelector("#acount-Number").value;
    console.log(acountNumber);
    console.log(Array (acountNumber).join("*"));

    /* Input do wyświetlenia poprawności sumy kontrolnej */
    let sumControl = document.querySelector("#sum-control");

    /* Miejsce wyświetlenia podpowiedzi z walidacji */
    let helpText = document.querySelector("#Help-text"); 

    /** Input secect krajów konta do sprawdzenia **/
    let selectCountry = document.querySelector("#selectCountry").value;
    // console.log(selectCountry);

    // zmienna przechowuje wartość kodu kraju (np. PL00) w danym obiekcie za pomocą indexu 
    let dataCountryShortCode = searchJson (countryCode, selectCountry, "countryShortCode");
    console.log(dataCountryShortCode);

    /** zmienna przechowuje wartość długości konta bankowego kraju w danym obiekcie za pomocą indexu **/
    let dataCountryCode = searchJson (countryCode,selectCountry, "lengthBankNumber");
    console.log(dataCountryCode);
   

    /*  Kod Walidacji    */
    if(acountNumber.length < dataCountryCode){
        helpText.className = "error";
        helpText.innerHTML = "podałeś za mało znaków... Konto powinno zawierać " + dataCountryCode + " znaki";
    }else if(acountNumber.length == dataCountryCode){
        helpText.className = "good";
        helpText.innerHTML = "podałeś poprawną ilośc znaków";
    }else if(acountNumber.length > dataCountryCode){
        helpText.className = "error";
        helpText.innerHTML = "podałeś więcej niż " + dataCountryCode + " znaki. Spraedź numer konta raz jeszcze";
    }else if(acountNumber.length === " "){
        helpText.className = "error";
        helpText.innerHTML = "nie wpisałeś nic w pole, Podaj numer Twojego konta bankowego";
    }else{
        helpText.className = "error";
        helpText.innerHTML = "coś poszło nie tak, sprawdź jaz jeszcze numer konta";
    }

    let countryShortCodeIbanChange = searchJson(countryCode, selectCountry, "countryShortCodeIbanChange");
    console.log(countryShortCodeIbanChange);

      // zamiana z Numeru na Text
      let acountNumberToString = acountNumber.toString();
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
        sumControl.classList.add("good");  
        sumControl.value = "Suma kontrolna konta jest poprawna";
      } else{
        sumControl.classList.remove("good"); 
        sumControl.classList.add("error");
        sumControl.value = "Suma kontrolna konta jest niepoprawna";
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
    let selectCountry = document.querySelector("#selectCountry").value;
    
    /** zmienna przechowuje wartość nazwy kraju w danym obiekcie **/
    let dataCountryName = searchJson (countryCode, selectCountry, "countryName");
    console.log(dataCountryName);

    /** zmienna przechowuje wartość długości konta bankowego kraju w danym obiekcie za pomocą indexu **/
    let dataCountryCode = searchJson (countryCode, selectCountry, "lengthBankNumber");
    console.log(dataCountryCode);

    /** zmienna przechowuje wartość formatu konta bankowego (np. PLNN NNNN NNNN NNNN NNNN NNNN NNNN) danego kraju w danym obiekcie za pomocą indexu **/
    let dataCountryPlaceholder = searchJson (countryCode, selectCountry, "placeholderBankNumberFormat");
    console.log(dataCountryPlaceholder);

     /** POLE PODANIA KONTA BANKOWEGO (złapanie placeholdera) **/
    let acountNumberPlaceholder = document.querySelector("#acount-Number").placeholder = dataCountryPlaceholder;
    // console.log(acountNumberPlaceholder);


};

/* addEventListener select do selectBankAcoundNumber (select z krajami) */
selectCountry.addEventListener("change", selectBankAcoundNumber);

/* Logika 
Psrawdzanie cyfry kontrolnej konta IBAN
Weryfikacja składa się z następujących kroków:
krok wstępny : usuń niealfanumeryczne znaki - np. spacje, myślniki itd.
krok 1 : przesuń 4 pierwsze znaki na koniec,
krok 2 : zamień litery na dwucyfrowe liczby; A=10, B=11, ... Y=34, Z=35
krok 3 : podziel całkowicie liczbę powstałą w kroku 2 przez 97,
krok 4 : jeśli reszta z dzielenia wyniosła 1 to numer IBAN jest prawidłowy.

*/

 