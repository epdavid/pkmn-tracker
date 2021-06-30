import React, { FunctionComponent, useState } from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'

import './PokemonSquare.css'
import './KeyDialog.css'

export interface Key {
    transparent: string,
    grey: string,
    blue: string,
    red: string,
    yellow: string,
    green: string
}

interface KeyDialogProps {
    onChange: (key: Key) => void,
    onClose: () => void,
    open: boolean,
    theKey: Key
}

export const emptyKey: Key = {
    transparent: '',
    grey: '',
    red: '',
    blue: '',
    yellow: '',
    green: ''
}

const KeyDialog: FunctionComponent<KeyDialogProps> = ({ open, onChange, onClose, theKey }) => {
    const makeOnChange = (color: keyof Key) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let clone = {...theKey}
        clone[color] = e.target.value
        onChange(clone)
    }
    return (
        <Dialog open={open}>
            <DialogTitle>Key</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If you'd like to keep track of what each color means for what game you're playing, enter that information here and have it be saved in case you forget!
                </DialogContentText>
                <div className="keyDialogContainer">
                <FormGroup row>
                    <div className={clsx('white', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Transparent"
                        value={theKey.transparent}
                        onChange={makeOnChange('transparent')}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('grey', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Grey"
                        value={theKey.grey}
                        onChange={makeOnChange('grey')}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('blue', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Blue"
                        value={theKey.blue}
                        onChange={makeOnChange('blue')}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('red', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Red"
                        value={theKey.red}
                        onChange={makeOnChange('red')}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('yellow', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Yellow"
                        value={theKey.yellow}
                        onChange={makeOnChange('yellow')}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('green', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Green"
                        value={theKey.green}
                        onChange={makeOnChange('green')}
                    />
                </FormGroup>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default KeyDialog