import { FunctionComponent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Link from '@material-ui/core/Link'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const InfoDialog: FunctionComponent<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
    return (
        <Dialog scroll="paper" open={open}>
            <DialogTitle>About</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Credit to <Link href="https://veekun.com/dex/downloads" target="_blank">veekun</Link> for the sprites.
                </DialogContentText>
                <DialogContentText>
                    If you love the app and wanna say thanks, you can <Link href="https://ko-fi.com/rat_love" target="_blank">buy me a coffee</Link>!
                </DialogContentText>
                <DialogContentText>
                    If you have any questions, want to report any issues, have any suggestions for new features, or just wanna say hi, feel free to email me at <Link href="mailto:wartortle.app@gmail.com">wartortle.app@gmail.com</Link>
                </DialogContentText>
                <DialogContentText>
                    This app is intended to be a multipurpose tool for keeping track of Pokemon in a grid. For example, if you are playing through a Pokemon game with the intent to catch 'em all, you might want a visual representation of what Pokemon you've seen vs which Pokemon you've caught without having to dig into the Pokedex each time to check. This is especially useful for games randomized with the <Link href="https://pokehacks.dabomstew.com/randomizer/" target="_blank">Universal Pokemon Randomizer</Link> and/or if special rules are placed on the order in which Pokemon can be caught (e.g.: a <Link href="https://www.youtube.com/watch?v=2o7RrE7Ga_U" target="_blank">Pokerap Order Catch 'em All</Link>). Another potential use for this application is a game of <Link href="https://www.youtube.com/watch?v=yF0nP8j8s3E" target="_blank">Pokemon Randomizer Battleship</Link> where two adversaries place 5 "battleships" on the grid (1x length 2, 2x length 3, 1x length 4, 1x length 5, etc.), and the opponents fire missles at the grid by catching Pokemon in their own game.
                </DialogContentText>
                <DialogContentText>
                    The inspiration for this application is the grids you often see Pokemon speedrunners and streamers use when playing through challenge runs, races, or other games. The tools used there seem to be based in some OBS software, so I sought to provide that same functionality in a web application. The state of the app is saved in the browser's local storage so you don't need to worry about accidentally closing your tab or refreshing the page.
                </DialogContentText>
            </DialogContent>
            <DialogActions><Button onClick={onClose}>OK</Button></DialogActions>
        </Dialog>
    )
}

export default InfoDialog