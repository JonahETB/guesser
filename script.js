"use strict"
let happy;

(function () {
    let driver = {
        driverTeam: "",
        randomDriver: "",
        guessCheck: function () {
            console.log("print");
        },
        hintCheck: function () {

        }
    }

    $.ajax({
        type:"GET",
        url:"data.json",
        success: function (res) {
            values(res);
        }
    });
    
    function values (obj) {
        let objectKey = Object.keys(obj);
        let randomTeamNum = Math.floor(Math.random() * objectKey.length);
        let randomTeam = objectKey[randomTeamNum];

        let teamKey = Object.keys(obj[randomTeam]);
        let randomDriverNum;
        do {
            randomDriverNum = Math.floor(Math.random() * teamKey.length);
          } while (randomDriverNum === 0);
        let driverTeam = objectKey[randomTeamNum];
        let randomDriver = teamKey[randomDriverNum];

        console.log(obj[randomTeam][randomDriver]);
        driver.driverTeam = driverTeam;
        driver.randomDriver = randomDriver;
 

        document.getElementById("output").innerHTML = JSON.stringify(randomDriver).replace(/"/g, "");
    }

    function check (selector) {
        happy = selector == 0 ? driver.guessCheck() : driver.hintCheck() ;
    }

    console.log(driver);

    window.check = check;
  })();
