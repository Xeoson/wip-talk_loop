"use client"

import {useState, useEffect} from 'react';
import Button, { ButtonProps } from './Button';
import { signOut } from 'next-auth/react';

interface SignOutButtonProps extends ButtonProps {}

const SignOutButton = (props: SignOutButtonProps) => {

	const handleClick = () => {
		signOut()
	}
	return <Button {...props} onClick={handleClick} />
};

export default SignOutButton;