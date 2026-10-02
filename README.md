# Weather Forecast App

Aplikace umožňuje uživateli vyhledat obec pomocí našeptávače a zobrazit předpověď počasí na následujících 5 dní. Data o počasí jsou získávána prostřednictvím OpenWeather API.

## Přehled funkcí

- Předpověď počasí na 5 dní
- Vyhledávání obce pomocí našeptávače
- Ovládání našeptávače pomocí klávesnice (šipky, Enter, Escape)
- Zjištění aktuální polohy pomocí geolokace prohlížeče
- Rozdělení předpovědi podle částí dne:
  - Nyní
  - Ráno
  - Den
  - Večer
  - Noc
- Aktuální a pocitová teplota
- Popis počasí a ikona (ikony jsou získávány z OpenWeather)
- Rychlost větru
- Vlhkost
- Atmosférický tlak
- Formátování data podle jazyka nastaveného v prohlížeči (čeština pro `cs`, angličtina pro ostatní jazyky)
- Responzivní zobrazení pro desktop, tablet a mobilní zařízení
- Zobrazení stavu načítání a chybových stavů

## Použité technologie

- React
- JavaScript (ES6+)
- HTML5
- CSS3 / Sass (SCSS)
- Axios
- Vite
- OpenWeather API

## Instalace

Naklonujte repozitář:

```bash
git clone https://github.com/VertiaevBogdan/WeatherForecastForTescoSW.git
```

Přejděte do adresáře projektu:

```bash
cd WeatherForecastForTescoSW
```

Nainstalujte závislosti:

```bash
npm install
```

## Proměnné prostředí

Aplikace vyžaduje API klíč služby OpenWeather.

V kořenovém adresáři projektu vytvořte soubor `.env`:

```env
VITE_OPENWEATHER_API_KEY=your_api_key
```

API klíč lze získat po registraci ve službě OpenWeather.

Soubor `.env` není součástí repozitáře.

## Spuštění aplikace

Vývojový server spustíte příkazem:

```bash
npm run dev
```

Vite následně zobrazí lokální adresu aplikace v terminálu.

## Kontrola kódu pomocí linteru

```bash
npm run lint
```

## Podporované prohlížeče

Aplikace podporuje nejnovější verze následujících prohlížečů:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge

## Struktura projektu

```text
src/
├── api/
│   └── weatherApi.js
├── components/
│   ├── ForecastDay.jsx
│   ├── ForecastDisplay.jsx
│   ├── ForecastPeriod.jsx
│   └── Search.jsx
├── data/
│   └── city.list.json
├── utils/
│   ├── cityUtils.js
│   ├── translationsUtils.js
│   └── weatherUtils.js
├── styles/
│   ├── _mixins.scss
│   ├── _reset.scss
│   ├── _variables.scss
│   └── main.scss
├── App.jsx
└── main.jsx
```

### `api`

Obsahuje komunikaci s OpenWeather API.

### `components`

Obsahuje React komponenty používané pro vyhledávání obce a zobrazení předpovědi počasí.

### `data`

Obsahuje lokální JSON soubor se seznamem obcí používaný našeptávačem.

### `utils`

Obsahuje pomocné funkce pro vyhledávání obcí, transformaci dat o počasí, lokalizaci, formátování data a práci s ikonami počasí.

### `styles`

Obsahuje globální SCSS styly, proměnné, mixiny a reset stylů.

## Zdroje dat

Data předpovědi počasí jsou získávána prostřednictvím OpenWeather API.

Pro našeptávač obcí je používán lokální JSON soubor se seznamem obcí.

## Lokalizace

Data jsou formátována podle aktuálního jazyka prohlížeče pomocí JavaScript Internationalization API (`Intl`).

Uživatelské rozhraní podporuje češtinu a angličtinu. Pokud je jazyk prohlížeče nastaven na češtinu, aplikace automaticky použije českou lokalizaci. V ostatních případech je použita angličtina.

## Geolokace

Aplikace může pomocí Geolocation API prohlížeče zjistit aktuální polohu uživatele a načíst předpověď počasí pro danou lokalitu.

Použití geolokace vyžaduje souhlas uživatele.