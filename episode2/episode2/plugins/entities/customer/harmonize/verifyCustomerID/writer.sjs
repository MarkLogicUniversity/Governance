/*~
 * Writer Plugin
 *
 * @param id       - the identifier returned by the collector
 * @param envelope - the final envelope
 * @param options  - an object options. Options are sent from Java
 *
 * @return - nothing
 */
function write(id, envelope, options) {

  /*
  	Get the country from the final envelope data.
    Based on the country, insert the document with the appropriate permissions.
  */
  let country = envelope.root.toObject().envelope.headers.provenance.countryOfOrigin;
  let permissions;
  
  switch(country){
    case 'US':
      permissions = [xdmp.permission("US", "read"), xdmp.permission("DBA", "update")];
      break;
        
    case 'FRANCE':
			permissions = [xdmp.permission("FRANCE", "read"), xdmp.permission("DBA", "update")];
      break;
    };
  
  xdmp.documentInsert(id, envelope, permissions, options.entity);
}

module.exports = write;
