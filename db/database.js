const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb' //changed from bootcampx, may be cause of error in future
});

//below used to test if pool works
// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const query = {
    text: 'Select * from users where email = $1',
    values: [email]
  }
  return pool.query(query)
    .then ((result) => {
      console.log ('testing email')
      return result.rows[0]
    })
    .catch ((err) => {
      console.log(2)
      console.log (err.message)
    })
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) { 
  const query = {
    text: 'Select * from users where id = $1',
    values: [id]
  }
  return pool.query(query)
  .then ((result) => {
    console.log ('testing user id')
    return result.rows[0]
  })
  .catch ((err) => {
    console.log (err.message)
  })

};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const query = {
    text: 'Insert into users (name, email, password) VALUES ($1, $2, $3)',
    values: [user.name, user.email, user.password]
  };

  return pool.query(query)
    .then (result => {
      return result.row[0]
    })
    .catch (err => {
      console.log (err.message)
    })
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function (guest_id, limit = 10) {
  return pool
  .query(`SELECT reservations.*, properties.* 
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  WHERE guest_id = $1 
  GROUP BY properties.id, reservations.id
  LIMIT $2`, [guest_id, limit])
  .then ((result) => {
    console.log(result.rows);
    return result.rows;
  }) 
  .catch((err) => {
    console.log(err.message)
  })
};

/// Properties

/**
//  * Get all properties.
//  * @param {{}} options An object containing query options.
//  * @param {*} limit The number of results to return.
//  * @return {Promise<[{}]>}  A promise to the properties.
//  */
// const getAllProperties = function (options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// };

const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then ((result) => {
      console.log(results.rows);
      return results.rows;
    }) 
    .catch((err) => {
      console.log(err.message)
    })
}





/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
