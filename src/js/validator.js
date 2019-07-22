import c from './constants';

let Validator = function() {

    let self = this;

    /**
     * @param path
     * @returns void
     */
    let logError = function(path) {
        let message = 'Config error: [';
        for (let item in path) {
            message += path[item].toString()+'.';
        }
        console.error(message.substring(0, message.length - 1)+']');
    };

    /**
     * @param input
     * @returns Boolean
     */
    self.validate = function (input) {
        if (typeof input == "object") {
            let hasWidth = self.hasConfig(input, c.CONFIG_WIDTH_RANGE_KEY);
            let isValidWidth = self.hasRangesFor(input, c.CONFIG_WIDTH_RANGE_KEY);
            let hasHeight = self.hasConfig(input, c.CONFIG_HEIGHT_RANGE_KEY);
            let isValidHeight = self.hasRangesFor(input, c.CONFIG_HEIGHT_RANGE_KEY);
            return (!hasWidth || isValidWidth) && (!hasHeight || isValidHeight);
        }
        return true;
    };

    /**
     * @param config
     * @returns Boolean
     */
    self.hasDelay = function(config) {
        return config.hasOwnProperty(c.CONFIG_DELAY_KEY) ? self.isNumber(config[c.CONFIG_DELAY_KEY]) : false;
    };

    /**
     * @param config
     * @returns Boolean
     */
    self.hasGap = function(config) {
        return config.hasOwnProperty(c.CONFIG_GAP_KEY) ? self.isNumber(config[c.CONFIG_GAP_KEY]) : false;
    };

    /**
     * @param value
     * @returns Boolean
     */
    self.isNumber = function(value) {
        return !!value.toString().match(/^[\d.]+$/g)
    };

    /**
     * @param config
     * @param rangeKey
     * @param showErrors
     * @returns Boolean
     */
    self.hasRangesFor = function(config, rangeKey, showErrors = true) {
        if (typeof config !== "object") return false;
        if (self.hasConfig(config, rangeKey)) {
            return self.hasRanges(config, rangeKey, showErrors);
        }
        return false;
    };

    /**
     * @param config
     * @param rangeKey
     * @returns Boolean
     */
    self.hasConfig = function(config, rangeKey) {
        return config.hasOwnProperty(rangeKey);
    };

    /**
     * Checks if the given config option has predefined ranges
     * with valid keys.
     * @see constants.js
     *
     * @param config
     * @param key
     * @param showErrors
     * @returns Boolean
     */
    self.hasRanges = function(config, key, showErrors) {
        let isValid = false;
        let hasFrom = config[key].hasOwnProperty(c.CONFIG_RANGE_KEY_FROM);
        let isValidFrom = hasFrom ? self.isNumber(config[key][c.CONFIG_RANGE_KEY_FROM]) : false;
        let hasTo = config[key].hasOwnProperty(c.CONFIG_RANGE_KEY_TO);
        let isValidTo = hasTo ? self.isNumber(config[key][c.CONFIG_RANGE_KEY_TO]) : false;

        if (isValidFrom && isValidTo) {
            isValid = config[key][c.CONFIG_RANGE_KEY_TO] >= config[key][c.CONFIG_RANGE_KEY_FROM];
        }
        if (showErrors) {
            if (!isValidFrom) logError([key,c.CONFIG_RANGE_KEY_FROM]);
            if (!isValidTo) logError([key,c.CONFIG_RANGE_KEY_TO]);
            if (!isValid) logError([key]);
        }
        return isValid;
    };



};

export default new Validator();