import React, { useState, useEffect } from 'react'
import pokemon from 'pokemon';
import { Pokemon, Color } from './components/PokemonSquare'
import PokemonGrid from './components/PokemonGrid'
import useDidMountEffect from './utils/useDidMountEffect'
import InfoDialog from './components/InfoDialog'
import Header from './components/Header'
import KeyDialog, { Key, emptyKey } from './components/KeyDialog'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


import clsx from "clsx"

import './App.css'


interface Generation {
  generation: number,
  dirName: string,
  dropdownLabel: string,
  startNum: number, //Inclusive
  endNum: number //Inclusive
}

const generations: Generation[] = [{
  generation: 1,
  dirName: 'generation-1',
  startNum: 1,
  endNum: 151,
  dropdownLabel: "Generation I"
}, {
  generation: 2,
  dirName: 'generation-2',
  startNum: 1,
  endNum: 251,
  dropdownLabel: "Generation II"
}, {
  generation: 3,
  dirName: 'generation-3',
  startNum: 1,
  endNum: 386,
  dropdownLabel: "Generation III"
}, {
  generation: 4,
  dirName: 'generation-4',
  startNum: 1,
  endNum: 493,
  dropdownLabel: "Generation IV"
}, {
  generation: 5,
  dirName: 'generation-5',
  startNum: 1,
  endNum: 649,
  dropdownLabel: "Generation V"
}]

const getPkmn = (gen: Generation): Pokemon[] => {
  let pkmn: Pokemon[] = []

  for (let i = gen.startNum; i <= gen.endNum; i++) {
    pkmn.push({
      imgPath: `${process.env.PUBLIC_URL}/sprites/${gen.dirName}/${i}.png`,
      name: pokemon.getName(i),
      dexNumber: i,
      generation: gen.generation,
      color: Color.white
    })
  }

  return pkmn;
}

const App = () => {
  const [gen, setGen] = useState<Generation>(generations[0])

  const [pkmn, setPkmn] = useState<Pokemon[]>([]);
  const [showName, setShowName] = useState<boolean>(false)
  const [showNum, setShowNum] = useState<boolean>(false)
  const [key, setKey] = useState<Key>(emptyKey)
  const [notes, setNotes] = useState<string>('')

  const [settingsDialogOpen, setSettingsDialogOpen] = useState<boolean>(false)
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false)
  const [keyDialogOpen, setKeyDialogOpen] = useState<boolean>(false)

  const [darkMode, setDarkMode] = useState<boolean>(false)

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  })

  useDidMountEffect(() => {
    window.localStorage.setItem('generation', JSON.stringify(gen));
  }, [gen])
  useDidMountEffect(() => {
    window.localStorage.setItem('pokemon', JSON.stringify(pkmn))
  }, [pkmn])
  useDidMountEffect(() => {
    window.localStorage.setItem('showName', JSON.stringify(showName))
  }, [showName])
  useDidMountEffect(() => {
    window.localStorage.setItem('showNum', JSON.stringify(showNum))
  }, [showNum])
  useDidMountEffect(() => {
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])
  useDidMountEffect(() => {
    window.localStorage.setItem('key', JSON.stringify(key))
  }, [key])
  useDidMountEffect(() => {
    window.localStorage.setItem('notes', notes)
  }, [notes])


  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? theme.palette.background.paper : '#fff'
  }, [darkMode, theme.palette.background.paper])

  useEffect(() => {
    const genLoaded = JSON.parse(window.localStorage.getItem('generation') ?? 'null')
    const pkmnLoaded = JSON.parse(window.localStorage.getItem('pokemon') ?? 'null')
    const showNameLoaded = (window.localStorage.getItem('showName') ?? 'false') === 'true'
    const showNumLoaded = (window.localStorage.getItem('showNum') ?? 'false') === 'true'
    const darkModeLoaded = (window.localStorage.getItem('darkMode') ?? 'false') === 'true'
    const keyLoaded = JSON.parse(window.localStorage.getItem('key') ?? 'null')
    const notesLoaded = window.localStorage.getItem('notes') ?? ''

    if (genLoaded !== null) {
      setGen(genLoaded as Generation);
    }
    setPkmn(pkmnLoaded === null ? getPkmn(generations[0]) : pkmnLoaded as Pokemon[])
    setShowName(showNameLoaded)
    setShowNum(showNumLoaded)
    setDarkMode(darkModeLoaded)
    setKey(keyLoaded === null ? emptyKey : keyLoaded as Key)
    setNotes(notesLoaded)
  }, [])

  const onPkmnColorChange = (color: Color, pok: Pokemon) => {
    const pkmnCopy = [...pkmn]
    let foundPokemonIndex = pkmn.findIndex((p) => p.imgPath === pok.imgPath);
    if (foundPokemonIndex !== -1) {
      pkmnCopy[foundPokemonIndex].color = color;
      setPkmn(pkmnCopy)
    }
  }

  const clearBoard = () => {
    let newPkmn = [...pkmn]
    newPkmn.forEach((p) => p.color = Color.white)
    setPkmn(newPkmn)
  }

  const SettingsDialog = <Dialog open={settingsDialogOpen}>
    <DialogTitle>Settings</DialogTitle>
    <DialogContent>
      <TextField
        select
        label="Generation"
        value={gen.generation}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const gen = generations.find(g => g.generation === Number(e.target.value)) ?? generations[0]
          setGen(gen)
          setPkmn(getPkmn(gen))
        }}
        variant="outlined"
        helperText="Changing this value will clear existing selections"
      >
        {generations.map((gen) => (
          <MenuItem key={gen.generation} value={gen.generation}>
            {gen.dropdownLabel}
          </MenuItem>
        ))}
      </TextField>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox
            checked={showName}
            onChange={() => setShowName(!showName)}
          />}
          label="Show Pokemon Names?"
        />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox
            checked={showNum}
            onChange={() => setShowNum(!showNum)}
          />}
          label="Show Pokemon Dex Numbers?"
        />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />}
          label="Dark mode"
        />
      </FormGroup>
      <FormGroup row>
        <Button
          color="secondary"
          variant="contained"
          onClick={clearBoard}
        >
            Clear Board
          </Button>
      </FormGroup>
    </DialogContent>
    <DialogActions>
      <Button  onClick={() => setSettingsDialogOpen(false)}>OK</Button>
    </DialogActions>
  </Dialog>

  return (
    <ThemeProvider theme={theme}>
    <Paper className={clsx("App", darkMode && "darkMode")}>
      {SettingsDialog}
      <InfoDialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)} />
      <KeyDialog
        open={keyDialogOpen}
        theKey={key}
        onChange={(k) => {
          setKey(k);
        }}
        onClose={() => setKeyDialogOpen(false)}
      />
      <div className="topBar">
        <Header wartortlePath={pkmn[7].imgPath} darkMode={darkMode} generation={gen.generation} />
        <div className="buttons">
          <IconButton onClick={() => setSettingsDialogOpen(true)}><SettingsIcon /></IconButton>
          <IconButton onClick={() => setInfoDialogOpen(true)}><HelpIcon /></IconButton>
          <IconButton onClick={() => setKeyDialogOpen(true)}>< VpnKeyIcon /></IconButton>
        </div>
      </div>
      <Divider />
      <PokemonGrid
        onPkmnColorChange={onPkmnColorChange}
        pokemon={pkmn}
        showName={showName}
        showNum={showNum}
      />
      <TextField
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        multiline 
        label="Notes"
      />
    </Paper>
    </ThemeProvider>
  );
}

export default App;
