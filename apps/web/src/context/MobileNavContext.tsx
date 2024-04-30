'use client';

import { Dispatch, SetStateAction, createContext, useState } from "react";

type initialState = {
  isOpen:boolean;
  setOpen:Dispatch<SetStateAction<boolean>>
}

export const MobileNavContext = createContext<initialState>({
  isOpen: false,
  setOpen: ()=>{}
});

const MobileNavContextProvider = ({children}:{children:React.ReactNode}) => {
  const [isOpen, setOpen] = useState(false);


  return (
    <MobileNavContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </MobileNavContext.Provider>
  )
}

export default MobileNavContextProvider;