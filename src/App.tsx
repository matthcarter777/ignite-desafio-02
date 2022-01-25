import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { SelectedGenreProvider } from './hook/SelectedGenreHook';


import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
 
  return (
    <SelectedGenreProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />

        <Content />
        
      </div>  
    </SelectedGenreProvider>
  )
}