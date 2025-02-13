export const validateField = (name, value) => {
    let error = "";
    if (name == "fullName") {
        if (!value.trim()) {

            error = "Full name is required.";
        } else {
            error = ""
        }
    } else if (
        name == "email"
    ) {
        if (
            !value.trim() || !/\S+@\S+\.\S+/.test(value)) {

            error = "Valid email is required.";
        } else {
            error = ""
        }
    } else if (name == "aboutProject") {
        if (!value.trim()) {

            error = "Project details are required.";
        } else {
            error = ""
        }
    } else if (name == "avatar") {
        if (!value) {

            error = "Please upload an avatar.";
        } else {
            error = ""
        }
    }

    return error;
};


export const validateAllFields = (fullName, email, aboutProject, avatar) => {
    const errors = {
        fullName: validateField("fullName", fullName),
        email: validateField("email", email),
        aboutProject: validateField("aboutProject", aboutProject),
        avatar: validateField("avatar", avatar),
    };

    const isValid = Object.values(errors).every((error) => error === "");
    return { isValid, errors };
};