"use strict"

let happy = false;
const dropdown = document.getElementById('dropdown');
var i = 0, h = 0;

(function () {
    let driver = {
        info: {
            driverTeam: "", country: "", podiums: "", points: "", tGP: "", WC: "", hRF: "",
        },
        name: "",
        guessCheck: function () {
            const result = dropdown.value;
            const selectedText = document.getElementById(result);
            const resultText = selectedText.textContent;
            const output = document.getElementById("correct");
    
            if (resultText == this.name) {
                output.innerHTML = "CORRECT";
                dropdown.disabled = true;
                happy = true;
            } else {
                output.innerHTML = "WRONG TRY AGAIN";
            }
        },
        hintCheck: function () {
            const hText = [
                `You're 1st hint is that the driver `,`You're 2nd hint is that the driver `,`You're 3rd hint is that the driver `,
                `You're 4th hint is that the driver `,`You're 5th hint is that the driver `,`You're 6th hint is that the driver `,
                        `You're 7th hint is that the driver `
                    ],
            finalText = [`has entered ${this.info.tGP} grand prix`,`is from ${this.info.country}`,`has ${this.info.points} points`,
                `has ${this.info.WC} world championship`,`has ${this.info.podiums} podiums`,`drivers for ${this.info.driverTeam}`,
                `highest finish is ${this.info.hRF}`];
    
            const text = (h >= 0 && h < hText.length) ? `${hText[h]}${finalText[h++]}`: '';
            const newHint = document.createElement("p");
            const textNode = document.createTextNode(text);
            newHint.appendChild(textNode);
            output.appendChild(newHint);
        },
        values: function (obj) {
            const objectKey = Object.keys(obj);
            const randomTeamNum = Math.floor(Math.random() * objectKey.length);
            const randomTeam = objectKey[randomTeamNum];
    
            let randomDriverNum;
            do {
                randomDriverNum = Math.floor(Math.random() * Object.keys(obj[randomTeam]).length);
            } while (randomDriverNum === 0);
    
            const randomDriver = Object.keys(obj[randomTeam])[randomDriverNum];
            const driver = obj[randomTeam][randomDriver];
    
            this.name = driver.name;
            this.info = {
                driverTeam: obj[randomTeam].team,
                country: driver.Country,
                podiums: driver.Podiums,
                points: driver.Points,
                tGP: driver.totalGrandPrix,
                WC: driver.WC,
                hRF: driver.highestRaceFinish,
            };
    
            this.iterateObject(obj);
        },
        iterateObject: function (obj) {
            const option = document.createElement("option");
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && key === 'name') {
                    i++;
                    option.text = obj[key];
                    option.value = "option" + i;
                    option.id = "option" + i;
                    dropdown.appendChild(option);
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    this.iterateObject(obj[key]);
                }
            }
        }
    };

    $.ajax({
        type:"GET",
        url:"data.json",
        success: function (res) {
            driver.values(res);
        },
        error: function (error) {
            console.log(error);
        }
    });

 function check(selector) {
        if (!happy) {
            selector === 0 ? driver.guessCheck() : driver.hintCheck();
        }
    }    
    window.check = check;
  })();