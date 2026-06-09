Co bym zmienił:
- na pewno dodać zabezpieczenie przed CSRF bo aktualnie nie ma
- dodałbym jakieś fajne wypisywanie np. Żeby było jakoś nazwa bitwy:..... rok bitwy:...…  opis bitwy:...… bo aktualnie po prostu wyświetla dane i też bym wywalił to że wyświetla się id bitwy na stronie
- ogólnie dodać style żeby jakoś bardziej zachęcająco to wyglądało bo obecnie jest bardzo surowe
- dodać jakiś spis bitew bo aktualnie widzisz tylko 3 najnowsze a jak nie znasz nazwy lub nazwa jest źle wpisana to nawet nie sprawdzisz wyszukiwarką czy jest a tak to na liście na pewno znajdziesz
- można dodać żeby użytkownik nie mógł dodawać duplikatów
- dodałbym jakiś panel użytkownika w którym zalogowana osoba widzi wszystkie swoje wpisy. Tu ten sam problem co z tymi 3 najnowszymi dodanymi czyli jak np. użytkownik zapomni jaką bitwę dodał a następnie przybędą nowe wpisy to później nie będzie w stanie w żaden sposób znaleźć lub wyszukać bitwy a co dopiero ją edytować lub usunąć
- aktualnie akceptowanie cookies trochę dziwnie działa bo mimo że odrzuciłem to wciąż zapisuje mi takie rzeczy jak motyw strony lub zalogowane konto mimo że zamknąłem przeglądarkę i otworzyłem stronę na nowo. I ogólnie jak zamykam przeglądarkę i znowu ją odpalam i wchodzą na stronę to zawsze prosi o tą zgode na cookies obojętnie czy wcześniej akceptowałem je czy odrzuciłem
- dodałbym że podział na admina i użytkownika ma jakiś sens bo aktualnie każdy użytkownik może edytować i usuwać wpisy innych użytkowników tak samo jak admin. Oczywiście jak to encyklopedia to każdy może dodać coś od siebie ale wystarczy że przyjdzie jeden troll i zacznie wszystko usuwać i wtedy będzie słabo więc nie wiem czy dobre jest dawać taką władze zwykłemu użytkownikowi a nie tylko adminowi
- zrobienie strony zarządzania cookies, polityki prywatności/cookies ale to widziałem że masz w todo
- dodać relacje w bazie między user_id w session a user_id w users
- może lekko lepiej rozpisać readme bo robie na Windowsie bez maszyny wirtualnej i np. ten chmod mi kompletnie nie działa tak samo miałem problem z tym generate env. W sensie finalnie nie było to ciężkie do ogarnięcia ale dla kogoś co mniej ogarnia można po prostu rozpisać że co robić dla windowsa a co dla linuxa oraz po prostu dać jakiś opis projektu że na czym polega itp. itd.
- kod i reszta wydaje się być spoko tylko poprawić małe rzeczy dodać style i będzie kozak


- npm run dev nie zadziałało, w index.js trzeba było zmienić kolejność importowania battles.js i user.js
- w pliku .env nie pojawiał się PEPPER więc aplikacja się nie włączała
- nie mogłem zalogować się na konto admin ani student (pokazywało że podano błędne dane)
- wygląd i UX mogło być bardziej dopracowane (bardzo mało css jest)
- zmiana motywu usuwa wszystkie wprowadzone dane do logowania i dodawania bitew

+ wyszukiwanie bitew działa dobrze
+ cookies nie pojawiają się po akceptacji
+ argon2 jest dobrym rozwiązaniem do szyfru haseł
+ kod jest czytelny i zrozumiały