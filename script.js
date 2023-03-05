Vue.createApp({
  data() {
    return {
      defaultOdds: 4096,
      shinyCharm: 1365,
      outbreak: 1365,
      sandwich: 1024,
      charmOutbreak: 819,
      sandwichOutbreak: 683,
      maxOdds: 512,
      currentOdds: 4096,
      resultIsVisible: false,
      result: 0,
    };
  },
  computed: {
    resultFeedback() {
      if (
        this.result < this.currentOdds * 1.1 &&
        this.result > this.currentOdds * 0.9
      ) {
        return "Avarage luck 😐";
      }
      if (this.result > this.currentOdds) {
        if (this.result > this.currentOdds * 1.5) {
          return "Very unlucky! 😨";
        }
        return "Unlucky 😓";
      }
      if (this.result < this.currentOdds) {
        if (this.result < this.currentOdds * 0.5) {
          return "Very lucky! 🥰";
        }
        return "Lucky 😊";
      }
    },
  },
  methods: {
    shinyChance() {
      this.resultIsVisible = false;

      const inputCharm = document.querySelector("#charm");
      const inputOutbreak = document.querySelector("#outbreak");
      const inputSandwich = document.querySelector("#sandwich");

      if (
        inputCharm.checked &&
        inputOutbreak.checked &&
        inputSandwich.checked
      ) {
        this.currentOdds = this.maxOdds;
      } else if (
        inputCharm.checked &&
        inputOutbreak.checked &&
        inputSandwich.checked == false
      ) {
        this.currentOdds = this.charmOutbreak;
      } else if (
        (inputCharm.checked &&
          inputOutbreak.checked == false &&
          inputSandwich.checked) ||
        (inputCharm.checked == false &&
          inputOutbreak.checked &&
          inputSandwich.checked)
      ) {
        this.currentOdds = this.sandwichOutbreak;
      } else if (inputCharm.checked) {
        this.currentOdds = this.shinyCharm;
      } else if (inputOutbreak.checked) {
        this.currentOdds = this.outbreak;
      } else if (inputSandwich.checked) {
        this.currentOdds = this.sandwich;
      } else {
        this.currentOdds = this.defaultOdds;
      }
    },
    simulateEncounters() {
      const randomEncounter = Math.ceil(Math.random() * this.currentOdds);
      let noShinyEncounter = true;
      let simRounds = 0;
      let numberOfEncounters = 0;
      const allTotalTries = [];

      while (simRounds < 5) {
        while (noShinyEncounter) {
          if (randomEncounter === Math.ceil(Math.random() * this.currentOdds)) {
            noShinyEncounter = false;
          }

          numberOfEncounters++;
        }
        allTotalTries.push(numberOfEncounters);
        numberOfEncounters = 0;
        noShinyEncounter = true;
        simRounds++;
      }

      //console.log("Total tries: ", allTotalTries);

      return allTotalTries;
    },
    calcAverageTries() {
      const totalTries = this.simulateEncounters();
      const averageTries = Math.round(
        totalTries.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        ) / totalTries.length
      );
      this.result = averageTries;
      this.resultIsVisible = true;
    },
  },
}).mount("#app");
