## Leírás

- Adott egy hotel étkeztetését kezelő alkalmazás.

## Megoldandó feladatok:

1. Egészítsd ki az alkalmazást, hogy az "Add to Menu" gombra kattintva a form értéke hozzáadódjon a lenti táblázathoz, majd ürítse ki az input mezőket

2. A táblázat sorai naponként összegezve tartalmazzák a vendégek nevét, akik aznap étkezést kapnak

   - Egy vendég minden napra kap reggelit, ebédet és vacsorát, amíg a hotelben tartózkodik

3. Implementáld az API integrációt tetszőleges technológiával:
   - A vendégek étkeztetésének listáját töltsd be a db.json-ből a JSON Server-t használva
   - Az "Add to Menu" gombra kattintva a form értéke mentődjön el a db.json-ben a JSON Server-t használva

Segítségként mellékeltünk képernyőképeket az elvárt működésről, amiket a screenshots mappában találsz

### JSON Server használata

#### Server indítása (a db.json fájlt használva)

npm run db
vagy
json-server --watch db.json --port 3001

#### API végpontok

Vendégek lekérése

GET http://localhost:3001/guests

Új vendég hozzáadása

POST http://localhost:3001/guests
Content-Type: application/json

{
"name": "Guest Name",
"startDate": "2023-11-01",
"endDate": "2023-11-03"
}

### Alkalmazás indítása

npm run dev


#### Eszrevetelek:
- json server nem UUID-t hasznal, az miatt inkonzisztencia alakulhat ki, hiszen a mar megkapott ket felhasznalonak UUID-ja, a generaltnak pedig short stringet general.