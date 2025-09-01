import { addWord, deleteWord, addUser, deleteUser } from '../api/rest';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';

//Prop übergabe visibile (anzeigen des Dialogs und onHide um Dialog zu verbergen)
export default function AdminVerwaltung( {visible, onHide}) {

    //neues Wort anlegen
    const [newWord, setNewWord] = useState('');
    //neuer Benutzer anlegen
    const [newUser, setNewUser] = useState('');
    //Wort löschen
    const [wordToDelete, setWordToDelete] = useState('');
    //Benutzer löschen
    const [userToDelete, setUsertoDelete] = useState('');

    //neues Wort anlegen (handling)
    const handleNewWord = async () => {
        if (!newWord) return;
        await addWord(newWord);
        setNewWord('');
    };

    //Löschen eines Wortes(handling)
    const handleDeleteWord = async () => {
        if (!wordToDelete) return;
        await deleteWord(wordToDelete);
        setDeleteWord('');
    };

    //neuen User anlegen (handling)
    const handleNewUser = async () => {
        if (!newUser) return;
        await addUser(newUser);
        setNewUser('');
    };

    //User Löschen(handling)
    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        await deleteUser(userToDelete);
        setDeleteUser('');
    };

    //rendert das Dialogfenster
    return (
        <Dialog
            header="Admin Bereich"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onHide}
        >
            <div>
                <label>Wort anlegen </label>
                < input type="text" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
                < button onClick={handleNewWord} > Wort anlegen </button>
            </div>
            <div>
                <label>Benutzer anlegen </label>
                < input type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
                < button onClick={handleNewUser} > Benutzer anlegen </button>
            </div>
            <div>
                <label>Wort löschen </label>
                < input type="text" value={deleteWord} onChange={(e) => setDeleteWord(e.target.value)} />
                < button onClick={handleDeleteWord} > Wort löschen </button>
            </div>
            <div>
                <label>Benutzer löschen </label>
                < input type="text" value={deleteUser} onChange={(e) => setDeleteUser(e.target.value)} />
                < button onClick={handleDeleteUser} > Benutzer löschen </button>
            </div>
        </Dialog>


    )

}

/*onHide = {() => { if (!showDialog) return; setShowDialog(false); }}>
    <div>
    <label>Wort anlegen </label>
        < input type = "text" value = { newWord } onChange = {(e) => setNewWord(e.target.value)} />
            < button onClick = { handleNewWord } > Wort anlegen </button>
                </div>
                </Dialog>*/