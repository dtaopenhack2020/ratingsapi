# Ratings API
Ratings API for openhack challenges

[Get Rating](#get-rating)

[Get Ratings](#get-ratings)

[POST Rating](#post-rating)

## Get Rating
* Verb: GET
* Query string or route parameter: ratingId
### Requirements
Get the rating from your database and return the entire JSON payload for the review identified by the id
Additional route parameters or query string values may be used if necessary.

### Output payload example:
```json
{
  "id": "79c2779e-dd2e-43e8-803d-ecbebed8972c",
  "userId": "cc20a6fb-a91f-4192-874d-132493685376",
  "productId": "4c25613a-a3c2-4ef3-8e02-9c335eb23204",
  "timestamp": "2018-05-21 21:27:47Z",
  "locationName": "Sample ice cream shop",
  "rating": 5,
  "userNotes": "I love the subtle notes of orange in this ice cream!"
}
```
## Get Ratings
* Verb: GET
* Query string or route parameter: userId

### Requirements
Get the ratings for the user from your database and return the entire JSON payload for the reviews for the user identified by the id.

Additional route parameters or query string values may be used if necessary.

### Output payload example:
```json
[
  {
    "id": "79c2779e-dd2e-43e8-803d-ecbebed8972c",
    "userId": "cc20a6fb-a91f-4192-874d-132493685376",
    "productId": "4c25613a-a3c2-4ef3-8e02-9c335eb23204",
    "timestamp": "2018-05-21 21:27:47Z",
    "locationName": "Sample ice cream shop",
    "rating": 5,
    "userNotes": "I love the subtle notes of orange in this ice cream!"
  },
  {
    "id": "8947f7cc-6f4c-49ed-a7aa-62892eac8f31",
    "userId": "cc20a6fb-a91f-4192-874d-132493685376",
    "productId": "e4e7068e-500e-4a00-8be4-630d4594735b",
    "timestamp": "2018-05-20 09:02:30Z",
    "locationName": "Another Sample Shop",
    "rating": 4,
    "userNotes": "I really enjoy this grape ice cream!"
  }
]
```
## POST Rating
* Verb: POST

### Input payload example:
```json
{
  "userId": "cc20a6fb-a91f-4192-874d-132493685376",
  "productId": "4c25613a-a3c2-4ef3-8e02-9c335eb23204",
  "locationName": "Sample ice cream shop",
  "rating": 5,
  "userNotes": "I love the subtle notes of orange in this ice cream!"
}
```
### Requirements
* Validate both userId and productId by calling the existing API endpoints. You can find a user id to test with from the sample payload above
* Add a property called id with a GUID value
* Add a property called timestamp with the current UTC date time
* Validate that the rating field is an integer from 0 to 5
* Use a data service to store the ratings information to the backend
* Return the entire review JSON payload with the newly created id and timestamp
### Output payload example:
```json
{
  "id": "79c2779e-dd2e-43e8-803d-ecbebed8972c",
  "userId": "cc20a6fb-a91f-4192-874d-132493685376",
  "productId": "4c25613a-a3c2-4ef3-8e02-9c335eb23204",
  "timestamp": "2018-05-21 21:27:47Z",
  "locationName": "Sample ice cream shop",
  "rating": 5,
  "userNotes": "I love the subtle notes of orange in this ice cream!"
}
```