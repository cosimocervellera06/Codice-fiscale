function calcCodFiscale() {
  //prelevo nome e cognome
  let nome = document.getElementById("nome").value;
  let cognome = document.getElementById("cognome").value;
  //dichiaro il codice fiscale
  let codiceFiscale = "";
  //separo le vocali dalle consonanti
  let vocali = ["a", "e", "i", "o", "u"];
  nome = nome.toLowerCase();
  cognome = cognome.toLowerCase();
  let consonantiCogn = "";
  let consonantiNome = "";
  let vocaliCogn = "";
  let vocaliNome = "";

  //separo vocali e consonanti del nome
  for (let i = 0; i < nome.length; i++) {
    if (vocali.includes(nome[i])) {
      vocaliNome += nome[i];
    }
    else {
      consonantiNome += nome[i];
    }
  }

  //separo vocali e consonanti del cognome
  for (let i = 0; i < cognome.length; i++) {
    if (vocali.includes(cognome[i])) {
      vocaliCogn += cognome[i];
    }
    else {
      consonantiCogn += cognome[i];
    }
  }

  //aggiungo le prime consonanti del cognome (non più di 3)
  for (let i = 0; i < consonantiCogn.length; i++) {
    if (i < 3) {
      codiceFiscale += consonantiCogn[i];
    }
  }

  //se le consonanti sono meno di 3 aggiungo le prime vocali del cognome
  for (let i = 0; i < vocaliCogn.length; i++) {
    if (i < 3 && codiceFiscale.length < 3) {
      codiceFiscale += vocaliCogn[i];
    }
  }

  //se non bastano neanche le vocali riempo con delle X
  if (codiceFiscale.length < 3) {
    for (let i = codiceFiscale.length; i < 3; i++) {
      codiceFiscale += "x";
    }
  }

  //se le consonanti del nome sono almeno 4 aggiungo la prima, terza e quarta consonante del nome
  if (consonantiNome.length >= 4) {
    codiceFiscale += consonantiNome[0];
    codiceFiscale += consonantiNome[2];
    codiceFiscale += consonantiNome[3];
  } //altrimenti aggiungo le prime 3 consonanti del nome
  else {
    for (let i = 0; i < consonantiNome.length; i++) {
      if (i < 3) {
        codiceFiscale += consonantiNome[i];
      }
    }
    //se le consonanti del nome non bastano aggiungo le vocali
    for (let i = 0; i < vocaliNome.length; i++) {
      if (i < 3 && codiceFiscale.length < 6) {
        codiceFiscale += vocaliNome[i];
      }
    }
  }
  //se non bastano neanche le vocali del nome aggiungo delle X
  if (codiceFiscale.length < 6) {
    for (let i = codiceFiscale.length; i < 6; i++) {
      codiceFiscale += "x";
    }
  }

  //prelevo la data
  let data = document.getElementById("data").value;

  //prelevo il sesso
  let sessoM = document.getElementById("maschio");
  let sessoF = document.getElementById("femmina");
  let sesso;
  if (sessoM.checked)
    sesso = "M";
  else if (sessoF.checked)
    sesso = "F";

  //anno di nascita
  codiceFiscale += data[2] + data[3];

  //mese di nascita
  let mesi = ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"];
  let mese = parseInt(data[5]) * 10 + parseInt(data[6]);
  codiceFiscale += mesi[mese - 1];

  //giorno di nascita
  let giorno = parseInt(data[8]) * 10 + parseInt(data[9]);
  if (sesso == "F")
    giorno += 40;
  codiceFiscale += giorno;

  //codice comune di nascita
  codiceFiscale += document.getElementById("comuni").value;

  //carattere di controllo
  let charDispari = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
    'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
    'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
    'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
  };

  let charPari = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8,
    'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17,
    'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
  };

  let alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  
  let somma = 0;
  for (let i = 0; i < codiceFiscale.length; i++) {
    if (i % 2 == 0) {
      somma += charDispari[codiceFiscale[i].toUpperCase()];
    } else {
      somma += charPari[codiceFiscale[i].toUpperCase()];
    }
  }

  codiceFiscale += alfabeto[somma % 26];
  
  document.getElementById("codice-fiscale").textContent = codiceFiscale.toUpperCase();

}

function controllaInputPieni() {
  let nome = document.getElementById("nome").value;
  let cognome = document.getElementById("cognome").value;
  let data = document.getElementById("data").value;
  let sessoM = document.getElementById("maschio");
  let sessoF = document.getElementById("femmina");
  let comuni = document.getElementById("comuni").value;
  if (nome.length == 0 || cognome.length == 0 || data.length != 10 || sessoM.checked == false && sessoF.checked == false || comuni.length == 0)
    return false;
  return true;
}

function allowCalc(){
  document.getElementById("calc-button").disabled = !controllaInputPieni();
  document.getElementById("codice-fiscale").textContent = "Inserisci tutti i dati per calcolare";
}
