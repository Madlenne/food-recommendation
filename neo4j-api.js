const neo4j = require('neo4j-driver').v1;
const uuid = require('uuid/v4');

const url = process.env.GRAPHENEDB_BOLT_URL;
const user = process.env.GRAPHENEDB_BOLT_USER;
const pass = process.env.GRAPHENEDB_BOLT_PASSWORD;


class Neo4jApi {

  constructor() {
    this.driver = neo4j.driver(url, neo4j.auth.basic(user, pass));
  }

  createDish(name, originSelect, recommended) {
    const session = this.driver.session();
    let recommendedBoolean = false;

    if (recommended === 'on') {
      recommendedBoolean = true;
    }
    const resp = session
      .run(`
          CREATE (d:DISHES {
            name: {name},
            recommended: {recommendedBoolean}
          })-[rel:COMES_FROM]->(o:Origin{
            originSelect:{originSelect}
          })
          RETURN d.name, o.originSelect, d.recommended`, {
            name,
            originSelect,
            recommendedBoolean,
          });

    resp.then(() => session.close())
      .catch(() => session.close());

    return resp;
  }

  createRestaurant(restaurant) {
    const session = this.driver.session();

    const resp = session
      .run(`
          CREATE (r:DISHES {
            restaurant: {restaurant}
          })
          RETURN r.restaurant`, {
            restaurant,
          });

    resp.then(() => session.close())
      .catch(() => session.close());

    return resp;
  }

  getNodes() {
    const session = this.driver.session();

    const promise = new Promise((resolve, reject) => {
      session
        .run(`
            MATCH (d:DISHES)-[rel:COMES_FROM]->(o:Origin)
            RETURN d, o`)
        .then((result) => {
          session.close();
          resolve({
            dishNodes: result.records
            .map(record => record._fields[0].properties),
            restaurantNodes: result.records
            .map(record => record._fields[1].properties),
          });
        })
        .catch((error) => {
          session.close();
          reject(error);
        });
    });

    return promise;
  }

  clearNodes() {
    const session = this.driver.session();
    return session.run(`
        MATCH (d:DISHES)-[rel:COMES_FROM]->(o:Origin)
        DELETE d, rel, o`);
  }

  close() {
    this.driver.close();
  }

}

module.exports = Neo4jApi;
