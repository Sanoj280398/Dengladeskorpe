# Rapport - Den Glade Skorpe

**Navn:** Jonas skou rasmussen  
**Hold:** HF2  
**Opgave:** Den Glade Skorpe - moderne pizzaria med online bestilling  
**Afleveringsdato:** 13-08-2026

## Login- og adgangsoplysninger

- Lokal server: `http://localhost:3042`
- Seed-bruger (admin): `admin@mediacollege.dk` / `admin`
- Seed-bruger (guest): `guest@mediacollege.dk` / `guest`
- JWT-auth: Slås til/fra via `USE_JWT` i `.env.local`

## 1. Vurdering af egen indsats og gennemførelse

Jeg har arbejdet struktureret med opgaven med fokus på at få en stabil backend og et API, der understøtter både kunde- og backoffice-flow. Min indsats har været at prioritere funktionalitet, validering og tydelige API-svar, så løsningen er nem at teste i Postman og robust i videre frontend-udvikling.

Det, der fungerede bedst i min proces:

- Opdeling i tydelige route/handler/model-lag.
- Hurtig iteration via seed-data og Postman.
- Løbende forbedring af CRUD-endpoints og datamodeller.

Det, jeg ville forbedre ved mere tid:

- Mere samlet testdækning (automatisk test af endpoints).
- Endnu strammere konsistens i fejlbeskeder på tværs af alle routes.
- Tættere kobling mellem frontend-krav og valideringsregler i API.

## 2. Argumentation for valgte løsninger

### Arkitektur

Jeg har valgt en klassisk Express + Mongoose arkitektur med lagdeling:

- **Routes** håndterer HTTP og validering af input.
- **Handlers** håndterer forretningslogik.
- **Models** styrer dataskemaer og validering i MongoDB.

Det giver bedre vedligeholdelse og gør det lettere at udvide med flere endpoints senere.

### Authentication

JWT er implementeret og kan aktiveres med `USE_JWT=true`. Denne løsning gør det muligt at beskytte write-endpoints i backoffice uden at låse udviklingen under opbygning af den åbne del af løsningen.

### Data- og filhåndtering

- Multer bruges til upload af billeder (retter, medarbejdere, kategorier).
- Seed-script opretter demo-data hurtigt og ensartet.
- Objekt-ID valideres i flere routes for at undgå unødige databasekald.

## 3. Redegørelse for kodeelementernes oprindelse

### Egen kode/tilpasning i projektet

- CRUD-routes for bl.a. dishes, employees, categories, ingredients, messages og orders.
- Datamodeller med felter som understøtter opgavekrav (fx `status` på messages og `shipped` på orders).
- Serveropsætning med statiske paths (`public`, `mcd-docs`, `sites/*`) og fallback-routing.

### Frameworks og biblioteker

- **Express** (API/server)
- **Mongoose** (databaseadgang og skemaer)
- **jsonwebtoken** (JWT)
- **bcrypt/bcryptjs** (hashing og login-validering)
- **multer** (filupload)

### Udleveret materiale

- Opgavetekst, designreference og materialer fra `mcd-docs/assignment` og relaterede mapper.
- Seed-koncept og grundstruktur fra projektets eksisterende setup.

## 4. Særlige punkter til bedømmelse

- Opgaven er løst med fokus på et udvidbart API, der matcher både obligatoriske krav og tilvalg på backend-siden.
- Følgende centrale API-flader er implementeret:
  - `GET /dishes`, `GET /dish/:id`, `POST/PUT/DELETE /dish`
  - `GET /employees`, `GET /employee/:id`, `POST/PUT/DELETE /employee`
  - `GET /messages`, `POST/PUT/DELETE /message`
  - `GET /orders`, `POST/PUT/DELETE /order`
  - `GET /categories`, `POST/PUT/DELETE /category`
  - `GET /ingredients`, `POST/PUT/DELETE /ingredient`
  - `POST /auth/signin`, `POST /auth/token`

## 5. Kravstatus (baseret på nuværende løsning)

### Obligatoriske krav

- Forside med alle retter og filtrering: **Delvist/afventer frontend i denne worktree**
- Detaljeside med størrelse og kurv (localStorage): **Delvist/afventer frontend i denne worktree**
- Personaleliste: **Understøttet via API (`/employees`)**
- Kontaktformular med serverafsendelse: **Understøttet via API (`POST /message`)**
- Kurvvisning: **Afventer frontend i denne worktree**
- Backoffice employees (POST/PUT/DELETE): **Implementeret**

### Tilvalg

- Backoffice messages med read/unread: **Implementeret (message `status` boolean + update)**
- Backoffice dishes (POST/PUT/DELETE): **Implementeret**
- Afgiv ordrer via server: **Implementeret (`POST /order`)**
- Authentication (sign in + JWT): **Implementeret**
- Ekstra ingredienser: **Understøttet i order-model (`extraIngredients`)**

## 6. Drift, build og aflevering

### Lokalt setup

1. `npm install`
2. Opret `.env.local`
3. `npm run "Opret Database"`
4. `npm run "Start Server"`

### Repo og aflevering

- Kode afleveres som Git repository inkl. README og denne rapport.
- Projektet kan demonstreres via lokal server + Postman collection.

## 7. Konklusion

Løsningen leverer en solid backend til Den Glade Skorpe med fokus på CRUD, auth, validering og seedbar data. Backoffice-funktioner og centrale API-endpoints er på plads, og løsningen er klargjort til videre eller afsluttende frontend-integration.

---

## Bilag (valgfrit)

- Link til projektstyring (Trello/SCRUM): [Indsæt link]
- Link til repository: [Indsæt link]
- Evt. produktions-URL: [Indsæt link]
