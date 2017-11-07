## Plotly.js with french translations
> This is a [fork of the Plotly.js library](https://github.com/plotly/plotly.js) that includes internationalisation of d3 dates and some UI texts.

This first version handles only french translations.

### Usage

By default the `en` locale will be used. You can change it by calling the `setLocale` function before initializing a plot.
```javascript
Plotly.setLocale('fr');
```
> The locale code is not case sensitive.

### Adding new locales

You can add new languages by editing the `src/core.js` file :

```javascript
var UI_TEXTS = {
    EN: {
        zoomOutTip: 'Double-click to<br>zoom back out',
        isolateTip: 'Double click on legend to isolate individual trace',
        //...
    },
    FR: {
        zoomOutTip: 'Double-cliquez pour dézoomer',
        isolateTip: 'Double-cliquez sur la légende<br>pour isoler un tracé',
        //...
    }
};
var D3_LOCALES = {
    FR: d3.locale({
      decimal: ',',
      thousands: ' ',
      grouping: [3],
      currency: ['€', ''],
      dateTime: '%a %b %e %X %Y',
      date: '%d/%m/%Y',
      time: '%H:%M:%S',
      periods: ['AM', 'PM'],
      days: ['Dimanche', 'lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      shortDays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      shortMonths: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
    })
};
```
> - **`UI_TEXTS`**: Add here translated texts for new languages
> - **`D3_LOCALES`**: Add here the d3 locale for new locales
