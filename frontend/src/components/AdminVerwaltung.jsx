//Komponente geschrieben von Yasmin Holik


import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

export default function AdminVerwaltung({ visible, onHide }) {
    // neues Wort anlegen
    const [newWord, setNewWord] = useState('');
    const [wordCategory, setWordCategory] = useState('');

    // neuer Benutzer anlegen
    const [newUserName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRole, setUserRole] = useState('');

    // Wort löschen
    const [wordToDelete, setWordToDelete] = useState('');

    // Benutzer löschen
    const [userToDelete, setUsertoDelete] = useState('');

    // neues Wort anlegen (handling)
    const handleNewWord = async () => {
        if (!newWord || !wordCategory) return;
        try {
            await axios.post('http://localhost:8080/api/create/wort', {
                name: newWord,
                rubrik: wordCategory
            });
            setNewWord('');
            setWordCategory('');
            alert('Wort erfolgreich angelegt!');
        } catch (err) {
            console.error('Fehler beim Anlegen des Wortes:', err);
            alert('Fehler beim Anlegen des Wortes');
        }
    };

    // Löschen eines Wortes (handling)
    const handleDeleteWord = async () => {
        if (!wordToDelete) return;
        try {
            // Annahme: Löschen über den Wortnamen
            await axios.delete(`http://localhost:8080/api/remove/wort/${wordToDelete}`);
            setWordToDelete('');
            alert('Wort erfolgreich gelöscht!');
        } catch (err) {
            console.error('Fehler beim Löschen des Wortes:', err);
            alert('Fehler beim Löschen des Wortes');
        }
    };

    // neuen User anlegen (handling)
    const handleNewUser = async () => {
        // Alle drei Felder verlangt
        if (!newUserName || !userPassword || !userRole) return;
        try {
            await axios.post('http://localhost:8080/api/create/user', {
                username: newUserName,
                password: userPassword,
                rolle: userRole
            });
            // Felder zurücksetzen
            setUserName('');
            setUserPassword('');
            setUserRole('');
            alert('Benutzer erfolgreich angelegt!');
        } catch (err) {
            console.error('Fehler beim Anlegen des Benutzers:', err);
            alert('Fehler beim Anlegen des Benutzers');
        }
    };

    // User Löschen (handling)
    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        try {
            await axios.delete(`http://localhost:8080/api/users/${userToDelete}`);
            setUsertoDelete('');
            alert('Benutzer erfolgreich gelöscht!');
        } catch (err) {
            console.error('Fehler beim Löschen des Benutzers:', err);
            alert('Fehler beim Löschen des Benutzers');
        }
    };

    return (
        <Dialog
            header="Admin Bereich"
            visible={visible}
            className='admin-dialog'
            onHide={onHide}
            style={{ width: '50vw' }}
        >
            <div className='adminview' style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Wort anlegen */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label><strong>Wort anlegen</strong></label>
                    <InputText
                        type="text"
                        placeholder='Neues Wort'
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                    />
                    <InputText
                        type="text"
                        placeholder='Wort Kategorie (z.B. Stadt, Land, Fluss, Tier)'
                        value={wordCategory}
                        onChange={(e) => setWordCategory(e.target.value)}
                    />
                    <Button onClick={handleNewWord} label="Wort anlegen" />
                </div>

                {/* Benutzer anlegen */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label><strong>Benutzer anlegen:</strong></label>
                    <InputText
                        type="text"
                        placeholder='Benutzername'
                        value={newUserName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <InputText
                        type="password"
                        placeholder='Passwort'
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <InputText
                        type="text"
                        placeholder='Rolle (z.B. User, Admin)'
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                    />
                    <Button onClick={handleNewUser} label="Benutzer anlegen" />
                </div>

                {/* Wort löschen */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label><strong>Wort löschen</strong></label>
                    <InputText
                        type="text"
                        placeholder='Wortname zum Löschen'
                        value={wordToDelete}
                        onChange={(e) => setWordToDelete(e.target.value)}
                    />
                    <Button onClick={handleDeleteWord} label="Wort löschen" severity="danger" />
                </div>

                {/* Benutzer löschen */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label><strong>Benutzer löschen</strong></label>
                    <InputText
                        type="text"
                        placeholder='Benutzername zum Löschen'
                        value={userToDelete}
                        onChange={(e) => setUsertoDelete(e.target.value)}
                    />
                    <Button onClick={handleDeleteUser} label="Benutzer löschen" severity="danger" />
                </div>
            </div>
        </Dialog>
    );
}