import { Auth } from "aws-amplify";


export const signUpAws = async (username, password, name, signupType) => {
    const { user } = await Auth.signUp({
        username: signupType === "phone_number" ? `+91${username}` : username,
        password,
        attributes: {
            [signupType]: signupType === "phone_number" ? `+91${username}` : username,
            name
        },
        autoSignIn: { // optional - enables auto sign in after user is confirmed
            enabled: true,
        }
    });
    localStorage.setItem('username', JSON.stringify(user.username))
    return user
}