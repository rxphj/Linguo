import { useState } from "react";
import AdminVerwaltung from "./AdminVerwaltung.jsx";




//adminAdd ist ein Prop von AdminPage, zum anzeigen der Adminbilder auf der Admin Seite
export default function ShowPoints({ adminAdd }) {

    const [showDialog, setShowDialog] = useState(false);
  

    return (


        <aside className="point-section">
            <div className="points">Punkte</div>
            <div className="adminsection">
                {adminAdd && <img src="/Adminsection-img.png"
                    alt="adminsection-img"
                    className="adminsection_img"
                    onClick={() => setShowDialog(true)} />}
            </div>

          <AdminVerwaltung visible={showDialog} onHide={() => setShowDialog(false)} />


        </aside>






    )

}