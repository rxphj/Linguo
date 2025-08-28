export default function ShowPoints( {adminAdd} ) {  

return(

  
    <aside className="point-section">
        <div className="points">Punkte</div>
        <div className="adminsection">
          {adminAdd && <img src="/Adminsection-img.png" alt="adminsection-img" className="adminsection_img" />}
          </div>
    </aside>


   

) 

}