import c from './constants';

let Validator = function() {

    let self = this;

    /**
     * @param value
     * @returns Boolean
     */
    let isNumber = function(value) {
        return !!value.toString().match(/^[\d]+$/g)
    };

    /**
     * @param config
     * @param rangeKey
     * @returns Boolean
     */
    let validateRanges = function(config, rangeKey) {
        if (config.hasOwnProperty(rangeKey)) {
            let isValidWidthConfig = self.hasRanges(config, rangeKey);
            if (!isValidWidthConfig) return false;
        }
        return true;
    };

    /**
     * @param message
     * @param option
     */
    let logError = function(path) {
        let message = 'Config error in: [';
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
        if (!!input) {
            let isValidWidth = validateRanges(input, c.CONFIG_WIDTH_RANGE_KEY);
            let isValidHeight = validateRanges(input, c.CONFIG_HEIGHT_RANGE_KEY);
            return isValidWidth && isValidHeight;
        }
        return true;
    };

    /**
     * @param config
     * @returns Boolean
     */
    self.hasWidthRanges = function(config) {
        let hasWidth = config.hasOwnProperty(c.CONFIG_WIDTH_RANGE_KEY);
        return hasWidth ? self.hasRanges(config, c.CONFIG_WIDTH_RANGE_KEY) : false;
    };

    /**
     * Checks if the given config option has predefined ranges
     * with valid keys.
     * @see constants.js
     *
     * @param config
     * @param key
     * @returns Boolean
     */
    self.hasRanges = function(config, key) {
        let hasFrom = config[key].hasOwnProperty(c.CONFIG_RANGE_KEY_FROM);
        let isValidFrom = hasFrom ? isNumber(config[key][c.CONFIG_RANGE_KEY_FROM]) : false;
        let hasTo = config[key].hasOwnProperty(c.CONFIG_RANGE_KEY_TO);
        let isValidTo = hasTo ? isNumber(config[key][c.CONFIG_RANGE_KEY_TO]) : false;
        if (!isValidFrom) logError([key,c.CONFIG_RANGE_KEY_FROM]);
        if (!isValidTo) logError([key,c.CONFIG_RANGE_KEY_TO]);
        return isValidFrom && isValidTo;
    };



};

export default new Validator();