
var srapp = app.srapp || {};

(function (srapp, $) {
    "use strict";

    srapp.init = function () {
        srapp.widgets.featureify.init();
    };

})( window.app.srapp = window.app.srapp || {}, jQuery);


(function (app, srapp, $) {
    "use strict";

    srapp.widgets = {};


    /**
     * @name setFirstFeatureItem
     * @description function called by init to copy first slide into the feature-wrapper.
     * @private
     * @param {object} source - contains indexed array-like object of feature-items
     * @param {object} destination - container for feature-item
     */
    function setFirstFeatureItem(source, destination) {

        // Filter cloned slides from flexslider (if present)
        var snippet = source.not('.clone').first();

        swapFeatureItem (snippet, destination);
        setFeatureItemActiveClass(source, snippet);
    }

    /**
     * @name swapFeaturedItem
     * @description Event driven function to copy triggered featured-item html fragment into the feature-wrapper.
     * @private
     * @param {object} snippet - contains indexed array-like object of feature-items
     * @param {object} destination - container for feature-item
     */
    function swapFeatureItem(snippet, destination) {

        destination.html(snippet.html());

    }

    /**
     * @name setFeatureItemActiveClass
     * @description
     * @param {object} source : contains indexed array-like object of feature-items
     * @param {object} snippet - active individual LI element .featureify-item
     */
    function setFeatureItemActiveClass(source, snippet) {

        if ( snippet.hasClass('featureify-item-active') !== true ) {

            // Remove any existing instances of 'featured-item-active' class in this list of featured items
            jQuery.each(source, function() {
                if ($(this).hasClass('featureify-item-active') === true) {
                    $(this).removeClass('featureify-item-active');
                }
            });

            // Add 'featured-item-active' to the currently featured LI element
            snippet.addClass('featureify-item-active');
        }
    }

    srapp.widgets.featureify = {

        // Defaults are handled using the decorator pattern and extended through buildConfig function
        defaults: {
            source: 'featureify-source',
            destination: 'featureify-wrapper',
            item: 'featureify-item',
            trigger: 'featureify-trigger'
        },

        /**
         * @name init
         * @function
         * @description : Initialize featureify by configuring defaults, populating first featureify-wrapper, and attaching event handlers
         * @public
         */
        init: function () {

            var targets = $('.featureify'); // collection of all instances of the widget on a page

            if (targets.length > 0) {

                // Iterate over all targets
                jQuery.each(targets, function (i, val) {

                    var target = $(this), // the specific instance of the widget to be manipulated
                        snippet = {}, // the individual LI item
                        source = {}, // the collection of LI items in each target
                        destination = {}, // The container that the featured item will be rendered
                        trigger = {};

                    console.log(trigger);
                    // Get data- values for this instance and parse string to return an object
                    srapp.util.configurator.buildConfigs(target, 'featureify-options', srapp.widgets.featureify);

                    // update vars with values from config
                    source = target.find('.' + srapp.widgets.featureify.configs.source);
                    snippet = source.html();
                    destination = target.find('.' + srapp.widgets.featureify.configs.destination);
                    trigger = target.find('.' + srapp.widgets.featureify.configs.trigger);


                    // copies first feature item into destination
                    console.log($(destination));
                    setFirstFeatureItem(source, destination);

                    // Attach event related functions to each source item
                    source.on('click', function(el) {

                        snippet = $(this);

                        swapFeatureItem(snippet, destination);
                        setFeatureItemActiveClass(source, snippet);

                    });
                });
            }
        }
    };
})( window.app = window.app || {}, window.app.srapp = window.app.srapp || {}, jQuery );

/**
 * Utilities Module
 */
(function (srapp, $) {
    "use strict";

    var cached = {};
    srapp.util = {};

    /**
     * @name Configurator
     * @description Utility function to build and return a configuration object by extending defaults with settings
     * @type {{defaults: {}, settings: {}, configs: {}, buildConfig: Function}}
     */

    srapp.util.configurator = {

        defaults: {}, // takes object with defaults from caller
        settings: {}, // gets data- based options object through caller
        configs: {}, // object containing the result of extending defaults with settings

        /**
         * @name configurator.buildConfigs
         * @param target
         * @param dataAttrName
         * @param callerObject
         */
        buildConfigs: function (target, dataAttrName, callerObject) {

            // Get data- values for this instance and parse string to return an object
            if (target.data.length > 0) {
                callerObject.settings = jQuery.parseJSON(target.data(dataAttrName));
            }


            // Create new extended object that uses either default values or the values from the data- configs object
            callerObject.configs = $.extend({}, callerObject.defaults, callerObject.settings);

            return callerObject.configs;
        }

    };

})(window.app.srapp = window.app.srapp || {}, jQuery);


$(document).ready(function() {
    app.srapp.init();
});
