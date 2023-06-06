import { useState } from "react"

export default function FormType() {

    const [show, setShow] = useState<{showField: boolean, showPassword: boolean}>({showField: false, showPassword: false});
    function changeField() {
        setShow((pr) => {return {showField: !pr.showField, showPassword: pr.showPassword}});
    }
    function changeVisible() {
        setShow((pr) => {return {showField: pr.showField, showPassword: !pr.showPassword}});
    }
    return (
        <>
            <label>
                <input type="radio" name="type" value="public" defaultChecked onChange={changeField}/>
                <span>Public</span>
            </label>
            <br />
            <label>
                <input type="radio" name="type" value="private" onChange={changeField}/>
                <span>Private</span>
            </label>
            {
                show.showField ?
                <>
                    <br /><br />
                    <label style={{display: "flex"}}>
                        <input
                            type={show.showPassword ? "text" : "password"}
                            name="password"
                            placeholder="******"
                            minLength={show.showField ? 1 : undefined}
                        />
                        <input type="button" value="show" onClick={changeVisible}/>
                    </label>
                </>
            : null
            }
            <br />
        </>
    )
}