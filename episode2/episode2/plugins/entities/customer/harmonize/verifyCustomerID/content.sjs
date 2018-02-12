
'use strict'

/*
 * Create Content Plugin
 *
 * @param id         - the identifier returned by the collector
 * @param options    - an object containing options. Options are sent from Java
 *
 * @return - your content
 */

/*
	THIS FUNCTION HAS BEEN MODIFIED TO ALSO RETURN THE HEADER DATA.
  THIS WILL ENABLE US TO TRACK THE PROVENANCE DATA IN THE HARMONIZED DOCUMENT.
*/
function createContent(id, options) {
  let doc = cts.doc(id);
  let root = doc.root.toObject();

  let source;
	let provenance;
  
  // for xml we need to use xpath
  if (root && xdmp.nodeKind(root) === 'element') {
    source = root.xpath('/*:envelope/*:instance/node()');
    provenance = root.xpath('/*:envelope/*:headers/node()');
  }
  // for json we need to return the instance
  else if (root && root.envelope && root.envelope.instance) {
    source = root.envelope.instance;
    provenance = root.envelope.headers;
  }
  // for everything else
  else {
    source = doc;
    provenance = 'none';
  }

  return extractInstanceCustomer(source, provenance);
  
}

/**
 * Creates an object instance from some source document.
 * @param source  A document or node that contains
 *   data for populating a customer
 * @return An object with extracted data and
 *   metadata about the instance.
 */
function extractInstanceCustomer(source, provenance) {
  // the original source documents
  let attachments = source;
  
  // the original envelope
  let originalEnvelope = provenance;
  
  // return the instance object
  // return the provenance data from the original envelope
  return {
    '$provenance': provenance,
    '$attachments': attachments,
    '$type': 'customer',
    '$version': '0.0.1'
  }
};
  

function makeReferenceObject(type, ref) {
  return {
    '$type': type,
    '$ref': ref
  };
}

module.exports = {
  createContent: createContent
};

