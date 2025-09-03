import { addWord, deleteWord, addUser, deleteUser } from '../api/rest';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

//Prop übergabe visibile (anzeigen des Dialogs und onHide um Dialog zu verbergen)
export default function AdminVerwaltung({ visible, onHide }) {

    //neues Wort anlegen
    const [newWord, setNewWord] = useState('');
    //neuer Benutzer anlegen
    const [newUserName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRole, setUserRole] = useState('');
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
        if (!newUserName || !userPassword || !userRole) return;
        await addUser({ username: newUserName, password: userPassword, role: userRole });
        setUserName('');
        setUserPassword('');
        setUserRole('');
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
            className='admin-dialog'
            onHide={onHide}
        >
            <div className='adminview'>
                <div>
                    <label>Wort anlegen </label>
                    < InputText type="text" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
                    < Button onClick={handleNewWord} > Wort anlegen </Button>
                </div>
                <div>
                    <label>Benutzer anlegen:</label>
                    < InputText type="text" placeholder='Benutzername' value={newUserName} onChange={(e) => setUserName(e.target.value)} />
                    < InputText type="text" placeholder='Passwort' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                    < InputText type="text" placeholder='Rolle' value={userRole} onChange={(e) => setUserRole(e.target.value)} />
                    < Button onClick={handleNewUser} > Benutzer anlegen </Button>
                </div>
                <div>
                    <label>Wort löschen </label>
                    < InputText type="text" value={deleteWord} onChange={(e) => setWordToDelete(e.target.value)} />
                    < Button onClick={handleDeleteWord} > Wort löschen </Button>
                </div>
                <div>
                    <label>Benutzer löschen </label>
                    < InputText type="text" value={deleteUser} onChange={(e) => setUsertoDelete(e.target.value)} />
                    < Button onClick={handleDeleteUser} > Benutzer löschen </Button>
                </div>
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