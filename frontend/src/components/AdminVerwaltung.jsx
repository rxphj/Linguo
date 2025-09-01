import { addWord, deleteWord, addUser, deleteUser } from '../api/rest';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';

export default function AdminVerwaltung( {visible, onHide}) {


    const [newWord, setNewWord] = useState('');
    const [newUser, setNewUser] = useState('');
    const [deleteWord, setDeleteWord] = useState('');
    const [deleteUser, setDeleteUser] = useState('');

    const handleNewWord = async () => {
        if (!newWord) return;
        await addWord(newWord);
        setNewWord('');
    };

    const handleDeleteWord = async () => {
        if (!deleteWord) return;
        await deleteWord(deleteWord);
        setDeleteWord('');
    };

    const handleNewUser = async () => {
        if (!newUser) return;
        await addUser(newUser);
        setNewUser('');
    };

    const handleDeleteUser = async () => {
        if (!deleteUser) return;
        await deleteUser(deleteUser);
        setDeleteUser('');
    };

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