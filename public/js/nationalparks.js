
//let parkCodesAr = ["YOSE", "WHSA", "GRSM", "ARCH", "BRCA", "CANY", "CARE", "CAVE", "DEVA", "GRBA", "GRCA", "GRSA", "GUMO", "JOTR", "KICA", "LAKE", "MEVE", "MOJA", "SAGU", "SEQU", "ZION"];
let parkCodesAr = ["BADL", "BISC", "BLCA", "CARI", "CHIS", "CRLA", "CUVA", "DENA", "DRTO", "EVER", "FOWA", "GAAR", "GLAC", "GLBA", "GRTE", "HALE", "HAVO", "HOSP", "ISRO", "KATM", "KEFJ", "KOVA", "LACL", "LAVO", "MACA", "NOCA", "PEFO", "REDW", "SEKI", "THRO", "VIIS", "VOYA", "WICA", "WRST", "YELL"];

for(i = 0; i < parkCodesAr.length; i++) {
    let parkCode = parkCodesAr[i];
    let apiKey = 'Cz73kVYJzbhAkHWqVSxeyXyeRx5q01oBXc9Pdhtz';
    let campURL = `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${apiKey}`;

$.ajax({
    url: campURL,
    method: "GET"
}).then(function (response) {
    //console.log(response);
    
    let parkCode = response.data[0].parkCode;
    let fullName = response.data[0].fullName;
    let inState = response.data[0].states;
    let images0 = response.data[0].images[1].url;
    let moreInfoUrl = response.data[0].url;

    console.log(`VALUES (DEFAULT, "${parkCode}", "${fullName}", "${inState}", "${images0}", "${moreInfoUrl}", "0000-00-00 00:00:00", "0000-00-00 00:00:00");`);


//     $.post("/api/parks", {
//             parkCode: parkCode,
//             name: fullName,
//             state: inState,
//             image0: "image0",
//             infoUrl: moreInfoUrl
//    })
//       .then(function () {
//         console.log("Made it to the nationalpark!");
//         // If there's an error, handle it by throwing up a bootstrap alert
//       });
 let parkObj = {
    parkcode: parkCode,
    name: fullName,
    state: inState,
    image0: images0,
    infoUrl: moreInfoUrl
    }

    $.ajax("/api/parks", {
        type: "POST",
        data: parkObj
    }).then( function() {
      console.log("created new park");
    });

});
}

console.log("finished for loop");