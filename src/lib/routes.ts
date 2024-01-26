const Routes = {
    base_url: import.meta.env.VITE_BASE_URL,
    home: "/",
    user: {
        login: "/login",
        register: "/register",
    },
    api: {
        todo: {
            get: '/api/todo',
            post: '/api/todo',
            delete: '/api/todo',
        }
    },
}

export default Routes;