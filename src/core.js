/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

/*
* Hack around the lack of localization support in Plotly by redirecting
* formatting requests as necessary to a newly constructed French locale
*/
var UI_TEXTS = {
    EN: {
        zoomOutTip: 'Double-click to<br>zoom back out',
        isolateTip: 'Double click on legend to isolate individual trace',
        pngSnapshotTip: 'Taking snapshot - this may take a few seconds',
        svgSnapshotTip: 'IE only supports svg.  Changing format to svg.',
        snapshotSuccessTip: 'Snapshot succeeded - ',
        snapshotErrorTip: 'Sorry there was a problem downloading your snapshot!',
        axisScalingIssueTip: 'Something went wrong with axis scaling',
        noZZoomTip: 'cannot fast-zsmooth: ',
        zoomButton: 'Zoom',
        panButton: 'Pan',
        boxSelectButton: 'Box select',
        lassoSelectButton: 'Lasso select',
        zoomInButton: 'Zoom in',
        zoomOutButton: 'Zoom out',
        toImageButton: 'Download plot as a png',
        sendDataToCloudButton: 'Save and edit plot in cloud',
        autoscaleButton: 'Autoscale',
        resetAxesButton: 'Reset axes',
        closestDataOnHoverButton: 'Show closest data on hover',
        compareDataOnHoverButton: 'Compare data on hover',
        orbitalRotationButton: 'Orbital rotation',
        turntableRotationButton: 'Turntable rotation',
        resetCameraButton: 'Reset camera to default',
        resetSavedCameraButton: 'Reset camera to last save',
        resetGeoButton: 'Reset',
        resetViewsButton: 'Reset views',
        resetViewButton: 'Reset view',
        spikeLinesButton: 'Toggle Spike Lines'
    },
    FR: {
        zoomOutTip: 'Double-cliquez pour dézoomer',
        isolateTip: 'Double-cliquez sur la légende<br>pour isoler un tracé',
        pngSnapshotTip: 'Export en image en cours...',
        svgSnapshotTip: 'Votre navigateur supporte seulement le SVG.<br>Conversion du format en SVG.',
        snapshotSuccessTip: 'Export terminé - ',
        snapshotErrorTip: 'Désolé, un problème s\'est produit durant le téléchargement de l\'image.',
        axisScalingIssueTip: 'Une erreur s\'est produite durant le redimensionnement des axes',
        noZZoomTip: 'Opération impossible : ',
        zoomButton: 'Zoom',
        panButton: 'Déplacement',
        boxSelectButton: 'Sélection rectangulaire',
        lassoSelectButton: 'Sélection lasso',
        zoomInButton: 'Zoomer',
        zoomOutButton: 'Dézoomer',
        toImageButton: 'Télécharger l\'image du graphique',
        sendDataToCloudButton: 'Sauvegarder et éditer dans le cloud',
        autoscaleButton: 'Redimensionnement automatique',
        resetAxesButton: 'Réinitialiser les axes',
        closestDataOnHoverButton: 'Afficher les données proches au survol',
        compareDataOnHoverButton: 'Comparer les données au survol',
        orbitalRotationButton: 'Rotation orbitale',
        turntableRotationButton: 'Rotation sur l\'axe Z',
        resetCameraButton: 'Réinitialiser la caméra',
        resetSavedCameraButton: 'Dernière position sauvegardée de la caméra',
        resetGeoButton: 'Réinitialiser',
        resetViewsButton: 'Réinitialiser les vues',
        resetViewButton: 'Réinitialiser la vue',
        spikeLinesButton: 'Affichage des repères au survol'
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
var d3 = require('d3');

// Set the default language
var uiTexts = UI_TEXTS.EN;

/**
 * Sets the localization to use.
 * @param {'en'|'fr'} [locale='en']
 */
function setLocale(locale) {
    // Set the d3 locale
    var _numberFormat = d3.format;
    var _timeFormat = d3.time.format;
    var _timeUtcFormat = d3.time.format.utc;
    if(locale && D3_LOCALES[locale.toUpperCase()]) {
        _numberFormat = D3_LOCALES[locale.toUpperCase()].numberFormat;
        _timeFormat = D3_LOCALES[locale.toUpperCase()].timeFormat;
        _timeUtcFormat = D3_LOCALES[locale.toUpperCase()].timeFormat.utc;
    }
    d3.format = function() {
        return _numberFormat.apply(this, arguments);
    };
    d3.time.format = function() {
        return _timeFormat.apply(this, arguments);
    };
    d3.time.format.utc = function() {
        return _timeUtcFormat.apply(this, arguments);
    };
    // Set the UI translations
    if(locale && UI_TEXTS.hasOwnProperty(locale.toUpperCase())) {
        uiTexts = UI_TEXTS[locale.toUpperCase()];
    }
}
setLocale();

exports.setLocale = setLocale;
exports.d3 = d3;
exports.uiTexts = uiTexts;

/*
 * Export the plotly.js API methods.
 */

var Plotly = require('./plotly');

// package version injected by `npm run preprocess`
exports.version = '1.31.2';

// inject promise polyfill
require('es6-promise').polyfill();

// inject plot css
require('../build/plotcss');

// inject default MathJax config
require('./fonts/mathjax_config');

// plot api
exports.plot = Plotly.plot;
exports.newPlot = Plotly.newPlot;
exports.restyle = Plotly.restyle;
exports.relayout = Plotly.relayout;
exports.redraw = Plotly.redraw;
exports.update = Plotly.update;
exports.extendTraces = Plotly.extendTraces;
exports.prependTraces = Plotly.prependTraces;
exports.addTraces = Plotly.addTraces;
exports.deleteTraces = Plotly.deleteTraces;
exports.moveTraces = Plotly.moveTraces;
exports.purge = Plotly.purge;
exports.setPlotConfig = require('./plot_api/set_plot_config');
exports.register = require('./plot_api/register');
exports.toImage = require('./plot_api/to_image');
exports.downloadImage = require('./snapshot/download');
exports.validate = require('./plot_api/validate');
exports.addFrames = Plotly.addFrames;
exports.deleteFrames = Plotly.deleteFrames;
exports.animate = Plotly.animate;

// scatter is the only trace included by default
exports.register(require('./traces/scatter'));

// register all registrable components modules
exports.register([
    require('./components/fx'),
    require('./components/legend'),
    require('./components/annotations'),
    require('./components/annotations3d'),
    require('./components/shapes'),
    require('./components/images'),
    require('./components/updatemenus'),
    require('./components/sliders'),
    require('./components/rangeslider'),
    require('./components/rangeselector')
]);

// plot icons
exports.Icons = require('../build/ploticon');

// unofficial 'beta' plot methods, use at your own risk
exports.Plots = Plotly.Plots;
exports.Fx = require('./components/fx');
exports.Snapshot = require('./snapshot');
exports.PlotSchema = require('./plot_api/plot_schema');
exports.Queue = require('./lib/queue');

