"use strict"

let happy = false;
const dropdown = document.getElementById('dropdown');
var i = 0;
var h = 0;

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
            let result = dropdown.value;
            let selectedText = document.getElementById(result);
            let resultText = selectedText.textContent;

            let output = document.getElementById("correct");
            let driverName = this.name;
            if (resultText == driverName) {
                output.innerHTML = "CORRECT";
                dropdown.disabled = true;
                happy = true;
            } else {
                output.innerHTML = "WRONG TRY AGAIN"
            }
        },
        hintCheck: function () {
            const hText = [`You're 1st hint is that the driver has entered ${this.info.tGP} grand prix`,
                        `You're 2nd hint is that the driver is from ${this.info.country}`,
                        `You're 3rd hint is that the driver has ${this.info.points} points`,
                        `You're 4th hint is that the driver has ${this.info.WC} world championship`,
                        `You're 5th hint is that the driver has ${this.info.podiums} podiums`,
                        `You're 6th hint is that the driver drivers for ${this.info.driverTeam}`,
                        `You're 7th hint is that the driver highest finish is ${this.info.hRF}`];

            const text = (h >= 0 && h < hText.length) ? hText[h] : '';
            h++;  
            const newHint = document.createElement("p");  
            const textNode = document.createTextNode(text);
            newHint.appendChild(textNode);
            output.appendChild(newHint);
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
            this.iterateObject(obj)
        },
        iterateObject: function (obj) {
            var option = document.createElement("option");
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        // If the value is an object, recursively call the function
                        this.iterateObject(obj[key]);
                    } else if (key === 'name') {
                        i++;
                        // If the key is 'name', log the value
                        option.text = obj[key];
                        option.value = "option" + (i);
                        option.id = "option" + (i);
                        dropdown.appendChild(option);
                    } 
                }
            }
        }

    }
    $.ajax({
        type:"GET",
        url:"data.json",
        success: function (res) {
            driver.values(res);
        }
    });

    function check (selector) {
        if (happy) {
            return;
        }
        let somthing = selector == 0 ? driver.guessCheck() : driver.hintCheck();
    }
    console.log(driver);

    window.check = check;
  })();