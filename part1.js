var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
			 input StateInput {
			     state: Int!
			 }

			 type State {
			     id: ID!
			     state: Int!
			 }

			 type Query {
			     getState: State
			 }

			 type Mutation {
			     setState(input: StateInput!): State
			 }
			 `);

// State object
class State {
    constructor({state}) {
	this.id = 0;
	this.state = state;
    }
}

var state;

var root = {
    getState: function () {
	if (state == null) state = {state: 0};
	return new State(state);
    },
    setState: function ({input}) {
	state = input;
	return new State(input);
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
	    schema: schema,
		rootValue: root,
		graphiql: true,
		}));
app.listen(4000, () => console.log('Running a GraphQL API server at localhost:4000/graphql'));
