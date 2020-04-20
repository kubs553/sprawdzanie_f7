<?php
include "polacz.php";
if(isset($_POST['kategoria'])){
   $kategoria = $_POST['kategoria'];
   $zapytanie = "select count(*) as kat from kategorie where kategorie='".$kategoria."'";
   $wyjscie = mysqli_query($baza,$zapytanie);
   $wynik = "Możesz dodać taką kategorię";
   if(mysqli_num_rows($wyjscie)){
      $row = mysqli_fetch_array($wyjscie);
      $liczba_zajetych = $row['kat'];
      if($liczba_zajetych > 0){
          $wynik = "Kategoria jest zajęta";
      }
   }
   echo $wynik;
   die;
}