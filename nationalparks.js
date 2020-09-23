
let parkCodesAr = ["ARCH", "BRCA", "CANY", "CARE", "CAVE", "DEVA", "GRBA", "GRCA", "GRSA", "GUMO", "JOTR", "KICA", "LAKE", "MEVE", "MOJA", "SAGU", "SEQU", "ZION"];

for(i = 0; i < parkCodesAr.length; i++) {
    let parkCode = parkCodesAr[i];
    let apiKey = 'Cz73kVYJzbhAkHWqVSxeyXyeRx5q01oBXc9Pdhtz';
    let campURL = `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${apiKey}`;

$.ajax({
    url: campURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

    let fullName = response.data[0].fullName;
    let inState = response.data[0].states;
    let parkDescription = response.data[0].description;

    //note this returns an array
    let entranceFees = response.data[0].entranceFees;

    //multiple images to generate a random number each time a user opens a trip
    //and show the photo corresponding to that number
    let images0 = response.data[0].images[0].url;
    let images1 = response.data[0].images[1].url;
    let images2 = response.data[0].images[2].url;
    let images3 = response.data[0].images[3].url;
    let weather = response.data[0].weatherInfo;

    let moreInfoUrl = response.data[0].url;

    var query = connection.query(
        "INSERT INTO nationalparks SET ?",
        {
            name: fullName,
            state: inState,
            description: parkDescription,
            price: entranceFees,
            image0: images0,
            image1: images1,
            image2: images2,
            image3: images3,
            weatherInfo: weather,
            infoUrl: moreInfoUrl
        },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " park inserted!\n");
          }
        );
      
        // logs the actual query being run
        console.log(query.sql);
});
}

