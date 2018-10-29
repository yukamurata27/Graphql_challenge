# Graphql Sample Programs

### part 1
This program allows a user to get and set a state.

#### Usage
* get a state
```
query {
  getState {
    state
  }
}
```

* set a state
```
mutation {
  setState(input: {
    state: 5,
  }) {
    state
  }
}
```

### part 2
This program allows a user to get data from an API.

#### Usage
```
query {
  getOfferMake (offerId: "<YOUR_OFFER_ID>")
}
```
