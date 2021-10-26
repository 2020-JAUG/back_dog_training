'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', [
      {
        name: "Juan Felipe",
        lastName: "Porras",
        password: "$2b$10$6CU2Z0A8N3ZxpfNnHsD8z.JpQoQDp0I0hgcEgaJrJeva6LmFBpDGC",
        //pass:gitlog
        city: "Madrid",
        email: "juanfe@cv.es",
        isAdmin: false,
        updatedAt: "2021-04-24",
        createdAt: "2021-04-24"
      },
      {
        name: "Bea",
        lastName: "Henson",
        password: "$2b$10$6CU2Z0A8N3ZxpfNnHsD8z.JpQoQDp0I0hgcEgaJrJeva6LmFBpDGC",
        //pass:gitlog
        city: "Manila",
        email: "bea@cv.es",
        isAdmin: false,
        updatedAt: "2021-01-24",
        createdAt: "2021-01-24"
      },
      {
        name: "Alejandro",
        lastName: "Urbina",
        password: "$2b$10$Mz7t6/vkgd8E0LzIFIUtPO3SSbC2KiSQSloskqq10zIEeuvEqD5dC",
        city: "Valencia",
        email: "alejandro@cv.es",
        isAdmin: true,
        updatedAt: "2021-02-12",
        createdAt: "2021-02-12"
      },
      {
        name: "Marcos",
        lastName: "domingo",
        password: "$2b$10$DgllQUK2jDcIigM4SrNimO03SRTJe.pQWvFgA0PDZmAAOZWGr3jXG",
        city: "Zarautz",
        email: "marcos@cv.es",
        isAdmin: false,
        updatedAt: "2021-06-22",
        createdAt: "2021-06-22"
      },
      {
        name: "Cristina",
        lastName: "Garcia",
        password: "$2b$10$A.iOiEC9Rej18ka2b4sHae6dX1DoSe7sGDH57AgDsGs94EF9a67B2",
        city: "Galicia",
        email: "cristina@cv.es",
        isAdmin: false,
        updatedAt: "2021-05-28",
        createdAt: "2021-05-28"
      },
      {
        name: "Carlos",
        lastName: "Quintero",
        password: "$2b$10$A.iOiEC9Rej18ka2b4sHae6dX1DoSe7sGDH57AgDsGs94EF9a67B2",
        city: "Barcelona",
        email: "carlos@cv.es",
        isAdmin: false,
        updatedAt: "2021-01-28",
        createdAt: "2021-01-28"
      },
      {
        name: "Pancho",
        lastName: "Henson",
        password: "$2b$10$A.iOiEC9Rej18ka2b4sHae6dX1DoSe7sGDH57AgDsGs94EF9a67B2",
        city: "Nemiña",
        email: "pancho@cv.es",
        isAdmin: false,
        updatedAt: "2021-06-28",
        createdAt: "2021-06-28"
      },
      {
        name: "Pampa",
        lastName: "Henson",
        password: "$2b$10$A.iOiEC9Rej18ka2b4sHae6dX1DoSe7sGDH57AgDsGs94EF9a67B2",
        city: "Táchira",
        email: "pampa@cv.es",
        isAdmin: false,
        updatedAt: "2021-08-28",
        createdAt: "2021-08-28"
      },
      {
        name: "Bruce",
        lastName: "Wayne",
        password: "$2b$10$A.iOiEC9Rej18ka2b4sHae6dX1DoSe7sGDH57AgDsGs94EF9a67B2",
        city: "	Gotham City",
        email: "batman@cv.es",
        isAdmin: false,
        updatedAt: "2021-03-21",
        createdAt: "2021-03-21"
      },
      {
        name: "Carlos",
        lastName: "Latre",
        password: "$2b$10$A.iOiEC9Rej18ka2b4sHae6dX1DoSe7sGDH57AgDsGs94EF9a67B2",
        city: "Tokio",
        email: "carlos@cv.es",
        isAdmin: false,
        updatedAt: "2021-06-21",
        createdAt: "2021-06-21"
      },
    ]

    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
