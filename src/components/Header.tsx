import { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography'

interface HeaderProps {
    wartortlePath: string,
    generation: number,
    darkMode: boolean
}

const Header: FunctionComponent<HeaderProps> = ({ wartortlePath, darkMode, generation }) => {
    const showTortle = darkMode ? generation > 2 : true;
    return (
        <div className="Header">
            {showTortle && <img src={wartortlePath} alt="wartortle"/>}
            <Typography color="textPrimary" variant="h2">wartortle</Typography>
            {showTortle && <img src={wartortlePath} alt="wartortle"/>}
        </div>
    )
}

export default Header