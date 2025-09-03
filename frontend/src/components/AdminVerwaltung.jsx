import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

//Prop übergabe visibile (anzeigen des Dialogs und onHide um Dialog zu verbergen)
export default function AdminVerwaltung({ visible, onHide }) {

    //neues Wort anlegen
    const [newWord, setNewWord] = useState('');
    const [wordCategory, setWordCategory] = useState('');

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
        if (!newWord || !wordCategory) return;
        try {
            await axios.post('http://localhost:8080/api/words', { word: newWord, category: wordCategory });
            setNewWord('');
            setWordCategory('');
        } catch (err) {
            console.error('Fehler beim Anlegen des Wortes:', err);
        }
    };

    //Löschen eines Wortes(handling)
    const handleDeleteWord = async () => {
        if (!wordToDelete) return;
        try {
            await axios.delete(`http://localhost:8080/api/words/${wordToDelete}`);
            setWordToDelete('');
        } catch (err) {
            console.error('Fehler beim Löschen des Wortes:', err);
        }
    };

    //neuen User anlegen (handling)
    const handleNewUser = async () => {
        if (!newUserName || !userPassword || !userRole) return;
        try {
            await axios.post('http://localhost:8080/api/users', { username: newUserName, password: userPassword, role: userRole });
            setUserName('');
            setUserPassword('');
            setUserRole('');
        } catch (err) {
            console.error('Fehler beim Anlegen des Benutzers:', err);
        }
    };

    //User Löschen(handling)
    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        try {
            await axios.delete(`http://localhost:8080/api/users/${userToDelete}`);
            setUsertoDelete('');
        } catch (err) {
            console.error('Fehler beim Löschen des Benutzers:', err);

           
        }
    }

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
                            <InputText type="text" placeholder='Neues Wort' value={newWord} onChange={(e) => setNewWord(e.target.value)} />
                            <InputText type="text" placeholder='Wort Kategorie' value={wordCategory} onChange={(e) => setWordCategory(e.target.value)} />
                            <Button onClick={handleNewWord} > Wort anlegen </Button>
                        </div>
                        <div>
                            <label>Benutzer anlegen:</label>
                            <InputText type="text" placeholder='Benutzername' value={newUserName} onChange={(e) => setUserName(e.target.value)} />
                            <InputText type="text" placeholder='Passwort' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                            <InputText type="text" placeholder='Rolle' value={userRole} onChange={(e) => setUserRole(e.target.value)} />
                            <Button onClick={handleNewUser} > Benutzer anlegen </Button>
                        </div>
                        <div>
                            <label>Wort löschen </label>
                            <InputText type="text" placeholder='Wort löschen' value={wordToDelete} onChange={(e) => setWordToDelete(e.target.value)} />
                            <Button onClick={handleDeleteWord} > Wort löschen </Button>
                        </div>
                        <div>
                            <label>Benutzer löschen </label>
                            <InputText type="text" placeholder='Benutzer löschen' value={userToDelete} onChange={(e) => setUsertoDelete(e.target.value)} />
                            <Button onClick={handleDeleteUser} > Benutzer löschen </Button>
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