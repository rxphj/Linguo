import { Dialog } from "primereact/dialog"

export function Highscore( {visible, onHide} ){

     return (
            <Dialog
                header="Highscore"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={onHide}
            >
                <div>
                   Hier steht der Highscore
                </div>
            </Dialog>  
    
        )

}