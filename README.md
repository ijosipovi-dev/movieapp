Web aplikacija za upravljanje popisom filmova omogućuje korisnicima pregled dostupnih filmova, dodavanje filmova na vlastiti popis za gledanje te planiranje budućih projekcija. 
Korisnici mogu označiti filmove kao pogledane, pregledavati sve filmove koje su unijeli u sustav te po potrebi ukloniti pojedine filmove sa svog popisa.
Na taj način aplikacija služi kao osobni alat za organizaciju i praćenje filmskog sadržaja koji korisnik želi pogledati ili je već pogledao.
<img width="753" height="728" alt="Snimka zaslona 2026-06-09 213744" src="https://github.com/user-attachments/assets/92c673c5-e25f-4fe9-aaca-836e3baf867a" />

Kod za Docker:

## Pokretanje s Dockerom

```
docker build -t movieapp .
docker run -p 8080:80 movieapp
```

Browser na http://localhost:8080

