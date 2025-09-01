import { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';


//function für das Voting, Nicht vorhandene Wörter sollen über ein Poll akzeptiert oder abgelehnt werden
export default function Voting() {

    const [voted, setVoted] = useState(false);
    const [vote, setVote] = useState("");

    const wordForPoll = "AbstimmungsWort";

    const takeVote = (value) => {

        if (voted) return;
        setVote(value);
        setVoted(true);
    }

    return (
        <div>

            <p>{wordForPoll} als gültig akzeptieren?</p>
            <div >
                <RadioButton
                    inputId="yes"
                    name="vote"
                    value="yes"
                    onChange={(e) => takeVote("yes")}
                    checked={vote === "yes"}
                />
                <label htmlFor="yes">Yes</label>
                <RadioButton
                    inputId="no"
                    name="vote"
                    value="no"
                    onChange={(e) => takeVote("no")}
                    checked={vote === "no"}
                />
                <label htmlFor="no">No</label>
                {vote && <p>Du hast abgestimmt: {vote === "yes" ? "Yes ✅" : "No ❌"}</p>}
            </div>


        </div>
    )







}