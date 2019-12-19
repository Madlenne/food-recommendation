### Niniejsza aplikacja została napisana z wykorzystaniem następujących technologii:
* Backend:
  - grafowa baza danych Neo4j
  - grafowy język zapytań Cypher
  - środowisko uruchomieniowe Node.js
  
* Frontend:
  -  silnik szablonów Pug


Aplikacja umożliwia zgrupowanie potraw w jednym miejscu. Znajdujący się u góry strony formularz pozwala na wprowadzenie do bazy danych takich jak:
  - nazwa dania,
  - jego pochodzenie (wybrane z rozwijanej listy)
  - informacja, czy potrawa jest warta polecenia
  
 Zatwierdzenie danych odbywa się za pomocą przycisku 'Create dish'.
 
 W środkowej części strony znajduje się tabelka przedstawiająca wszystkie potrawy, jakie użytkownik wprowadził za pomocą interfejsu aplikacji.
 
 Ostatnią funkcjonalnością aplikacji jest możliwości usunięcia wszystkich zapisanych rekomendacji.
 
 Węzłami w aplikacji są: nazwa dania wraz z oceną czy warto go zarekomendować oraz pochodzenie potrawy. Oba te węzły są połączone relacją COMES_FROM. Jak nazwa wskazuje, łączy ona określone danie z państwem, z którego się wywodzi.

Link do aplikacji: https://tranquil-falls-45883.herokuapp.com/
