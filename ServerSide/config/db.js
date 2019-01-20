module.exports = {
    development: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1/quizup-development',
        paginationItems: 10,
        agenda: 'mongodb://127.0.0.1/agenda'
    },
    test: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1/quizup-test',
        paginationItems: 10,
        agenda: 'mongodb://127.0.0.1/agenda'
    },
    production: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1/quizup-production',
        paginationItems: 10,
        agenda: 'mongodb://127.0.0.1/agenda'
    }
}