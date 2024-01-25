const Routes = {
    base_url: "http://localhost:5173",
    home: "/",
    user: {
        login: "/login",
        register: "/register",
    },
    api: {
        todo: {
            get: '/api/todo',
            post: '/api/todo',
        }
    },
}

export default Routes;