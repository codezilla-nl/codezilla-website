# Getting started

-----

**BELANGRIJK:**

*Waarschijnlijk overbodig, maar dit stappenplan gaat er vanuit dat je deze software op je machine hebt:*

* Git
* Node.js

-----

## Aan de slag

Voer de volgende stappen uit om snel aan de slag te kunnen:

### 1. Clone repo
Run in terminal
```
git clone -b feature/hackathon git@github.com:codezilla-nl/codezilla-website.git
```

of gebruik je favorite git client en clone 

```
git@github.com:codezilla-nl/codezilla-website.git
``` 

en pak dan de branch 

```
feature/hackathon
``` 

### 2. Install
Run in terminal

```
npm install
```

### 3. Run
Run in terminal

```
npm start
```

## Overig
* Handmatig een build draaien: `npm run build`
* Test: `npm test`


## Spelregels
* Door Rollup en Babel kun je lekker met ES6 aan de slag, doe dit dus ook :)
* Gebruik zo min mogelijk libraries, alleen als het echt nodig is
    * Liever geen jQuery
