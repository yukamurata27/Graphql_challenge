var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const fetch = require('isomorphic-fetch');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
			 type Query {
			     getOfferMake(offerId: String!): String
			 }
			 `);

// The root provides a resolver function for each API endpoint
var root = {
    getOfferMake: ({offerId}) => {
		return fetch('https://hyrecar-graphql.now.sh/api', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: '{ offer (offerId: "' + offerId + '") { make } }' }),
		    })
		.then(res => res.json())
		.then(data => { return data["data"]["offer"]["make"] });
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
	    schema: schema,
		rootValue: root,
		graphiql: true,
		}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
