import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import {Context as AuthContext }from '../context/AuthContext'

const ResolveAuthScreen = ()=>{
    const {tryLocalSignin} = useContext(AuthContext);
    useEffect(()=>{
        tryLocalSignin();
    },[]);
    return null;
}

export default ResolveAuthScreen