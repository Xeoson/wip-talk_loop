
import {useState, useEffect} from 'react';
import Image from 'next/image'
import { DP } from '@/common/types';

interface UserProps extends DP {
	image: string | null,
	name?: string
}

const User = ({image, name, ...props}: UserProps) => {
	return (
    <div
      className={`flex h-full items-center space-x-2 ${props.className ?? ""}`}
    >
      <div className="relative h-full aspect-square">
        <Image fill className='rounded-full' src={`${image ?? "/blank_avatar.png"}`} alt="" />
      </div>
      {name && <div className="whitespace-nowrap">{name}</div>}
			{props.children}
    </div>
  );
};

export default User;