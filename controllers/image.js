const returnClarifaiRequestOptions = (imageUrl) => {
const PAT = 'f766799e5bc043c293d421af86a93b87';
const USER_ID = 'banditman_99';       
const APP_ID = 'Myfaceapp';
const IMAGE_URL = imageUrl;

const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
        };
    return requestOptions
}

displayFaceBox = box => {
  this.setState({ box: box });
};

const handleApicall = (req, res) => {
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      returnClarifaiRequestOptions(req.body.input))
      .then((response) => response.text())
      .then((result) => {
      res.json(result);
      })
      .catch((err) => res.status(500).json("Unable to communicate with API"));
};
  

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      const entriescount=entries[0].entries;
      res.json(entriescount);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }

module.exports={
    handleImage,
    handleApicall
}