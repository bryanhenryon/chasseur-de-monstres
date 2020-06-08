new Vue({
  el: "#app",
  data: {
    monsters: [
      {
        image: "img/monster.png",
        name: "Créature Mutante",
        sentence: "Créature Mutante a été vaincue !",
      },
      {
        image: "img/monster2.png",
        name: "Monstre Marin",
        sentence: "Monstre Marin a été vaincu !",
      },
      {
        image: "img/monster3.png",
        name: "Gobelin Berserker",
        sentence: "Gobelin Berserker a été vaincu !",
      },
      {
        image: "img/monster4.png",
        name: "Gobelin Archer",
        sentence: "Gobelin Archer a été vaincu !",
      },
      {
        image: "img/monster5.png",
        name: "Dragon des Neiges",
        sentence: "Dragon des Neiges a été vaincu !",
      },
      {
        image: "img/monster6.png",
        name: "Garde Squelette",
        sentence: "Garde Squelette a été vaincu !",
      },
      {
        image: "img/monster7.png",
        name: "Gobelin Mage",
        sentence: "Gobelin Mage a été vaincu !",
      },
      {
        image: "img/monster8.png",
        name: "Golem Élémentaire",
        sentence: "Golem Élémentaire a été vaincu !",
      },
      {
        image: "img/monster9.png",
        name: "Zombie",
        sentence: "Zombie a été vaincu !",
      },
      {
        image: "img/monster10.png",
        name: "Golem de Glace",
        sentence: "Golem de Glace a été vaincu !",
      },
      {
        image: "img/monster11.png",
        name: "Démon",
        sentence: "Démon a été vaincu !",
      },
      {
        image: "img/monster12.png",
        name: "Spectre de Jeune Mariée",
        sentence: "Spectre de Jeune Mariée a été vaincu !",
      },
      {
        image: "img/monster13.png",
        name: "Ver des Sables",
        sentence: "Ver des Sables a été vaincu !",
      },
    ],
    copyrightYear: new Date().getFullYear(),
    currentMonster: "",
    gameStarted: false,
    fightStarted: false,
    hasWon: null,
    playerName: null,
    playerHealth: 100,
    playerHealthColor: "green",
    monsterHealth: 100,
    monsterHealthColor: "green",
    healUsed: false,
    specialAttackUsed: false,
    logs: [],
    wins: localStorage.getItem("victoires"),
    deaths: localStorage.getItem("morts"),
  },
  beforeMount: function () {
    const monster = Math.floor(Math.random() * this.monsters.length);
    return (this.currentMonster = this.monsters[monster]);
  },
  methods: {
    newGame: function () {
      this.logs = [];
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.healUsed = false;
      this.specialAttackUsed = false;
      this.hasWon = null;
      this.playerHealthColor = "green";
      this.monsterHealthColor = "green";
      this.fightStarted = true;

      const monster = Math.floor(Math.random() * this.monsters.length);
      return (this.currentMonster = this.monsters[monster]);
    },

    attackMonster: function () {
      let damage = Math.floor(Math.random() * 20);
      this.monsterHealth -= damage;

      if (damage === 0) {
        this.logs.unshift({
          turn: "player",
          message: `${this.currentMonster.name} esquive votre attaque !`,
        });
      } else {
        this.logs.unshift({
          turn: "player",
          message: `Vous infligez ${damage} points de dégâts!`,
        });
      }

      if (this.monsterHealth <= 50) {
        this.monsterHealthColor = "#FF9A2B";
      }

      if (this.monsterHealth <= 20) {
        this.monsterHealthColor = "#FF3F43";
      }

      if (damage > this.monsterHealth) {
        this.monsterHealth = 0;
      }

      if (this.monsterHealth === 0) {
        this.fightStarted = false;
        this.hasWon = true;
        this.wins++;

        localStorage.setItem("victoires", this.wins);
      }

      if (this.monsterHealth !== 0) {
        this.monsterAttack();
      }
    },

    specialAttack: function () {
      this.specialAttackUsed = true;
      let damage = Math.floor(Math.random() * (30 - 15) + 15);
      this.monsterHealth -= damage;
      if (damage === 0) {
        this.logs.unshift({
          turn: "player",
          message: `${this.currentMonster.name} esquive votre attaque !`,
        });
      } else {
        this.logs.unshift({
          turn: "player",
          message: `Vous infligez ${damage} points de dégâts!`,
        });
      }

      if (this.monsterHealth <= 50) {
        this.monsterHealthColor = "#FF9A2B";
      }

      if (this.monsterHealth <= 20) {
        this.monsterHealthColor = "#FF3F43";
      }

      if (damage > this.monsterHealth) {
        this.monsterHealth = 0;
      }

      if (this.monsterHealth === 0) {
        this.fightStarted = false;
        this.hasWon = true;
        this.wins++;

        localStorage.setItem("victoires", this.wins);
      }

      if (this.monsterHealth !== 0) {
        this.monsterAttack();
      }
    },

    heal: function () {
      this.healUsed = true;
      let heal = Math.floor(Math.random() * (30 - 20) + 20);
      this.playerHealth += heal;

      this.logs.unshift({
        turn: "player",
        message: `Vous vous soignez de ${heal} PV`,
      });

      if (this.playerHealth >= 100) {
        this.playerHealth = 100;
      }

      if (this.playerHealth > 50) {
        this.playerHealthColor = "green";
      }

      if (this.playerHealth > 20 && this.playerHealth <= 50) {
        this.playerHealthColor = "#FF9A2B";
      }

      this.monsterAttack();
    },

    monsterAttack: function () {
      let vm = this;
      setTimeout(function () {
        let damage = Math.floor(Math.random() * 25);
        vm.playerHealth -= damage;

        if (damage === 0) {
          vm.logs.unshift({
            turn: "monster",
            message: `${vm.currentMonster.name} rate son attaque !`,
          });
        } else {
          vm.logs.unshift({
            turn: "monster",
            message: `${vm.currentMonster.name} vous inflige ${damage} points de dégâts!`,
          });
        }

        if (vm.playerHealth <= 50) {
          vm.playerHealthColor = "#FF9A2B";
        }

        if (vm.playerHealth <= 20) {
          vm.playerHealthColor = "#FF3F43";
        }

        if (damage > vm.playerHealth) {
          vm.playerHealth = 0;
        }

        if (vm.playerHealth === 0) {
          vm.fightStarted = false;
          vm.hasWon = false;
          vm.deaths++;

          localStorage.setItem("morts", vm.deaths);
        }
      }, 500);
    },

    restart: function () {
      this.fightStarted = false;
      this.gameStarted = false;
      this.healUsed = false;
      this.specialAttackUsed = false;
      this.logs = [];
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.playerHealthColor = "green";
      this.monsterHealthColor = "green";
      this.hasWon = null;
      this.playerName = null;

      const monster = Math.floor(Math.random() * this.monsters.length);
      return (this.currentMonster = this.monsters[monster]);
    },
  },
});
