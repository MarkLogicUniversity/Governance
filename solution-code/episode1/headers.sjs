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
  	"provenance": {
     	"loadedBy": xdmp.getCurrentUser(),
      "sourceSystem": "customer rdbms from acquired company XYZ",
      "loadDate": fn.currentDate()
    }
  };
}

module.exports = {
  createHeaders: createHeaders
};
