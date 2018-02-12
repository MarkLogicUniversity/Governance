/*
 * Create Headers Plugin
 *
 * @param id       - the identifier returned by the collector
 * @param content  - the output of your content plugin
 * @param options  - an object containing options. Options are sent from Java
 *
 * @return - an object of headers
 */
function createHeaders(id, content, options) {
  return {
  	"sourceSystem": "CSV file exported from RDBMS customer table",
    "rawDataLoadDate": fn.currentDateTime(),
    "rawDataLoadUser": xdmp.getCurrentUser(),
    "countryOfOrigin": "FRANCE"
  };
}

module.exports = {
  createHeaders: createHeaders
};

