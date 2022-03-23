const {
    client,
    getAllUsers,
    createUser
} = require('./index')

// drops all tables from database
async function dropTables() {
    try {
        console.log('Starting to drop tables...')

        await client.query(`
            DROP TABLE IF EXISTS users;
      `);

        console.log('Finished dropping tables!')
    } catch (error) {
        console.error('Error dropping tables!')
        throw error; // we pass the error up to the function that calls dropTables
    }
}

// creates all tables for database 
async function createTables() {
    try {
        console.log('Starting to build tables...')

        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL,
                active BOOLEAN DEFAULT true
            );
      `);
        console.log('Finished building tables!')

    } catch (error) {
        console.error('Error building tables!')
        throw error; // pass the error up to the function that calls createTables
    }
}

// creates some users
async function createInitialUsers() {
    try {
        console.log('Starting to create users...')

        const albert = await createUser({
            username: 'albert',
            password: 'bertie99',
            name: 'Albert Wise',
            location: 'Florida'
        })
        const sandra = await createUser({
            username: 'sandra',
            password: '2sandy4me',
            name: 'Sandy Cheeks',
            location: 'Bikini Bottom'
        })
        const glamgal = await createUser({
            username: 'glamgal',
            password: 'soglam',
            name: 'Glamorous Girl',
            location: 'New York City, NY'
        })

        console.log('Finished creating users!')
    } catch (error) {
        console.error('Error creating users!')
        throw error
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers()
    } catch (error) {
        throw error
    }
}

async function testDB() {
    try {
        console.log("Starting to test database...");

        const users = await getAllUsers();
        console.log("getAllUsers:", users);

        console.log("Finished database tests!");
    } catch (error) {
        console.error("Error testing database!");
        throw error;
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());