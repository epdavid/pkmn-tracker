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


export interface KeyCount {
    grey: number,
    blue: number,
    red: number,
    yellow: number,
    green: number
}

interface KeyDialogProps {
    onChange: (key: Key) => void,
    onClose: () => void,
    open: boolean,
    theKey: Key,
    theKeyCount: KeyCount
}

export const emptyKey: Key = {
    transparent: '',
    grey: '',
    red: '',
    blue: '',
    yellow: '',
    green: ''
}

export const emptyKeyCount: KeyCount = {
    grey: 0,
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0
}

const KeyDialog: FunctionComponent<KeyDialogProps> = ({ open, onChange, onClose, theKey, theKeyCount }) => {
    const makeOnChange = (color: keyof Key) => (e: React.FocusEvent<HTMLInputElement>) => {
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
                        defaultValue={theKey.transparent}
                        onBlur={makeOnChange('transparent')}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('grey', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Grey"
                        defaultValue={theKey.grey}
                        onBlur={makeOnChange('grey')}
                        helperText={`Count: ${theKeyCount.grey}`}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('blue', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Blue"
                        defaultValue={theKey.blue}
                        onBlur={makeOnChange('blue')}
                        helperText={`Count: ${theKeyCount.blue}`}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('red', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Red"
                        defaultValue={theKey.red}
                        onBlur={makeOnChange('red')}
                        helperText={`Count: ${theKeyCount.red}`}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('yellow', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Yellow"
                        defaultValue={theKey.yellow}
                        onBlur={makeOnChange('yellow')}
                        helperText={`Count: ${theKeyCount.yellow}`}
                    />
                </FormGroup>
                <FormGroup row>
                    <div className={clsx('green', 'square')} />
                    <TextField
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        label="Green"
                        defaultValue={theKey.green}
                        onBlur={makeOnChange('green')}
                        helperText={`Count: ${theKeyCount.green}`}
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