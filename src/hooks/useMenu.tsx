import { createContext, ReactNode, useContext, useState} from 'react'

interface MenuProviderProps {
  children: ReactNode;
}

interface MenuContextData {
  menu: Boolean;
  handleOpenMenu: () => void;
  handleCloseMenu: () => void;
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

export function MenuProvider ({children}: MenuProviderProps): JSX.Element {
  const [menu, setMenu] = useState(false)

  function handleOpenMenu() {
    setMenu(true)
  }

  function handleCloseMenu() {
    setMenu(false)
  }

  return (
    <MenuContext.Provider value={{menu, handleOpenMenu, handleCloseMenu}} >
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu(): MenuContextData {
  const context = useContext(MenuContext)
  return context
}