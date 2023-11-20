import { Button, TextField } from '@mui/material'
import { Auth } from 'aws-amplify'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function SignIn({onSignIn}) {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async() => {
        try {
            const user = await Auth.signIn(username, password)
            navigate('/')
            onSignIn()
        } catch (error) {
            console.log('error signing in', error)
        }
    }
    return (
        <div>
            <TextField id='username' label='UserName' value={username} onChange={e => setUsername(e.target.value)} />
            <TextField id='password' label='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <Button id='signInButton' color='primary' onClick={signIn}> Sign In</Button>
        </div>
    )
}

export default SignIn