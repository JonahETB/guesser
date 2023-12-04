"use strict"
let happy = false;

(function () {
    let driver = {
        info: {
            driverTeam: "",
            country: "",
            podiums: "",
            points: "",
            tGP: "",
            WC: "",
            hRF: "",
        },
        name: "",
        guessCheck: function () {
            let playerGuess = document.getElementById("guess").value;
            let output = document.getElementById("correct");
            let trueGuess = playerGuess.toLowerCase();
            let driverName = this.name.toLowerCase();
            if (trueGuess == driverName) {
                output.innerHTML = "CORRECT";
                happy = true;
            } else {
                output.innerHTML = "WRONG TRY AGAIN"
            }
        },
        hintCheck: function () {
            const info = Object.keys(this.info);
            let LengthOfInfo = Math.floor(Math.random() * objectKey.length);

            console.log("send hint.exe")
        },
        values: function (obj) {
            let objectKey = Object.keys(obj);
            let randomTeamNum = Math.floor(Math.random() * objectKey.length);
            let randomTeam = objectKey[randomTeamNum];

            let randomDriverNum;
            do {
                randomDriverNum = Math.floor(Math.random() * Object.keys(obj[randomTeam]).length);
              } while (randomDriverNum === 0);
            let driverTeam = objectKey[randomTeamNum];
    
            let randomDriver = Object.keys(obj[randomTeam])[randomDriverNum];
            let driver = obj[randomTeam][randomDriver];

            this.name = driver.name;
            this.info.driverTeam = driverTeam;
            this.info.country = driver.Country;
            this.info.podiums = driver.Podiums;
            this.info.points = driver.Points;
            this.info.tGP = driver.totalGrandPrix;
            this.info.WC = driver.WC;
            this.info.hRF = driver.highestRaceFinish;
        }
    }

    $.ajax({
        type:"GET",
        url:"data.json",
        success: function (res) {
            driver.values(res);
        }
    });
    
    function lock () {
        if (!happy) {
            return;
        }
        let playerGuess = document.getElementById("guess");
        playerGuess.value = driver.name;
    }

    function check (selector) {
        if (happy) {
            return;
        }
        let somthing = selector == 0 ? driver.guessCheck() : driver.hintCheck();
    }
    console.log(driver);

    window.check = check;
    window.lock = lock;
  })();