export default function Content() {

    return (

        <main className="content">


            <div className="tool">Aktueller Buchstabe: A</div>
            <div className="tool">Timer</div>

            <form className="spielfeld">

                <div className="rubrik">
                    <label>Stadt</label><br />
                    <input type="text" name="Stadt" placeholder="Stadt" />
                </div>

                <div className="rubrik">
                    <label>Land</label><br />
                    <input type="text" name="Land" placeholder="Land" />
                </div>
                <div className="rubrik">
                    <label>Fluss</label><br />
                    <input type="text" name="Stadt" placeholder="Fluss" />
                </div>
                <div className="rubrik">
                    <label>Tier</label><br />
                    <input type="text" name="Tier" placeholder="Tier" />
                </div>

            </form>
        </main>

    )

}