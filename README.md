Web aplikacija za upravljanje popisom filmova omogućuje korisnicima pregled dostupnih filmova, dodavanje filmova na vlastiti popis za gledanje te planiranje budućih projekcija. 
Korisnici mogu označiti filmove kao pogledane, pregledavati sve filmove koje su unijeli u sustav te po potrebi ukloniti pojedine filmove sa svog popisa.
Na taj način aplikacija služi kao osobni alat za organizaciju i praćenje filmskog sadržaja koji korisnik želi pogledati ili je već pogledao.
<img width="891" height="734" alt="image" src="https://github.com/user-attachments/assets/f2b64915-0e46-40d3-ad25-970e085a114d" />


Kod za Docker:

## Pokretanje s Dockerom

```
docker build -t movieapp .
docker run -p 8080:80 movieapp
```

Browser na http://localhost:8080

