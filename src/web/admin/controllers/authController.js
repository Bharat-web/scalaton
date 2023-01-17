const loginPage = ( req, res, next ) => {
    res.render("admin/login");
}

const signupPage = ( req, res, next ) => {
    res.render("admin/signup");
}

const authController = {
    loginPage,
    signupPage
}

export default authController;